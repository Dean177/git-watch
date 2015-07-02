"use strict";

var fs = require('fs');

var  monitorAndRun, nodeWebKit,
  slice = [].slice;


function startProcess(string) {
  var childProcess = require('child_process').spawn(string, []);
  childProcess.stdout.on('data', function(data) {
    return console.log(filterLog(data.str().trim()));
  });
  childProcess.stderr.on('data', function(data) {
    return console.log(filterLog(data.str().trim()));
  });
  return childProcess;
};

function filterLog(data) {
  if (data.contains('breakpad_mac.mm(238)] Breakpad initializaiton failed')) {
    return '';
  }
  return data;

  /*
   * this can also be used to clean up the log messages routed from nodewebkit
   text = data.after('] "').before('", source')

   r = /\\u([\d\w]{4})/gi;
   x = text.replace r, (match, grp) -> String.fromCharCode(parseInt(grp, 16))
   unescape(x);
   if x == ''
   return data
   else
   x
   */
};

console.log('Monitoring for file changes in ./ and test');

function monitorAndRun(target) {
  return fs.watch(target, function(type) {
    console.log("detected " + type + " in " + target + ", running nodewebkit");
    return startProcess('nodewebkit');
  });
}


monitorAndRun('./');

monitorAndRun('./tests');

startProcess('nodewebkit');

return;

nodeWebKit = null;

describe('main', function() {
  before(function() {
    return nodeWebKit = startProcess('nodewebkit');
  });
  after(function() {});
  return it('run nodewebkit', function() {});
});