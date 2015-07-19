var fs = require('fs-extra');
var path = require('path');
var expect = require('chai').expect;

var PollRepositories = require('../app/lib/PollRepositories');


describe("PollRepositories", function() {
  var testReposPath = path.resolve('./tests/test-repositories');
  var testReposDestination = path.resolve('./tests/test-repositories-temp');

  before('copy test repository folders', function(done) {
    fs.copy(testReposPath, testReposDestination, function(err) {
      if (err) { console.error("Test setup failed", err); }
      done();
    });
  });

  after(function(done) {
    fs.remove(testReposDestination, function(err) {
      if (err) { console.error("Test cleanup failed", err); }
      done();
    });
  });


  it('should fail when the working directory is dirty');

  it('should fail when HEAD is not the remote branch');

  it('should fail when HEAD has conflicting changes with the remote branch', function() {
    var repoPath = path.resolve('./tests/test-repositories-temp/test-repo-diverged-conflicting');
      //"C:/Users/Dean/workspace/git-watch-test-repo";
    var remoteName = 'origin';
    var remoteMaster = 'master';

    expect(repoPath.length).to.be.gt(2);

    //pullLatestRemote(repoPath, remoteName, remoteMaster)
    //  .then(function() {
    //    console.log("repo up to date.");
    //  })
    //  .catch(function(err) {
    //    console.error("error", err);
    //  });
  });

  it('should succeed when HEAD has non conflicting changes with the remote branch');

  it('should return the branch name');

});