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
    this._menubarMenuitems = [];
    this._currentMenuitem = null;
    
    // Set up aria roles and attributes. 
    this._navElem.setAttribute('aria-label', this._ariaLabel);
    this._navElem.classList.add('a11y-menubar');
    
    let menubar = this._navElem.querySelector('ul');
    
    menubar.setAttribute('role', 'menubar');
    menubar.setAttribute('aria-label', this._ariaLabel);
    
    // For menubar menuitems specifically.
    let menubarMenuitems = menubar.children;
    
    for (let i = 0; i < menubarMenuitems.length; i++) {
      menubarMenuitems[i].firstChild.classList.add('a11y-menubar-menuitem');
      // collect these as an Array or something and store in the class.
      this._menubarMenuitems[i] = menubarMenuitems[i];
      // Add keydown handler (bound to a11yMenubar instance).
      menubarMenuitems[i].addEventListener('keydown', this.handleKeydownMenubar.bind(this));
    }
    
    // Attributes for all menuitems.
    let menuitems = menubar.querySelectorAll('li > a');
    
    for (let j = 0; j < menuitems.length; j++) {
      menuitems[j].setAttribute('role', 'menuitem');
      menuitems[j].setAttribute('tabindex', '-1');
      
      // Check for submenus.
      let liElem = menuitems[j].parentNode;
      let submenus = liElem.querySelectorAll('a + ul');
      
      for (let k = 0; k < submenus.length; k++) {
        // Get aria-label from anchor sibing.
        let submenuLiElem = submenus[k].parentNode;
        let aElem = submenuLiElem.querySelector('a');
        let aElemText = aElem.textContent;
        
        aElem.setAttribute('aria-haspopup', 'true');
        aElem.setAttribute('aria-expanded', 'false');
        
        submenus[k].setAttribute('role', 'menu');
        submenus[k].setAttribute('aria-label', aElemText);
        
        // TODO: Add keydown handler to submenu menuitems (bound to a11yMenubar instance).
      }
      
    }
    
    // All li elements should have an aria role of "none".
    let liElem = menubar.querySelectorAll('li');
    
    for (let l = 0; l < liElem.length; l++) {
      liElem[l].setAttribute('role', 'none');
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
        this.openSubmenu(menuitem);
        let firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li > a[role=menuitem]');
        firstMenuitem.focus();
        this._currentMenuitem.setAttribute('tabindex', '-1');
        this._currentMenuitem = firstMenuitem;
        this._currentMenuitem.setAttribute('tabindex', '0');
        break;
      
      case this._keyCode.ARROW_RIGHT:
        /*
          Moves focus to the next item in the menubar.
          If focus is on the last item, moves focus to the first item.
         */
        let menubarItems = this._navElem
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
    
    // Only open submenu if it exists.
    if (menu != null) {
      menu.classList.add('a11y-menubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'true');
    }
  }
  
  closeSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    
    if (menu != null) {
      menu.classList.remove('a11y-menubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'false');
      
      // TODO: Close everything nested in submenu...
    }
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