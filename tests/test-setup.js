require('nw.gui').Window.get().showDevTools().resizeTo(800, 1000);

document.addEventListener("DOMContentLoaded", function(event) {
  var babel = require('babel/register');
  var fs = require('fs');
  var Mocha = require('mocha');
  var path = require('path');

  // First, you need to instantiate a Mocha instance.
  var mocha = new Mocha({
    compilers: {
      js: babel
    }
  });

  // log out to the browser's console - https://github.com/simov/loca
  mocha.reporter('loca');
  // pass the browser context
  mocha.suite.emit('pre-require', window, null, mocha);

  // Then, append the tests
  fs.readdirSync('nwjs').forEach(function (file) {
    // Instead of using mocha's "addFile"
    //            var opening = '<script src="';
    //            var closing = '"/>';
    //            path.join('nwjs', file)
    var testScript = document.createElement('script');
    testScript.src=path.join('nwjs', file);
    document.body.appendChild(testScript);
  });

  mocha.run(function (failures) {
    process.on('exit', function () {
      process.exit(failures);
    });
  });
});