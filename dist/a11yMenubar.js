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
      }
    }

    var liElem = menubar.querySelectorAll('li');

    for (var l = 0; l < liElem.length; l++) {
      liElem[l].setAttribute('role', 'none');
    }

    this._menubarMenuitems[0].setAttribute('tabindex', '0');
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

      console.log(event.key);
      console.log(event.which);
      console.log(event.keyCode);
      var menuitem = event.target;
      var key = this.normalizeKey(event.key || event.keyCode);

      switch (key) {
        case this._keyCode.SPACE:
        case this._keyCode.ENTER:
          this.openSubmenu(menuitem);
          var firstMenuitem = menuitem.parentNode.querySelector('ul[role=menu] > li > a[role=menuitem]');
          firstMenuitem.focus();

          this._currentMenuitem.setAttribute('tabindex', '-1');

          this._currentMenuitem = firstMenuitem;

          this._currentMenuitem.setAttribute('tabindex', '0');

          break;

        case this._keyCode.ARROW_RIGHT:
          var menubarItems = this._navElem;
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
    key: "handleKeydownSubmenu",
    value: function handleKeydownSubmenu(event) {
      if (event.defaultPrevented) {
        return;
      }
    }
  }, {
    key: "openSubmenu",
    value: function openSubmenu(menuitem) {
      var liElem = menuitem.parentNode;
      var menu = liElem.querySelector('a + ul');

      if (menu != null) {
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
        menuitem.setAttribute('aria-expanded', 'false');
      }
    }
  }, {
    key: "normalizeKey",
    value: function normalizeKey(key) {
      var normalizedKey = null;

      if (key == 'Tab' || key == 9) {
        normalizedKey = this._keyCode.TAB;
      } else if (key == 'Enter' || key == 13) {
        normalizedKey = this._keyCode.ENTER;
      } else if (key == 'Escape' || key == 'Esc' || key == 13) {
        normalizedKey = this._keyCode.ESC;
      } else if (key == ' ' || key == 32) {
        normalizedKey = this._keyCode.SPACE;
      } else if (key == 'End' || key == 35) {
        normalizedKey = this._keyCode.END;
      } else if (key == 'Home' || key == 36) {
        normalizedKey = this._keyCode.HOME;
      } else if (key == 'ArrowLeft' || key == 37) {
        normalizedKey == this._keyCode.ARROW_LEFT;
      } else if (key == 'ArrowUp' || key == 38) {
        normalizedKey == this._keyCode.ARROW_UP;
      } else if (key == 'ArrowRight' || key == 39) {
        normalizedKey == this._keyCode.ARROW_RIGHT;
      } else if (key == 'ArrowDown' || key == 40) {
        normalizedKey = this._keyCode.ARROW_DOWN;
      }

      return normalizedKey;
    }
  }]);

  return a11yMenubar;
}();

;