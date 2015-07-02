"use strict";

var git = require("nodegit");

var repoPath = "C:/Users/Dean/workspace/git-watch-test-repo";
var remoteName = 'origin';
var remoteMaster = 'master';


git.Repository.open(repoPath)
  .then(function(repository) {
    return isCurrentBranchRemote(repository, remoteMaster);
  }).then(function(isCurrentBranchRemote) {
      console.log("currentBranchIsRemote:", isCurrentBranchRemote);
  })
  .catch(function(err) { console.error(err); });



function isCurrentBranchRemote(repository, remoteBranchName) {
  return repository.getCurrentBranch()
    .then(function (ref) {
      console.log("ref name:", ref.name());
      var branchName = ref.name().substring('refs/heads/'.length);
      console.log("branch name:", branchName);
      return branchName === remoteBranchName;
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

