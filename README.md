# A11y Menubar

A11y Menubar is an attempt at creating a WAI-ARIA 2.0 AA compatible navigation bar menu script for use in websites. It may be better named "A11y Navbar" or something to that effect, so, maybe the name will change eventually since it's really not supposed to be anything fancier than just a basic navbar (as opposed to some sort of elaborate menu system).

## Development

After acquiring the source code run:

```
npm install
```

...in the root directory.

If you change the SASS run:

```
gulp sass
```

...which will compile CSS into the css directory.

If you change the JavaScript in src run:

```
npm run build
```

...which will transpile and minify ES6 into the dist directory via [Babel](https://babeljs.io/) included as a dev dependency in NPM. (See the 'build' script in package.json if you're interested. It's a very basic setup.)

## Usage

Take a look at demo/demo.html to understand what is necessary to use the A11y Menubar component in a browser (which at the moment is primarily if not the only way to use this script).

Essentially, include the following in the HEAD element of your HTML:

```
<link rel="stylesheet" href="../css/a11y-menubar.styles.css">
<script src="../node_modules/hoverintent/dist/hoverintent.min.js"></script>
<script src="../dist/a11yMenubar.js"></script>
<script src="demo.js"></script>
```

It can be seen above that the a11yMenubar.js script uses the non-jQuery version of [hoverintent](https://www.npmjs.com/package/hoverintent). If this is not present in the environment before a11yMenubar.js it will default to using basic mouse events.

If you look at demo.js you can see the basic usage of the menubar. Though, essentially all you really need is something like the following:

```
var test = new a11yMenubar('main-nav');
```

...where 'main-nav' is the id attribute of whichever NAV element is to be converted by the script into a navbar. The NAV element should contain a simple unordered list of anchor elements to function properly. See the markup in demo/demo.html as an example.

Since the initial motivation for creating A11y Menubar was for use in a [Drupal 8](https://drupal.org) based website, you'll also find demo/demo-drupal-markup.html which contains some default markup from the Drupal 8 menu system.

### Options

In addition to providing the id attribute of a NAV element, you can also specify as a second parameter a JavaScript object containing options.

An example can be seen in demo/demo.js:

```
var options = {
    'ariaLabel' : 'Main Navigation'
  }
var test = new a11yMenubar('main-nav', options);
```

#### Default Options

```
{
  'windowObj' : window,
  'domObj' : document,
  'ariaLabel' : '',
  'hoverintent' : hoverintent,
  'ariaOrientation' : 'horizontal',
  'breakpointMinWidth' : 500,
  'menubarToggleText' : 'Menu',
  'mode' : 'standard'
}
```

* *windowObj* is the window object being used. If this isn't just *window* don't worry about it.
* *domObj* is the DOM object being used to both find and manipulate the appropriate HTML. If this isn't just *document* than you really don't have to worry about it.
* *ariaLabel* is the ARIA label for the navbar. This should be whatever brief, meaningful identifier that will describe the navigation bar.
* *hoverintent* is the implementation of hoverintent you're using. If for some unknown reason (maybe you're crazy) it isn't the included version of hoverintent you can change it here.
* *ariaOrientation* is the direction the menubar flows. Valid values are either "horizontal" (which is the default) or "vertical".
* *breakpointMinWidth* is the width in pixels at which the menu transforms into a "mobile friendly" compact menu. The default is 500px.
* *menubarToggleText* is the text for the menu button when the "mobile friendly" compact menu is active. It defaults to "Menu".
* *mode* can be set to either "standard" (for behavior strictly following the menubar design pattern) or "dualAction" (in which menuitems with submenus can be activated with Enter/Space, or expanded with the appropriate arrow key).

 