import fs from 'fs';
import git from "nodegit";
import Errors from '../constants/RepositoryErrors';
import debug from 'debug';

const logger = debug('git-watch:lib:PollRepositories');

class RepositoryError {
  constructor(code, message, details) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export default function pullLatestRemote(repoPath, remoteName, remoteMaster) {
  var repository;
  var remote = remoteName;
  var remoteBranch = remoteMaster;
  var localBranch;

  return git.Repository.open(repoPath)
    .then(
      (repo) => { return Promise.resolve(repository = repo); },
      (error) => {
        return Promise.reject(new RepositoryError( Errors.OpeningRepository, "Couldn't open local repository", error ));
      }
    )
    .then(getCurrentBranchName)
    .then((branchName) => { return Promise.resolve(localBranch = branchName); })
    // TODO see if the latest remote commit is different from the local branch
    .then(() => { return checkIfWorkingDirectoryIsDirty(repository); })
    .then(() => {  return checkCurrentBranchIsRemote(localBranch, remoteBranch) })
    .then(() => {  return fetchAll(repository, remote);  })
    .then(() => { return pullLatest(repository, remote, remoteBranch); })
    .then(() => { return Promise.resolve(localBranch); })
    .catch((error) => {
      return Promise.reject({
        ...error,
        branchName: localBranch
      });
    })
    ;
}

export function fetchAll(repository, remote) {
  logger("Fetching...");
  return repository.fetch(remote, {
    credentials: function (url, userName) {
      return git.Cred.sshKeyFromAgent(userName);
      // TODO allow credentials to be provided by app
      //var sshPublicKey = fs(...)
      //var sshPrivateKey = fs(...)
      //return git.Cred.sshKeyNew(
      //    userName,
      //    sshPublicKey,
      //    sshPrivateKey,
      //    "");
    },
    certificateCheck: function () {
      return 1;
    }
  }).then(
    () => {
      logger("Fetched remote branches");
      return Promise.resolve();
    },
    (error) => {
      logger("Fetch error", error);
      return Promise.reject(new RepositoryError(Errors.AuthenticationError, "Couldn't fetch from remote, is ssh-agent running", error))
    }
  );
}

export function checkIfWorkingDirectoryIsDirty(repository) {
  logger("Checking if working directory is dirty");
  return repository.getStatus()
    .then(function(statuses) {
      function statusToText(status) {
        var words = [];
        if (status.isNew()) { words.push("NEW"); }
        if (status.isModified()) { words.push("MODIFIED"); }
        if (status.isTypechange()) { words.push("TYPECHANGE"); }
        if (status.isRenamed()) { words.push("RENAMED"); }
        if (status.isIgnored()) { words.push("IGNORED"); }

        return words.join(" ");
      }

      if (statuses.length !== 0) {
        var repositoryStatus = statuses.map(function(file) {
          return file.path() + " " + statusToText(file);
        });
        logger("Status: ", repositoryStatus);

        return Promise.reject(new RepositoryError(
          Errors.DirtyWorkingDirectory,
          "Working directory is dirty",
          repositoryStatus));
      } else {
        return Promise.resolve();
      }
    });
}

export function getCurrentBranchName(repository) {
  return repository.getCurrentBranch().then((ref) => {
    return Promise.resolve(ref.name().substring('refs/heads/'.length));
  });
}

export function checkCurrentBranchIsRemote(branchName, remoteBranchName) {
  console.log("Checking if current branch matches remote", branchName, remoteBranchName);
  if (branchName != remoteBranchName) {
    // TODO save the current branch, checkout the branch to track and see if it can be pulled then rebase on it.
    return Promise.reject(
      new RepositoryError(Errors.WrongBranch, "Not currently on the " + remoteBranchName + " branch"));
  } else {
    return Promise.resolve({ branchName });
  }
}

export function pullLatest(repository, remote, branchName) {
  logger("Pulling in changes");
  return repository.mergeBranches(branchName, remote + "/" + branchName)
    .then(
    () => {
      logger("Pull completed");
      return Promise.resolve()
    },
    (error) => {
      logger("Pull failed", error);
      return Promise.reject(new RepositoryError(
        Errors.MergeFail,
        "Failed to cleanly merge, local branch is either ahead or diverged",
        error));
    });
}
