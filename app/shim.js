"use strict";



(function(){
  /**
   * Unfortunately for node-webkit Browserify overwrites require() to use a browser-context version, this will break node
   * modules such as 'fs' or in this project specifically 'node-git'. When using these modules, import them using
   * nativeRequire to avoid the browserify hi-jacking.
   *
   * To facilitate the faster browser based testing, use browser compatible shims for modules imported using nativeRequire.
   */
  function shim(name) {
    var shims = {
      fs: {
        readFileSync: function(fileName) { return "browserFile"; }
      }
    };

    return shims[name];
  }

  window.nativeRequire = (typeof require !== 'undefined') ? require : shim;


  function isNodeWebkit() {
    try {
      // All compiled binary versions of Node-Webkit will have the “nw.gui” module
      return (typeof require('nw.gui') !== "undefined");
    } catch(e) {
      return false;
    }
  }

  window.isNodeWebkit = isNodeWebkit()

})();