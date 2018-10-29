/**
 * @file a11yMenubar.js
 */

class a11yMenubar {
  
  constructor(id, domObj=document, ariaLabel='') {
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
    
    let navElem = domObj.getElementById(id);
    let menubar = navElem.querySelectorAll('nav > ul');
    
    navElem.setAttribute('aria-label', ariaLabel);
    
    // Ideally there should only be one immediate descendant ul in navElem, but may as well loop.
    for (let i = 0; i < menubar.length; i++) {
      menubar[i].setAttribute('role', 'menubar');
      menubar[i].setAttribute('aria-label', ariaLabel);
      
      let menuitem = menubar[i].querySelectorAll('li > a');
      
      for (let j = 0; j < menuitem.length; j++) {
        menuitem[j].setAttribute('role', 'menuitem');
        menuitem[j].setAttribute('tabindex', '-1');
        
        // Check for submenus.
        let liElem = menuitem[j].parentNode;
        let menu = liElem.querySelectorAll('a + ul');
        
        for (let k = 0; k < menu.length; k++) {
          // Get aria-label from anchor sibing.
          let menuLiElem = menu[k].parentNode;
          let aElem = menuLiElem.querySelector('a');
          let aElemText = aElem.textContent;
          
          menu[k].setAttribute('role', 'menu');
          menu[k].setAttribute('aria-label', aElemText);
        }
        
      }
      
      let liElem = menubar[i].querySelectorAll('li');
      
      for (let l = 0; l < liElem.length; l++) {
        liElem[l].setAttribute('role', 'none');
      }
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