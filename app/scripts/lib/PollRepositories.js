"use strict";

var git = require("nodegit");

var repoPath = "C:/Users/Dean/workspace/git-watch-test-repo";
var remoteName = 'origin';
var remoteMaster = 'master';

pullLatestRemote(repoPath, remoteName, remoteMaster)
  .then(function() {
    console.log("repo up to date.");
  })
  .catch(function(err) {
    console.error("error", err);
  });

function pullLatestRemote(repoPath, remoteName, remoteMaster) {
  var repository;
  return git.Repository.open(repoPath)
    .then(function(repo) {
      repository = repo;
      console.log("Fetching...");
      return fetchAll(repository);
    })
    .then(function() {
      return checkIfWorkingDirectoryIsDirty(repository, remoteMaster, remoteName);
    })
    .then(function() {
      return checkCurrentBranchIsRemote(repository, remoteMaster)
    })
    .then(function() {
      return pullLatest(repository, remoteMaster, remoteName);
    })
}

function fetchAll(repository) {
  return repository.fetch(remoteName, {
    credentials: function(url, userName) {
      return git.Cred.sshKeyFromAgent(userName);
    },
    certificateCheck: function() {
      return 1;
    }
  });
}

function checkIfWorkingDirectoryIsDirty(repository) {
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

        return Promise.reject("Working directory is dirty");
      } else {
        return Promise.resolve();
      }
    });
}

function checkCurrentBranchIsRemote(repository, remoteBranchName) {
  return repository.getCurrentBranch().then(function(ref) {
    var branchName = ref.name().substring('refs/heads/'.length);

    if (branchName != remoteBranchName) {
      // TODO save the current branch, checkout the branch to track and see if it can be pulled then rebase on it.
      return Promise.reject("Not currently on the " + remoteMaster + " branch");
    } else {
      return Promise.resolve();
    }});
}

function pullLatest(repository, branchName, remote) {
  return repository.mergeBranches(branchName, remote + "/" + branchName).then(function() {
    return Promise.resolve()
  }, function() {
    return Promise.reject("Failed to cleanly merge, local branch is either ahead or diverged");
  });
}


//const fiveMinutes = 300000; //ms
//var repositoryPoll = setInterval(() => {
//
//console.log("pollingRepositories");
//var contents = JSON.parse(fs.readFileSync('./repositories.json', 'utf8'));
//console.log("repos", contents.repositories);
//Repository.open("")
//
//}, fiveMinutes);

