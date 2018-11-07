"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var a11yMenubar = function () {
  function a11yMenubar(id) {
    var domObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var ariaLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, a11yMenubar);

    this._keyCode = {
      'TAB': 9,
      'ENTER': 13,
      'ESC': 27,
      'SPACE': 32,
      'END': 35,
      'HOME': 36,
      'ARROW_LEFT': 37,
      'ARROW_UP': 38,
      'ARROW_RIGHT': 39,
      'ARROW_DOWN': 40
    };
    this._id = id;
    this._domObj = domObj;
    this._ariaLabel = ariaLabel;
    this._navElem = this._domObj.getElementById(this._id);
    this._menubarMenuitems = [];
    this._currentMenubarIndex = 0;
    this._currentMenuitem = null;

    this._navElem.setAttribute('aria-label', this._ariaLabel);

    this._navElem.classList.add('a11y-menubar');

    var menubar = this._navElem.querySelector('ul');

    menubar.setAttribute('role', 'menubar');
    menubar.setAttribute('aria-label', this._ariaLabel);
    var menubarMenuitems = menubar.children;

    for (var i = 0; i < menubarMenuitems.length; i++) {
      var menubarMenuitem = menubarMenuitems[i].firstChild;
      menubarMenuitem.classList.add('a11y-menubar-menuitem');
      this._menubarMenuitems[i] = menubarMenuitem;
      menubarMenuitem.addEventListener('keydown', this.handleKeydownMenubar.bind(this));
    }

    var menuitems = menubar.querySelectorAll('li > a');

    for (var j = 0; j < menuitems.length; j++) {
      menuitems[j].setAttribute('role', 'menuitem');
      menuitems[j].setAttribute('tabindex', '-1');
      var _liElem = menuitems[j].parentNode;

      var submenus = _liElem.querySelectorAll('a + ul');

      for (var k = 0; k < submenus.length; k++) {
        var submenuLiElem = submenus[k].parentNode;
        var aElem = submenuLiElem.querySelector('a');
        var aElemText = aElem.textContent;
        aElem.setAttribute('aria-haspopup', 'true');
        aElem.setAttribute('aria-expanded', 'false');
        submenus[k].setAttribute('role', 'menu');
        submenus[k].setAttribute('aria-label', aElemText);
        submenus[k].classList.add('a11y-menubar-menu-closed');
      }
    }

    var liElem = menubar.querySelectorAll('li');

    for (var l = 0; l < liElem.length; l++) {
      liElem[l].setAttribute('role', 'none');
    }

    this._menubarMenuitems[0].setAttribute('tabindex', '0');

    this._currentMenuitem = this._menubarMenuitems[0];
  }

  _createClass(a11yMenubar, [{
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "handleKeydownMenubar",
    value: function handleKeydownMenubar(event) {
      if (event.defaultPrevented) {
        return;
      }

      var menuitem = event.target;
      var key = this.normalizeKey(event.key || event.keyCode);
      console.log(key);

      switch (key) {
        case this._keyCode.SPACE:
        case this._keyCode.ENTER:
        case this._keyCode.ARROW_DOWN:
          this.closeAllSubmenus();
          this.openSubmenu(menuitem);
          var firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li > a[role=menuitem]');
          console.log(firstMenuitem);
          firstMenuitem.focus();

          this._currentMenuitem.setAttribute('tabindex', '-1');

          this._currentMenuitem = firstMenuitem;

          this._currentMenuitem.setAttribute('tabindex', '0');

          break;

        case this._keyCode.ARROW_RIGHT:
          var nextMenubarIndex = this._currentMenubarIndex + 1 >= this._menubarMenuitems.length ? 0 : this._currentMenubarIndex + 1;
          var nextMenubarItem = this._menubarMenuitems[nextMenubarIndex];
          nextMenubarItem.focus();

          this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');

          nextMenubarItem.setAttribute('tabindex', '0');
          this._currentMenubarIndex = nextMenubarIndex;
          this._currentMenuitem = nextMenubarItem;
          break;

        case this._keyCode.ARROW_LEFT:
          var prevMenubarIndex = this._currentMenubarIndex - 1 < 0 ? this._menubarMenuitems.length - 1 : this._currentMenubarIndex - 1;
          var prevMenubarItem = this._menubarMenuitems[prevMenubarIndex];
          prevMenubarItem.focus();

          this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');

          prevMenubarItem.setAttribute('tabindex', '0');
          this._currentMenubarIndex = prevMenubarIndex;
          this._currentMenuitem = prevMenubarItem;
          break;

        case this._keyCode.ARROW_UP:
          this.openSubmenu(menuitem);
          var lastMenuitem = menuitem.parentNode.querySelector('ul[role=menu]').lastElementChild.firstElementChild;
          lastMenuitem.focus();

          this._currentMenuitem.setAttribute('tabindex', '-1');

          this._currentMenuitem = lastMenuitem;

          this._currentMenuitem.setAttribute('tabindex', '0');

          break;

        case this._keyCode.HOME:
          this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');

          this._menubarMenuitems[0].setAttribute('tabindex', '0');

          this._menubarMenuitems[0].focus();

          break;

        case this._keyCode.END:
          this._menubarMenuitems[this._currentMenubarIndex].setAttribute('tabindex', '-1');

          this._menubarMenuitems[this._menubarMenuitems.length - 1].setAttribute('tabindex', '0');

          this._menubarMenuitems[this._menubarMenuitems.length - 1].focus();

          break;
      }
    }
  }, {
    key: "handleKeydownSubmenu",
    value: function handleKeydownSubmenu(event) {
      if (event.defaultPrevented) {
        return;
      }

      var menuitem = event.target;
      var key = this.normalizeKey(event.key || event.keyCode);
      console.log(key);

      switch (key) {
        case this._keyCode.SPACE:
        case this._keyCode.ENTER:
          break;

        case this._keyCode.ESC:
          break;

        case this._keyCode.ARROW_RIGHT:
          break;

        case this._keyCode.ARROW_LEFT:
          break;

        case this._keyCode.ARROW_DOWN:
          break;

        case this._keyCode.ARROW_UP:
          break;

        case this._keyCode.HOME:
          break;

        case this._keyCode.END:
          break;
      }
    }
  }, {
    key: "openSubmenu",
    value: function openSubmenu(menuitem) {
      var liElem = menuitem.parentNode;
      var menu = liElem.querySelector('a + ul');

      if (menu != null) {
        menu.classList.remove('a11y-menubar-menu-closed');
        menu.classList.add('a11y-menubar-menu-open');
        menuitem.setAttribute('aria-expanded', 'true');
      }
    }
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu(menuitem) {
      var liElem = menuitem.parentNode;
      var menu = liElem.querySelector('a + ul');

      if (menu != null) {
        menu.classList.remove('a11y-menubar-menu-open');
        menu.classList.add('a11y-menubar-menu-closed');
        menuitem.setAttribute('aria-expanded', 'false');
      }
    }
  }, {
    key: "closeAllSubmenus",
    value: function closeAllSubmenus() {
      var openSubmenus = this._navElem.querySelectorAll('ul.a11y-menubar-menu-open');

      for (var i = 0; i < openSubmenus.length; i++) {
        var aElem = openSubmenu[i].parentNode.querySelector('ul + a');
        aElem.setAttribute('aria-expanded', 'false');
        openSubmenu[i].classList.remove('a11y-menubar-menu-open');
        openSubmenu[i].classList.add('a11y-menubar-menu-closed');
      }
    }
  }, {
    key: "normalizeKey",
    value: function normalizeKey(key) {
      var normalizedKey = null;

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
  }]);

  return a11yMenubar;
}();

;