import fs from 'fs';
import git from "nodegit";
import Errors from '../constants/RepositoryErrors';

class RepositoryError {
  constructor(code, message, details) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export default function pullLatestRemote(repoPath, remoteName, remoteMaster) {
  console.log("clicked on", repoPath);
  var repository;
  var remote = remoteName;
  var remoteBranch = remoteMaster;
  return git.Repository.open(repoPath)
    .then(
      (repo) => { return Promise.resolve(repository = repo); },
      (error) => {
        console.log(error);
        return Promise.reject(new RepositoryError(
          Errors.OpeningRepository,
          "Couldn't open local repository",
          error
        ));
      }
    )
    // TODO see if the latest remote commit is different from the local branch
    .then(function() {
      console.log("Checking if working directory is dirty");
      return checkIfWorkingDirectoryIsDirty(repository);
    })
    .then(function() {
      console.log("Checking if current branch matches remote");
      return checkCurrentBranchIsRemote(repository, remoteBranch)
    })
    .then(function() {
        console.log("Fetching...");
        return fetchAll(repository, remote);
      })
    .then(function() {
      console.log("Pulling in changes");
      return pullLatest(repository, remote, remoteBranch);
    })
}

export function fetchAll(repository, remote) {
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
      console.log("Fetched remote branches");
      return Promise.resolve();
    },
    (error) => {
      console.log("Fetch error", error);
      return Promise.reject(new RepositoryError(Errors.AuthenticationError, "Couldn't fetch from remote, is ssh-agent running", error))
    }
  );
}

export function checkIfWorkingDirectoryIsDirty(repository) {
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
        console.log("Status: ", repositoryStatus);

        return Promise.reject(new RepositoryError(
          Errors.DirtyWorkingDirectory,
          "Working directory is dirty",
          repositoryStatus));
      } else {
        return Promise.resolve();
      }
    });
}

export function checkCurrentBranchIsRemote(repository, remoteBranchName) {
  return repository.getCurrentBranch().then((ref) => {
    var branchName = ref.name().substring('refs/heads/'.length);

    if (branchName != remoteBranchName) {
      // TODO save the current branch, checkout the branch to track and see if it can be pulled then rebase on it.
      return Promise.reject(
        new RepositoryError(Errors.WrongBranch, "Not currently on the " + remoteBranchName + " branch"));
    } else {
      return Promise.resolve();
    }});
}

export function pullLatest(repository, remote, branchName) {
  return repository.mergeBranches(branchName, remote + "/" + branchName)
    .then(
    () => {
      console.log("Pull completed");
      return Promise.resolve()
    },
    (error) => {
      console.log("Pull failed", error);
      return Promise.reject(new RepositoryError(
        Errors.MergeFail,
        "Failed to cleanly merge, local branch is either ahead or diverged",
        error));
    });
}
