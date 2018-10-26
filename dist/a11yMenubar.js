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
      'RETURN': 13,
      'ESC': 27,
      'SPACE': 32,
      'PAGEUP': 33,
      'PAGEDOWN': 34,
      'END': 35,
      'HOME': 36,
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40
    };
    var navElem = domObj.getElementById(id);
    var menubar = navElem.querySelectorAll('nav > ul');
    navElem.setAttribute('aria-label', ariaLabel);

    for (var i = 0; i < menubar.length; i++) {
      menubar[i].setAttribute('role', 'menubar');
      menubar[i].setAttribute('aria-label', ariaLabel);
      var menuitem = menubar[i].querySelectorAll('li > a');

      for (var j = 0; j < menuitem.length; j++) {
        menuitem[j].setAttribute('role', 'menuitem');
        menuitem[j].setAttribute('tabindex', '-1');
        var _liElem = menuitem[j].parentNode;

        var menu = _liElem.querySelectorAll('a + ul');

        for (var k = 0; k < menu.length; k++) {
          menu[k].setAttribute('role', 'menu');
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
    key: "addAttributes",
    value: function addAttributes() {}
  }, {
    key: "openSubmenu",
    value: function openSubmenu() {}
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu() {}
  }]);

  return a11yMenubar;
}();

;