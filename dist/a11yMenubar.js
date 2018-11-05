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

    var menubar = this._navElem.querySelectorAll('nav > ul');

    this._navElem.setAttribute('aria-label', this._ariaLabel);

    this._navElem.classList.add('a11y-menubar');

    for (var i = 0; i < menubar.length; i++) {
      menubar[i].setAttribute('role', 'menubar');
      menubar[i].setAttribute('aria-label', this._ariaLabel);
      var menuitem = menubar[i].querySelectorAll('li > a');

      for (var j = 0; j < menuitem.length; j++) {
        var tabIndex = j == 0 ? 0 : -1;
        menuitem[j].setAttribute('role', 'menuitem');
        menuitem[j].setAttribute('tabindex', tabIndex);
        menuitem[j].addEventListener('keydown', this.handleKeydownMenubar.bind(this));
        var _liElem = menuitem[j].parentNode;

        var menu = _liElem.querySelectorAll('a + ul');

        for (var k = 0; k < menu.length; k++) {
          var menuLiElem = menu[k].parentNode;
          var aElem = menuLiElem.querySelector('a');
          var aElemText = aElem.textContent;
          aElem.setAttribute('aria-haspopup', 'true');
          aElem.setAttribute('aria-expanded', 'false');
          menu[k].setAttribute('role', 'menu');
          menu[k].setAttribute('aria-label', aElemText);
        }
      }

      var liElem = menubar[i].querySelectorAll('li');

      for (var l = 0; l < liElem.length; l++) {
        liElem[l].setAttribute('role', 'none');
      }
    }
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
          console.info(menuitem);
          this.openSubmenu(menuitem);
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
      menu.classList.add('a11yMenubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'true');
      console.log(menu);
    }
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu(menuitem) {
      var liElem = menuitem.parentNode;
      var menu = liElem.querySelector('a + ul');
      menu.classList.remove('a11yMenubar-menu-open');
      menuitem.setAttribute('aria-expanded', 'false');
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