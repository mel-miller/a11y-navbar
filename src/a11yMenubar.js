/**
 * @file a11yMenubar.js
 * 
 * A11y Menubar Copyright (c) 2019 Joe Bondra
 */

class a11yMenubar {
  
  constructor(id, options={}) {
    // Define members.
    this._keyCode = {
      'TAB':             9,
      'ENTER':          13,
      'ESC':            27,
      'SPACE':          32,
      'END':            35,
      'HOME':           36,
      'ARROW_LEFT':     37,
      'ARROW_UP':       38,
      'ARROW_RIGHT':    39,
      'ARROW_DOWN':     40,
    };
    
    // Merge user-defined options with default options.
    this._defaultOptions = {
      'windowObj' : window,
      'domObj' : document,
      'ariaLabel' : '',
      'hoverintent' : hoverintent,
      'ariaOrientation' : 'horizontal',
      'breakpointMinWidth' : 500,
      'menubarToggleText' : 'Menu',
      'mode' : 'standard'
    };
    this._options = Object.assign(this._defaultOptions, options);
    
    this._id = id;
    this._navElem = this._options.domObj.getElementById(this._id);
    this._menubarMenuitems = [];
    this._currentMenubarIndex = 0;
    this._currentMenuitem = null;
    
    if (this._options.mode == 'dualAction') {
      // Add element to explain alternate instructions for mode dualAction.
      this._menubarInstructions = this._options.domObj.createElement('div');
      this._menubarInstructions.innerHTML = "<p>Use <strong>Enter</strong> or <strong>Space</strong> to activate links.</p>" +
      		"<p>Use appropriate arrow key to open or close submenus.</p>";
      this._menubarInstructions.setAttribute('id', this._id + '-menubar-instructions');
      this._menubarInstructions.classList.add('a11y-menubar-instructions');
      this._navElem.insertBefore(this._menubarInstructions, this._navElem.firstElementChild);
    }
    
    // Add/Remove toggle button based on breakpointMinWidth.
    this._menubarToggle = this._options.domObj.createElement('button');
    this._menubarToggle.textContent = this._options.menubarToggleText;
    this._menubarToggle.setAttribute('id', this._id + '-toggle');
    this._menubarToggle.setAttribute('aria-expanded', 'false');
    this._menubarToggle.setAttribute('aria-controls', this._id);
    this._menubarToggle.classList.add('a11y-menubar-toggle');
    let menuIcon = this._options.domObj.createElement('span');
    menuIcon.setAttribute('aria-hidden', 'true');
    this._menubarToggle.appendChild(menuIcon);
    this._menubarToggle.addEventListener('click', this.handleClickMenubarToggle.bind(this));
    
    this._options.windowObj.addEventListener('resize', this.handleMenubarResize.bind(this));
    
    // TODO: Add configurable defaults for class names.
    
    // Set up aria roles and attributes. 
    this._navElem.setAttribute('aria-label', this._options.ariaLabel);
    this._navElem.classList.add('a11y-menubar');
    this._navElem.classList.add('a11y-menubar-orientation-' + this._options.ariaOrientation);
    
    let menubar = this._navElem.querySelector('ul');
    
    menubar.setAttribute('role', 'menubar');
    menubar.setAttribute('aria-label', this._options.ariaLabel);
    menubar.setAttribute('aria-orientation', this._options.ariaOrientation);
    
    // Add hoverintent functionality (or mouse events if hoverintent not available).
    if (this._options.hoverintent) {
      // Hoverintent in environment.
      let options = {
        timeout: 900,
        interval: 50
      };
      
      this._options.hoverintent(
          menubar,
          function (event) {},
          this.handleMouseoutMenubar.bind(this)
      ).options(options);
    }
    else {
      // Default mouse events.
      menubar.addEventListener('mouseout', this.handleMouseoutMenubar.bind(this));
    }
    
    // For menubar menuitems specifically.
    let menubarMenuitems = menubar.children;
    
    for (let i = 0; i < menubarMenuitems.length; i++) {
      let menubarMenuitem = menubarMenuitems[i].firstElementChild;
      menubarMenuitem.classList.add('a11y-menubar-menuitem');
      
      // collect these as an Array or something and store in the class.
      this._menubarMenuitems[i] = menubarMenuitem;
      
      // Add keydown handler (bound to a11yMenubar instance).
      menubarMenuitem.addEventListener('keydown', this.handleKeydownMenubar.bind(this));
    }
    
    // Add keydown handler to submenu menuitems (bound to a11yMenubar instance).
    let submenuMenuitems = this._navElem.querySelectorAll('a + ul > li > a');
    
    for (let i = 0; i < submenuMenuitems.length; i++) {
      submenuMenuitems[i].addEventListener('keydown', this.handleKeydownSubmenu.bind(this));
      
      // Add handler to open parent menuitems if menu was closed by non-keyboard interaction.
      submenuMenuitems[i].addEventListener('focusin', this.handleFocusinMenuitem.bind(this));
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
      }
      
      // Add hoverintent functionality (or mouse events if hoverintent not available).
      if (this._options.hoverintent) {
        // Hoverintent in environment.
        let options = {
          timeout: 500,
          interval: 100
        };
        
        this._options.hoverintent(
            menuitems[j],
            this.handleMouseoverMenuitem.bind(this), 
            function (event) {}
        ).options(options);
      }
      else {
        // Default mouse events.
        menuitems[j].addEventListener('mouseover', this.handleMouseoverMenuitem.bind(this));
      }
      
      // Override click event for all menuitems.
      menuitems[j].addEventListener('click', this.handleClickMenuitem.bind(this));
      
      // Override touchmove event for all menuitems.
      menuitems[j].addEventListener('touchmove', this.handleTouchmoveMenuitem.bind(this));
      
      // TODO: If submenus are closed due to non-keyboard (e.g. mouse) interaction, add focusin event to open all relevant submenus.
    }
    
