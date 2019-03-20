# Changelog

## Unreleased

* Implement optional character key handling "Any key that corresponds to a printable character (Optional): Move focus to the next menu item in the current menu whose label begins with that printable character." from [ARIA Design Pattern for Menu/Menubar](https://www.w3.org/TR/wai-aria-practices-1.1/#menu).
* Implement destroy() function in a11yNavbar class.
* Implement mouse events for li[role="none"] elements that are identical to the a[role="menuitem"] mouse events.
* Remove superflous height property from menubar menuitems in default styles.

## v0.5.2

**Mar 14, 2019**

* Fixes minor issue in default styles in which z-index for submenus was not set (making submenus potentially appear under other elements in page layouts).

## v0.5.1

**Mar 12, 2019**

* Fixes minor issue in adding reset css via SASS. Now only resets elements specifically used within the navbar rather than including global resets in the compiled stylesheet. (The default body element in the demos will now have default margins, etc.)

## v0.5.0

**Mar 8, 2019**

* Changed the compiled script name in dist from `a11yNavbar.js` to `a11yNavbar.min.js`.

## v0.4.0

**Mar 8, 2019**

* Changed the name of this project from "A11y Menubar" to "A11y Navbar". This has been coming for a while. I don't believe "menubar" adequately describes what this script is intended to be.
    - Any instances of `a11y-menubar` and `a11yMenubar` have been changed to `a11y-navbar` and `a11yNavbar` respectively. So, you'll have to adjust any sass/css selectors and scripts accordingly.
* Changed option `menubarToggleText` to `responsiveToggleText`

## v0.3.2

**Mar 6, 2019**

* Modifies behavior of navbar to reset focus to the first menuitem when focus on the entire navbar is lost (i.e. reset tabindex to 0 on first menuitem when tab stop moves out of the navbar). Also closes all submenus when focus on navbar is lost.

## v0.3.1

**Mar 4, 2019**

It may seem odd to start the changelog at this version, though it was here I realized this project should probably have one. =)

* Changes `ariaOrientation` option to simply `orientation`. It turns out that ARIA role 'menubar' has an implicit aria-orientation value of 'horizontal' whereas ARIA role 'menu' has an implicit aria-orientation value of 'vertical'. It seems that there isn't actually support for describing a 'menubar' as having an aria-orientation of 'vertical' so, when `orientation` is changed to 'vertical' the role of the entire UI component is changed from 'menubar' to 'menu'. Implementing this required changes to the CSS selectors which no longer use attribute selectors for [aria-orientation=horizontal] etc. but have been changed to classes `.a11y-menubar-orientation-horizontal` and `.a11y-menubar-orientation-vertical` respectively.
