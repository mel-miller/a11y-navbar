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
    this._currentMenubarIndex = 0;
    this._currentMenuitem = null;
    
    // TODO: Add configurable defaults for class names.
    
    // TODO: Add aria-orientation attribute.
    
    // Set up aria roles and attributes. 
    this._navElem.setAttribute('aria-label', this._ariaLabel);
    this._navElem.classList.add('a11y-menubar');
    
    let menubar = this._navElem.querySelector('ul');
    
    menubar.setAttribute('role', 'menubar');
    menubar.setAttribute('aria-label', this._ariaLabel);
    
    // For menubar menuitems specifically.
    let menubarMenuitems = menubar.children;
    
    for (let i = 0; i < menubarMenuitems.length; i++) {
      let menubarMenuitem = menubarMenuitems[i].firstChild;
      menubarMenuitem.classList.add('a11y-menubar-menuitem');
      // collect these as an Array or something and store in the class.
      this._menubarMenuitems[i] = menubarMenuitem;
      // Add keydown handler (bound to a11yMenubar instance).
      menubarMenuitem.addEventListener('keydown', this.handleKeydownMenubar.bind(this));
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
        submenus[k].classList.add('a11y-menubar-menu-closed');
        
        // TODO: Add keydown handler to submenu menuitems (bound to a11yMenubar instance).
      }
      
    }
    
    // All li elements should have an aria role of "none".
    let liElem = menubar.querySelectorAll('li');
    
    for (let l = 0; l < liElem.length; l++) {
      liElem[l].setAttribute('role', 'none');
    }
    
    // First menubar menuitem should have tabindex 0.
    this._menubarMenuitems[0].setAttribute('tabindex', '0');
    
    // First menubar menuitem should be the current menuitem.
    this._currentMenuitem = this._menubarMenuitems[0];
    
    // TODO: Add hover listeners.
    
    // TODO: Add hoverintent functionality.
  }
  
  destroy () {
    // Remove all attributes/behaviors, etc. from constructor.
  }
  
  handleKeydownMenubar (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let menuitem = event.target;
    let key = this.normalizeKey(event.key || event.keyCode);
    
    console.log(key);
    
    switch (key) {
      case this._keyCode.SPACE:
      case this._keyCode.ENTER:
      case this._keyCode.ARROW_DOWN:
        // Opens submenu and moves focus to first item in the submenu.
        this.closeAllSubmenus();
        this.openSubmenu(menuitem);
        let firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li > a[role=menuitem]');
        console.log(firstMenuitem);
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
        let nextMenubarIndex = (this._currentMenubarIndex + 1 >= this._menubarMenuitems.length) ? 0 : this._currentMenubarIndex + 1;
        let nextMenubarItem = this._menubarMenuitems[nextMenubarIndex];
        
        nextMenubarItem.focus();
        this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');
        nextMenubarItem.setAttribute('tabindex', '0');
        this._currentMenubarIndex = nextMenubarIndex;
        this._currentMenuitem = nextMenubarItem;
        break;
      
      case this._keyCode.ARROW_LEFT:
        /*
          Moves focus to the previous item in the menubar.
          If focus is on the first item, moves focus to the last item.
         */
        let prevMenubarIndex = (this._currentMenubarIndex - 1 < 0) ? this._menubarMenuitems.length - 1 : this._currentMenubarIndex - 1;
        let prevMenubarItem = this._menubarMenuitems[prevMenubarIndex];
        
        prevMenubarItem.focus();
        this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');
        prevMenubarItem.setAttribute('tabindex', '0');
        this._currentMenubarIndex = prevMenubarIndex;
        this._currentMenuitem = prevMenubarItem;
        break;
      
      case this._keyCode.ARROW_UP:
        // Opens submenu and moves focus to last item in the submenu.
        this.openSubmenu(menuitem);
        let lastMenuitem = menuitem.parentNode.querySelector('ul[role=menu]').lastElementChild.firstElementChild;
        lastMenuitem.focus();
        this._currentMenuitem.setAttribute('tabindex', '-1');
        this._currentMenuitem = lastMenuitem;
        this._currentMenuitem.setAttribute('tabindex', '0');
        break;
        
      case this._keyCode.HOME:
        // Moves focus to first item in the menubar.
        this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');
        this._menubarMenuitems[0].setAttribute('tabindex', '0');
        this._menubarMenuitems[0].focus();
        break;
      
      case this._keyCode.END:
        // Moves focus to last item in the menubar.
        this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');
        this._menubarMenuitems[this._menubarMenuitems.length - 1].setAttribute('tabindex', '0');
        this._menubarMenuitems[this._menubarMenuitems.length - 1].focus();
        break;
      
      // TODO: Consider adding optional character handling.
    }
    
  };
  
  handleKeydownSubmenu (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let menuitem = event.target;
    let key = this.normalizeKey(event.key || event.keyCode);
    
    console.log(key);
    
    switch(key) {
      case this._keyCode.SPACE:
      case this._keyCode.ENTER:
        // Activates menu item, causing the link to be activated.
        break;
      
      case this._keyCode.ESC:
        /* 
          Closes submenu.
          Moves focus to parent menubar item.
        */
        break;
      
      case this._keyCode.ARROW_RIGHT:
        /*
          -If focus is on an item with a submenu, opens the submenu and places focus on the first item.
          -If focus is on an item that does not have a submenu:
              -Closes submenu.
              -Moves focus to next item in the menubar.
              -Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
        */
        break;
      
      case this._keyCode.ARROW_LEFT:
        /*
          -Closes submenu and moves focus to parent menu item.
          -If parent menu item is in the menubar, also:
              -moves focus to previous item in the menubar.
              -Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
        */
        break;
      
      case this._keyCode.ARROW_DOWN:
        /*
          -Moves focus to the next item in the submenu.
          -If focus is on the last item, moves focus to the first item.
        */
        break;
      
      case this._keyCode.ARROW_UP:
        /*
          -Moves focus to previous item in the submenu.
          -If focus is on the first item, moves focus to the last item.
        */
        break;
      
      case this._keyCode.HOME:
        // Moves focus to the first item in the submenu.
        break;
      
      case this._keyCode.END:
        // Moves focus to the last item in the submenu.
        break;
      
      // TODO: Consider adding optional printable character handling.
    }
  }
  
  openSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    
    // Only open submenu if it exists.
    if (menu != null) {
      menu.classList.remove('a11y-menubar-menu-closed');
      menu.classList.add('a11y-menubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'true');
    }
  }
  
  closeSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    
    if (menu != null) {
      menu.classList.remove('a11y-menubar-menu-open');
      menu.classList.add('a11y-menubar-menu-closed');
      menuitem.setAttribute('aria-expanded', 'false');
      
      // TODO: Close everything nested in submenu...
    }
  }
  
  closeAllSubmenus() {
    // Closes all currently open submenus.
    let openSubmenus = this._navElem.querySelectorAll('ul.a11y-menubar-menu-open');
    
    for (let i = 0; i < openSubmenus.length; i++) {
      let aElem = openSubmenu[i].parentNode.querySelector('ul + a');
      aElem.setAttribute('aria-expanded', 'false');
      openSubmenu[i].classList.remove('a11y-menubar-menu-open');
      openSubmenu[i].classList.add('a11y-menubar-menu-closed');
    }
  }
  
  normalizeKey (key) {
    let normalizedKey = null;
    
    switch (key) {
      case 'Tab':
      case 9:
        normalizedKey = this._keyCode.TAB;
        break;
      
      case 'Enter':
      case 13:
        normalizedKey = this._keyCode.ENTER;
        break;
      
      case 'Escape':
      case 'Esc':
      case 13:
        normalizedKey = this._keyCode.ESC;
        break;
      
      case ' ':
      case 32:
        normalizedKey = this._keyCode.SPACE;
        break;
      
      case 'End':
      case 35:
        normalizedKey = this._keyCode.END;
      
      case 'Home':
      case 36:
        normalizedKey = this._keyCode.HOME;
        break;
      
      case 'ArrowLeft':
      case 37:
        normalizedKey = this._keyCode.ARROW_LEFT;
        break;
      
      case 'ArrowUp':
      case 38:
        normalizedKey = this._keyCode.ARROW_UP;
        break;
      
      case 'ArrowRight':
      case 39:
        normalizedKey = this._keyCode.ARROW_RIGHT;
        break;
      
      case 'ArrowDown':
      case 40:
        normalizedKey = this._keyCode.ARROW_DOWN;
        break;
    }
    
    return normalizedKey;
  }
  
};