    // All li elements should have an aria role of "none".
    let liElem = menubar.querySelectorAll('li');
    
    for (let l = 0; l < liElem.length; l++) {
      liElem[l].setAttribute('role', 'none');
    }
    
    // First menubar menuitem should have tabindex 0.
    this._menubarMenuitems[0].setAttribute('tabindex', '0');
    
    if (this._options.mode == 'dualAction') {
      // Add instructions for dualAction mode to first menubar menuitem.
      this._menubarMenuitems[0].setAttribute('aria-describedby', this._id + '-menubar-instructions');
    }
    
    // First menubar menuitem should be the current menuitem.
    this._currentMenuitem = this._menubarMenuitems[0];
    
    // Check if the menu should be resized on page load.
    this.menubarResize();
    
  }
  
  destroy () {
    // Remove all attributes/behaviors, etc. from constructor.
  }
  
  // Event Handlers -----------------------------------------------------
  
  handleMenubarResize (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    this.menubarResize();
  }
  
  handleClickMenubarToggle (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let toggleButton = event.target;
    
    if (this._navElem.classList.contains('a11y-menubar-closed')) {
      this._navElem.classList.remove('a11y-menubar-closed');
      this._navElem.classList.add('a11y-menubar-open');
      toggleButton.setAttribute('aria-expanded', 'true');
    }
    else if (this._navElem.classList.contains('a11y-menubar-open')) {
      this._navElem.classList.remove('a11y-menubar-open');
      this._navElem.classList.add('a11y-menubar-closed');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  }
  
  handleKeydownMenubar (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    /*
     When items in a menubar are arranged vertically and items in menu containers are arranged horizontally:
      -Down Arrow performs as Right Arrow, and vice versa.
      -Up Arrow performs as Left Arrow, and vice versa.
     */
    
    let preventDefault = false; // Flag to prevent the keypress from doing what it usually would do.
    let menuitem = event.target;
    let key = this.normalizeKey(event.key || event.keyCode);
    let mode = this._options.mode;
    
    if (
      (key == this._keyCode.SPACE && mode == 'standard') ||
      (key == this._keyCode.ENTER && mode == 'standard') || 
      (this._options.ariaOrientation == 'horizontal' && key == this._keyCode.ARROW_DOWN) ||
      (this._options.ariaOrientation == 'vertical' && key == this._keyCode.ARROW_RIGHT)
    )
    {
      // Opens submenu and moves focus to first item in the submenu.
      this.closeAllSubmenus();
      this.openSubmenu(menuitem);
      let firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li > a[role=menuitem]');
      
      if (firstMenuitem != null) {
        firstMenuitem.focus();
        this.updateCurrentMenuitem(firstMenuitem);
      }
      preventDefault = true;
    }
    else if (
      (key == this._keyCode.SPACE && mode == 'dualAction') ||
      (key == this._keyCode.ENTER && mode == 'dualAction')
    )
    {
      // Activates menu item, causing the link to be activated.
      this.handleClick(menuitem);
      preventDefault = true;
    }
    else if (
      (this._options.ariaOrientation == 'horizontal' && key == this._keyCode.ARROW_RIGHT) ||
      (this._options.ariaOrientation == 'vertical' && key == this._keyCode.ARROW_DOWN)
    )
    {
      /*
        -Moves focus to the next item in the menubar.
        -If focus is on the last item, moves focus to the first item. 
       */
      let nextMenubarIndex = (this._currentMenubarIndex + 1 >= this._menubarMenuitems.length) ? 0 : this._currentMenubarIndex + 1;
      let nextMenubarItem = this._menubarMenuitems[nextMenubarIndex];
      
      nextMenubarItem.focus();
      this._currentMenubarIndex = nextMenubarIndex;
      this.updateCurrentMenuitem(nextMenubarItem);
      preventDefault = true;
    }
    else if (
      (this._options.ariaOrientation == 'horizontal' && key == this._keyCode.ARROW_LEFT) ||
      (this._options.ariaOrientation == 'vertical' && key == this._keyCode.ARROW_UP)
    )
    {
      /*
        -Moves focus to the previous item in the menubar.
        -If focus is on the first item, moves focus to the last item.
       */
      let prevMenubarIndex = (this._currentMenubarIndex - 1 < 0) ? this._menubarMenuitems.length - 1 : this._currentMenubarIndex - 1;
      let prevMenubarItem = this._menubarMenuitems[prevMenubarIndex];
      
      prevMenubarItem.focus();
      this._currentMenubarIndex = prevMenubarIndex;
      this.updateCurrentMenuitem(prevMenubarItem);
      preventDefault = true;
    }
    else if (
      (this._options.ariaOrientation == 'horizontal' && key == this._keyCode.ARROW_UP) ||
      (this._options.ariaOrientation == 'vertical' && key == this._keyCode.ARROW_LEFT)
    )
    {
      // Opens submenu and moves focus to last item in the submenu.
      if (this.hasSubmenu(menuitem)) {
        this.openSubmenu(menuitem);
        let lastMenuitem = menuitem.parentNode.querySelector('ul[role=menu]').lastElementChild.firstElementChild;
        lastMenuitem.focus();
        this.updateCurrentMenuitem(lastMenuitem);
      }
      preventDefault = true;
    }
    else if (key == this._keyCode.HOME) {
      // Moves focus to first item in the menubar.
      let firstMenubarItem = this._menubarMenuitems[0];
      firstMenubarItem.focus();
      this.updateCurrentMenuitem(firstMenubarItem);
      preventDefault = true;
    }
    else if (key == this._keyCode.END) {
      // Moves focus to last item in the menubar.
      let lastMenubarItem = this._menubarMenuitems[this._menubarMenuitems.length - 1];
      lastMenubarItem.focus();
      this.updateCurrentMenuitem(lastMenubarItem);
      preventDefault = true;
    }
    else {
      // TODO: Consider adding optional character handling.
    }
    
    if (preventDefault) {
      // The following statements will stop the keys from doing stuff.
      event.stopPropagation();
      event.preventDefault();
    }
    
  }
  
  handleKeydownSubmenu (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let preventDefault = false; // Flag to prevent the keypress from doing what it usually would do.
    let menuitem = event.target;
    let key = this.normalizeKey(event.key || event.keyCode);
    let mode = this._options.mode;
    
    if ((key == this._keyCode.SPACE || key == this._keyCode.ENTER) && mode == 'standard') {
      if (this.hasSubmenu(menuitem)) {
        // Open the submenu and place focus on the first item.
        this.openSubmenu(menuitem);
        let firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li').firstElementChild;
        
        if (firstMenuitem != null) {
          firstMenuitem.focus();
          this.updateCurrentMenuitem(firstMenuitem);
        }
        preventDefault = true;
      }
      else {
        // Activates menu item, causing the link to be activated.
        this.handleClick(menuitem);
        preventDefault = true;
      }
    }
    else if ((key == this._keyCode.SPACE || key == this._keyCode.ENTER) && mode == 'dualAction') {
      // Activates menu item, causing the link to be activated.
      this.handleClick(menuitem);
      preventDefault = true;
    }
    else if (key == this._keyCode.ESC) {
      /* 
        -Closes submenu.
        -Moves focus to parent menubar item.
       */
      let parentMenuitem = menuitem.parentNode.parentNode.parentNode.querySelector('a[role=menuitem]');
      this.closeSubmenu(parentMenuitem);
      parentMenuitem.focus();
      this.updateCurrentMenuitem(parentMenuitem);
      preventDefault = true;
    }
    else if (key == this._keyCode.ARROW_RIGHT) {
      /*
        -If focus is on an item with a submenu, opens the submenu and places focus on the first item.
        -If focus is on an item that does not have a submenu:
            -Closes submenu.
            -Moves focus to next item in the menubar.
            -Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
       */
      if (this.hasSubmenu(menuitem)) {
        let firstSubmenuItem = menuitem.parentNode.querySelector('a + ul').querySelector('li > a');
        this.openSubmenu(menuitem);
        firstSubmenuItem.focus();
        this.updateCurrentMenuitem(firstSubmenuItem);
      }
      else {
        this.closeAllSubmenus();
        
        let nextMenubarIndex = (this._currentMenubarIndex + 1 >= this._menubarMenuitems.length) ? 0 : this._currentMenubarIndex + 1;
        let nextMenubarItem = this._menubarMenuitems[nextMenubarIndex];
        
        nextMenubarItem.focus();
        this.openSubmenu(nextMenubarItem);
        this._currentMenubarIndex = nextMenubarIndex;
        this.updateCurrentMenuitem(nextMenubarItem);
      }
      preventDefault = true;
    }
    else if (key == this._keyCode.ARROW_LEFT) {
      /*
        -Closes submenu and moves focus to parent menu item.
        -If parent menu item is in the menubar, also:
            -moves focus to previous item in the menubar.
            -Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
       */
      let submenuParentMenuitem = menuitem.parentNode.parentNode.parentNode.querySelector('a[role=menuitem]');
      this.closeSubmenu(submenuParentMenuitem);
      submenuParentMenuitem.focus();
      this.updateCurrentMenuitem(submenuParentMenuitem);
      
      if (this._currentMenuitem.classList.contains('a11y-menubar-menuitem')) {
        let prevMenubarIndex = (this._currentMenubarIndex - 1 < 0) ? this._menubarMenuitems.length - 1 : this._currentMenubarIndex - 1;
        let prevMenubarItem = this._menubarMenuitems[prevMenubarIndex];
        
        prevMenubarItem.focus();
        this.openSubmenu(prevMenubarItem);
        this._currentMenubarIndex = prevMenubarIndex;
        this.updateCurrentMenuitem(prevMenubarItem);
      }
      preventDefault = true;
    }
    else if (key == this._keyCode.ARROW_DOWN) {
      /*
        -Moves focus to the next item in the submenu.
        -If focus is on the last item, moves focus to the first item.
       */
      let nextSubmenuItem = undefined;
      let nextSubmenuLiElem = menuitem.parentNode.nextElementSibling;
      if (nextSubmenuLiElem == null) {
        nextSubmenuItem = menuitem.parentNode.parentNode.firstElementChild.querySelector('a');
      }
      else {
        nextSubmenuItem = nextSubmenuLiElem.querySelector('a');
      }
      nextSubmenuItem.focus();
      this.updateCurrentMenuitem(nextSubmenuItem);
      preventDefault = true;
    }
    else if (key == this._keyCode.ARROW_UP) {
      /*
        -Moves focus to previous item in the submenu.
        -If focus is on the first item, moves focus to the last item.
      */
      let prevSubmenuItem = undefined;
      let prevSubmenuLiElem = menuitem.parentNode.previousElementSibling;
      if (prevSubmenuLiElem == null) {
        prevSubmenuItem = menuitem.parentNode.parentNode.lastElementChild.querySelector('a');
      }
      else {
        prevSubmenuItem = prevSubmenuLiElem.querySelector('a');
      }
      prevSubmenuItem.focus();
      this.updateCurrentMenuitem(prevSubmenuItem);
      preventDefault = true;
    }
    else if (key == this._keyCode.HOME) {
      // Moves focus to the first item in the submenu.
      let firstSubmenuItem = menuitem.parentNode.parentNode.firstElementChild.querySelector('a');
      firstSubmenuItem.focus();
      this.updateCurrentMenuitem(firstSubmenuItem);
      preventDefault = true;
    }
    else if (key == this._keyCode.END) {
      // Moves focus to the last item in the submenu.
      let lastSubmenuItem = menuitem.parentNode.parentNode.lastElementChild.querySelector('a');
      lastSubmenuItem.focus();
      this.updateCurrentMenuitem(lastSubmenuItem);
      preventDefault = true;
    }
    else {
      // TODO: Consider adding optional printable character handling.
    }
    
    if (preventDefault) {
      // The following statements will stop the keys from doing stuff.
      event.stopPropagation();
      event.preventDefault();
    }
  }
  
  handleMouseoverMenuitem (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let menuitem = event.target;
    
    if (this.hasSubmenu(menuitem)) {
      this.openSubmenu(menuitem);
    }
    
    this.closeSiblingSubmenus(menuitem);
  }
  
  handleMouseoutMenubar (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    let menubar = event.target;
    
    this.closeAllSubmenus();
  }
  
  handleClickMenuitem (event) {
    if (event.defaultPrevented) {
      return;
    }
    
    // Prevent click initially (to make sure click doesn't occur during touch event)
    event.preventDefault();
    
    let menuitem = event.target;
    let hasAriaExpanded = menuitem.hasAttribute('aria-expanded');
    
    if (hasAriaExpanded) {
      let ariaExpanded = menuitem.getAttribute('aria-expanded');
      
      if (ariaExpanded == 'true') {
        // Only perform click if submenu is already open.
        this.handleClick(menuitem);
      }
      else {
        // Open the submenu.
        this.openSubmenu(menuitem);
      }
    }
    else {
      // Just perform click (menuitem does not have submenu).
      this.handleClick(menuitem);
    }
    
    // TODO: Change behavior for responsive menu...?
  }
  
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_firing
  handleTouchmoveMenuitem (event) {
    event.preventDefault();
  }
  
  handleFocusinMenuitem (event) {
    let menuitem = event.target;
    this.openParentSubmenus(menuitem);
  }
  
  // Utility functions -----------------------------------------------
  
  menubarResize() {
    let viewportWidth = this._options.windowObj.innerWidth;
    
    if (viewportWidth <= this._options.breakpointMinWidth) {
      // Show menubar toggle.
      this.addMenubarToggle();
    }
    else {
      // Hide menubar toggle.
      this.removeMenubarToggle();
    }
  }
  
  addMenubarToggle() {
    if (this._options.domObj.getElementById(this._menubarToggle.getAttribute('id')) == null) {
      this._navElem.parentNode.insertBefore(this._menubarToggle, this._navElem);
      // Add closed class to menubar.
      this._navElem.classList.add('a11y-menubar-responsive');
      this._navElem.classList.add('a11y-menubar-closed');
    }
  }
  
  removeMenubarToggle() {
    if (this._options.domObj.getElementById(this._menubarToggle.getAttribute('id'))) {
      this._navElem.parentNode.removeChild(this._menubarToggle);
      // Remove open/closed classes from menubar.
      this._navElem.classList.remove('a11y-menubar-responsive');
      this._navElem.classList.remove('a11y-menubar-open');
      this._navElem.classList.remove('a11y-menubar-closed');
    }
  }
  
  showMenubar () {
    this._navElem.classList.remove('a11y-menubar-closed');
    this._navElem.classList.add('a11y-menubar-open');
  }
  
  hideMenubar () {
    this._navElem.classList.remove('a11y-menubar-open');
    this._navElem.classList.add('a11y-menubar-closed');
  }
  
  toggleInstructions () {
    let instructionsVisible = (this._menubarInstructions.classList.contains('a11y-menubar-instructions-show')) ? true : false;
    
    if (instructionsVisible) {
      this.hideInstructions();
    }
    else {
      this.showInstructions();
    }
  }
  
  showInstructions () {
    this._menubarInstructions.classList.add('a11y-menubar-instructions-show');
    this._menubarInstructions.classList.remove('a11y-menubar-instructions-hide');
  }
  
  hideInstructions () {
    this._menubarInstructions.classList.add('a11y-menubar-instructions-hide');
    this._menubarInstructions.classList.remove('a11y-menubar-instructions-show');
  }
  
  updateCurrentMenuitem (newMenuitem) {
    this._currentMenuitem.setAttribute('tabindex', '-1');
    this._currentMenuitem = newMenuitem;
    this._currentMenuitem.setAttribute('tabindex', '0');
  }
  
  hasSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('a + ul');
    let response = (menu == null) ? false : true;
    
    return response;
  }
  
  openSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('ul');
    
    // Only open submenu if it exists.
    if (menu != null) {
      menu.classList.remove('a11y-menubar-menu-closed');
      menu.classList.add('a11y-menubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'true');
    }
  }
  
  openParentSubmenus (menuitem) {
    // Open all submenus above and including the menuitem.
    let submenu = menuitem.parentNode.parentNode;
    
    if (submenu.classList.contains('a11y-menubar-menu-closed')) {
      let parentMenuitem = submenu.parentNode.querySelector('a[aria-expanded="false"]');
      
      if (parentMenuitem != null) {
        this.openSubmenu(parentMenuitem);
        this.openParentSubmenus(parentMenuitem);
      }
    }
  }
  
  closeSubmenu (menuitem) {
    let liElem = menuitem.parentNode;
    let menu = liElem.querySelector('ul');
    
    // Only close submenu if it exists.
    if (menu != null) {
      menu.classList.remove('a11y-menubar-menu-open');
      menu.classList.add('a11y-menubar-menu-closed');
      menuitem.setAttribute('aria-expanded', 'false');
    }
  }
  
  closeSiblingSubmenus (menuitem) {
    let ulElem = menuitem.parentNode.parentNode;
    let siblings = ulElem.querySelectorAll('li > a[role=menuitem]');
    let siblingsArray = [];
    
    // Remove menuitem from siblings.
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] !== menuitem) {
        siblingsArray.push(siblings[i]);
      }
    }
    
    for (let j = 0; j < siblingsArray.length; j++) {
      this.closeSubmenu(siblingsArray[j]);
    }
  }
  
  closeAllSubmenus() {
    // Closes all currently open submenus.
    let openSubmenus = this._navElem.querySelectorAll('ul.a11y-menubar-menu-open');
    
    for (let i = 0; i < openSubmenus.length; i++) {
      let aElem = openSubmenus[i].parentNode.querySelector('a');
      aElem.setAttribute('aria-expanded', 'false');
      openSubmenus[i].classList.remove('a11y-menubar-menu-open');
      openSubmenus[i].classList.add('a11y-menubar-menu-closed');
    }
  }
  
  handleClick (menuitem) {
    let href = menuitem.getAttribute('href');
    
    window.location = href;
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