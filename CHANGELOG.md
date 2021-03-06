# Changelog

## Unreleased

* Implement optional character key handling "Any key that corresponds to a printable character (Optional): Move focus to the next menu item in the current menu whose label begins with that printable character." from [ARIA Design Pattern for Menu/Menubar](https://www.w3.org/TR/wai-aria-practices-1.1/#menu).
* Implement destroy() function in a11yNavbar class.
* Implement mouse events for li[role="none"] elements that are identical to the a[role="menuitem"] mouse events.

## v0.5.18

**Apr 29, 2021**

* Adds the *menubarInstructionsText* option.

## v0.5.17

**Apr 27, 2021**

* Updates dependencies.
* Allows for use of `<span>` elements as well as `<a>` elements for `menuitems` in HTML source. 

## v0.5.16

**May 23, 2019**

* Reorders screen-reader instructions for clarity in `dualAction` mode.

## v0.5.15

**May 2, 2019**

* Bugfix: Fixes touch issues in IE11.
* Adds pointer events to close all menus when clicking outside navbar.
* Adds appropriate DOCTYPE declarations to all demo HTML files.
* Changes Babel configuration to only support IE11 and above.

## v0.5.14

**Apr 29, 2019**

* Adds Pointer Event support. Primarily this was added because IE11/Edge would not open the menu on touch devices since IE11 does not support Touch Events, and Edge requires enabling Touch Event support manually. This really is an attempt to cover an edge case of a user using IE11/Edge on a touch-capable device.

## v0.5.13

**Apr 24, 2019**

* Bugfix: Fixes handling of 'End' key.

## v0.5.12

**Apr 24, 2019**

* Bugfix: Fixes IE11/Edge keyboard input. (It happens that IE11/Edge report key values 'Right', 'Left', 'Up', 'Down' for arrow keys and IE11 reports 'Spacebar' for spaces.)
* Bugfix: Fixes issue where items in menubar would attempt to open non-existent submenus in 'standard' mode. Realistically, this would be a poorly constructed menu given the standard specs don't support menubar items without submenus, but it seemed worth correcting the error in the console.)

## v0.5.11

**Apr 24, 2019**

* Updates package dependencies.
* Improves submenu toggle button text.

## v0.5.10

**Apr 23, 2019**

* Adds package-lock.json to maintain reproducible dependency tree. Updates dependencies.

## v0.5.9

**Apr 23, 2019**

* Bugfix: Fixes issue in which sibling submenus were not closing when opening another submenu on the same level.

## v0.5.8

**Apr 10, 2019**

* Bugfix: Fixes issue on touch devices in which menus would not close when clicking elsewhere in the document.

## v0.5.7

**Apr 10, 2019**

* Added expand/collapse toggles to menuitems with submenus in the responsive (mobile) menu. This feature is activated when the menu switches into the responsive "mobile-friendly" menu when the `responsiveSubmenuToggles` option is set to a boolean value of `true`. This feature is disabled by default.

## v0.5.6

**Mar 29, 2019**

* Bugfix: Fixes issue where click on menuitem would be triggered when touch-dragging the menu.

## v0.5.5

**Mar 28, 2019**

* Fixes touch event handling for mobile devices. (Properly separates Touch and Click event handling.)
* Adds viewport metatag to demo pages.

## v0.5.4

**Mar 27, 2019**

* Removes navbar from tab order when hidden by disclosure in responsive "mobile friendly" menu.

## v0.5.3

**Mar 20, 2019**

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
