/**
 * @file a11yMenubar.js
 */

class a11yMenubar {
  
  constructor(id, ariaLabel='') {
    this._keyCode = {
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
    
    let navElem = document.getElementById(id);
    let menubar = navElem.getElementByTagName('ul');
    
    // Ideally there should only be one ul in navElem, but may as well loop.
    for (let i = 0; i < menubar.length; i++) {
      // Set role.
      menubar[i].setAttribute('role', 'menubar');
      
      // Set aria-label.
      menubar[i].setAttribute('aria-label', ariaLabel);
    }
  }
  
  destroy() {
    
  }
  
  addAttributes() {
    
  }
  
  openSubmenu() {
    
  }
  
  closeSubmenu() {
    
  }
  
};