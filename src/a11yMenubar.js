/**
 * @file a11yMenubar.js
 */

var a11yMenubar = (function (document) {
  "use strict";
  
  var options = {
    "id" : id
  }
  
  var keyCode = {
    'TAB':      9,
    'RETURN':   13,
    'ESC':      27,
    'SPACE':    32,
    'PAGEUP':   33,
    'PAGEDOWN': 34,
    'END':      35,
    'HOME':     36,
    'LEFT':     37,
    'UP':       38,
    'RIGHT':    39,
    'DOWN':     40,
  };
  
  function init(id) {
    var navElem = document.getElementById(id);
    var menubar = navElem.getElementByTagName('ul');
    
    // Ideally there should only be one ul in navElem, but may as well loop.
    for (let i = 0; i < menubar.length; i++) {
      
    }
  }
  
  function destroy() {
    
  }
  
  function addAttributes() {
    
  }
  
  function openSubmenu() {
    
  }
  
  function closeSubmenu() {
    
  }
  
  return {
    "init" : init,
    "destroy" : destroy
  }
  
})(document);