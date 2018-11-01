/**
 * @file a11yMenubar.js
 */

class a11yMenubar {
  
  constructor(id, domObj=document, ariaLabel='') {
    // Define members.
    this._keyCode = {
      'TAB':      9,
      'ENTER':    13,
      'ESC':      27,
      'SPACE':    32,
      'END':      35,
      'HOME':     36,
      'ARROW_LEFT':     37,
      'ARROW_UP':       38,
      'ARROW_RIGHT':    39,
      'ARROW_DOWN':     40,
    };
    
    this._id = id;
    this._domObj = domObj;
    this._ariaLabel = ariaLabel;
    this._navElem = this._domObj.getElementById(this._id);
    
    // Set up aria roles and attributes. 
    let menubar = this._navElem.querySelectorAll('nav > ul');
    
    this._navElem.setAttribute('aria-label', this._ariaLabel);
    
    // Ideally there should only be one immediate descendant ul in navElem, but may as well loop.
    for (let i = 0; i < menubar.length; i++) {
      menubar[i].setAttribute('role', 'menubar');
      menubar[i].setAttribute('aria-label', this._ariaLabel);
      
      let menuitem = menubar[i].querySelectorAll('li > a');
      
      for (let j = 0; j < menuitem.length; j++) {
        // Tab index of first menuitem should be 0.
        let tabIndex = (j == 0) ? 0 : -1;
        
        menuitem[j].setAttribute('role', 'menuitem');
        menuitem[j].setAttribute('tabindex', tabIndex);
        
        // Testing 'this' binding on handler.
        menuitem[j].addEventListener('keydown', this.handleKeydownMenubar.bind(this));
        
        // Check for submenus.
        let liElem = menuitem[j].parentNode;
        let menu = liElem.querySelectorAll('a + ul');
        
        for (let k = 0; k < menu.length; k++) {
          // Get aria-label from anchor sibing.
          let menuLiElem = menu[k].parentNode;
          let aElem = menuLiElem.querySelector('a');
          let aElemText = aElem.textContent;
          
          aElem.setAttribute('aria-haspopup', 'true');
          aElem.setAttribute('aria-expanded', 'false');
          
          menu[k].setAttribute('role', 'menu');
          menu[k].setAttribute('aria-label', aElemText);
        }
        
      }
      
      // All list item elements should have an aria role of "none".
      let liElem = menubar[i].querySelectorAll('li');
      
      for (let l = 0; l < liElem.length; l++) {
        liElem[l].setAttribute('role', 'none');
      }
    }
  }
  
  destroy () {
    // Remove all attributes/behaviors, etc. from constructor.
  }
  
  handleKeydownMenubar (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    console.log(event.key);
    console.log(event.which);
    console.log(event.keyCode);
    
    let menuitem = event.target;
    let key = this.normalizeKey(event.key || event.keyCode);
    
    switch (key) {
      case this._keyCode.SPACE:
      case this._keyCode.ENTER:
        // Opens submenu and moves focus to first item in the submenu.
        console.info(menuitem);
        this.openSubmenu(menuitem);
        break;
      
      case this._keyCode.ARROW_RIGHT:
        /*
          Moves focus to the next item in the menubar.
          If focus is on the last item, moves focus to the first item.
         */
        break;
      
      case this._keyCode.ARROW_LEFT:
        /*
          Moves focus to the previous item in the menubar.
          If focus is on the first item, moves focus to the last item.
         */
        break;
      
      case this._keyCode.ARROW_DOWN:
        // Opens submenu and moves focus to first item in the submenu.
        break;
      
      case this._keyCode.ARROW_UP:
        // Opens submenu and moves focus to last item in the submenu.
        break;
        
      case this._keyCode.HOME:
        // Moves focus to first item in the menubar.
        break;
      
      case this._keyCode.END:
        // Moves focus to last item in the menubar.
        break;
      
      // Consider adding WCAG 2.0 AAA Character handling.
    }
    
  };
  
  handleKeydownSubmenu (event) {
    if (event.defaultPrevented) {
      return;
    }
    
  }
  
  openSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    
    menu.classList.add('a11yMenubar-menu-open');
    menuitem.setAttribute('aria-expanded', 'true');
    
    console.log(menu);
  }
  
  closeSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    
    menu.classList.remove('a11yMenubar-menu-open');
    menuitem.setAttribute('aria-expanded', 'false');
    
    // TODO: Close everything nested in submenu...
  }
  
  normalizeKey (key) {
    let normalizedKey = null;
    
    if (key == 'Tab' || key == 9) {
      normalizedKey = this._keyCode.TAB;
    }
    else if (key == 'Enter' || key == 13) {
      normalizedKey = this._keyCode.ENTER;
    }
    else if (key == 'Escape' || key == 'Esc' || key == 13) {
      normalizedKey = this._keyCode.ESC;
    }
    else if (key == ' ' || key == 32) {
      normalizedKey = this._keyCode.SPACE;
    }
    else if (key == 'End' || key == 35) {
      normalizedKey = this._keyCode.END;
    }
    else if (key == 'Home' || key == 36) {
      normalizedKey = this._keyCode.HOME;
    }
    else if (key == 'ArrowLeft' || key == 37) {
      normalizedKey == this._keyCode.ARROW_LEFT;
    }
    else if (key == 'ArrowUp' || key == 38) {
      normalizedKey == this._keyCode.ARROW_UP;
    }
    else if (key == 'ArrowRight' || key == 39) {
      normalizedKey == this._keyCode.ARROW_RIGHT;
    }
    else if (key == 'ArrowDown' || key == 40) {
      normalizedKey = this._keyCode.ARROW_DOWN;
    }
    
    return normalizedKey;
  }
  
};