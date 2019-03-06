# Changelog

## Unreleased

* Changing the name of this project from "A11y Menubar" to "A11y Navbar". This has been coming for a while. I don't believe "menubar" adequately describes what this script is intended to be.

## v0.3.2

**Mar 6, 2019**

* Modifies behavior of navbar to reset focus to the first menuitem when focus on the entire navbar is lost (i.e. reset tabindex to 0 on first menuitem when tab stop moves out of the navbar). Also closes all submenus when focus on navbar is lost.

## v0.3.1

**Mar 4, 2019**

It may seem odd to start the changelog at this version, though it was here I realized this project should probably have one. =)

* Changes `ariaOrientation` option to simply `orientation`. It turns out that ARIA role 'menubar' has an implicit aria-orientation value of 'horizontal' whereas ARIA role 'menu' has an implicit aria-orientation value of 'vertical'. It seems that there isn't actually support for describing a 'menubar' as having an aria-orientation of 'vertical' so, when `orientation` is changed to 'vertical' the role of the entire UI component is changed from 'menubar' to 'menu'. Implementing this required changes to the CSS selectors which no longer use attribute selectors for [aria-orientation=horizontal] etc. but have been changed to classes `.a11y-menubar-orientation-horizontal` and `.a11y-menubar-orientation-vertical` respectively.
