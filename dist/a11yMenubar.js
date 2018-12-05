"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var a11yMenubar=function(){function a(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document,d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",e=3<arguments.length&&void 0!==arguments[3]?arguments[3]:e;_classCallCheck(this,a),this._keyCode={TAB:9,ENTER:13,ESC:27,SPACE:32,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40},this._id=b,this._domObj=c,this._hoverintent=e,this._ariaLabel=d,this._navElem=this._domObj.getElementById(this._id),this._menubarMenuitems=[],this._currentMenubarIndex=0,this._currentMenuitem=null,this._navElem.setAttribute("aria-label",this._ariaLabel),this._navElem.classList.add("a11y-menubar");var f=this._navElem.querySelector("ul");if(f.setAttribute("role","menubar"),f.setAttribute("aria-label",this._ariaLabel),this._hoverintent){this._hoverintent(f,function(){},this.handleMouseoutMenubar.bind(this)).options({timeout:900,interval:50})}else f.addEventListener("mouseout",this.handleMouseoutMenubar.bind(this));for(var g,h=f.children,m=0;m<h.length;m++)g=h[m].firstElementChild,g.classList.add("a11y-menubar-menuitem"),this._menubarMenuitems[m]=g,g.addEventListener("keydown",this.handleKeydownMenubar.bind(this));for(var n=this._navElem.querySelectorAll("a + ul > li > a"),o=0;o<n.length;o++)n[o].addEventListener("keydown",this.handleKeydownSubmenu.bind(this));for(var p=f.querySelectorAll("li > a"),q=0;q<p.length;q++){p[q].setAttribute("role","menuitem"),p[q].setAttribute("tabindex","-1");for(var r=p[q].parentNode,s=r.querySelectorAll("a + ul"),t=0;t<s.length;t++){var u=s[t].parentNode,v=u.querySelector("a"),w=v.textContent;v.setAttribute("aria-haspopup","true"),v.setAttribute("aria-expanded","false"),s[t].setAttribute("role","menu"),s[t].setAttribute("aria-label",w),s[t].classList.add("a11y-menubar-menu-closed")}if(this._hoverintent){this._hoverintent(p[q],this.handleMouseoverMenuitem.bind(this),function(){}).options({timeout:100,interval:0})}else p[q].addEventListener("mouseover",this.handleMouseoverMenuitem.bind(this))}for(var x=f.querySelectorAll("li"),y=0;y<x.length;y++)x[y].setAttribute("role","none");this._menubarMenuitems[0].setAttribute("tabindex","0"),this._currentMenuitem=this._menubarMenuitems[0]}return _createClass(a,[{key:"destroy",value:function a(){}},{key:"handleKeydownMenubar",value:function i(a){if(!a.defaultPrevented){var b=!1,c=a.target,d=this.normalizeKey(a.key||a.keyCode);if(d==this._keyCode.SPACE||d==this._keyCode.ENTER||d==this._keyCode.ARROW_DOWN){this.closeAllSubmenus(),this.openSubmenu(c);var j=c.parentNode.querySelector("ul[role=menu] > li > a[role=menuitem]");null!=j&&(j.focus(),this.updateCurrentMenuitem(j)),b=!0}else if(d==this._keyCode.ARROW_RIGHT){var e=this._currentMenubarIndex+1>=this._menubarMenuitems.length?0:this._currentMenubarIndex+1,f=this._menubarMenuitems[e];f.focus(),this._currentMenubarIndex=e,this.updateCurrentMenuitem(f),b=!0}else if(d==this._keyCode.ARROW_LEFT){var g=0>this._currentMenubarIndex-1?this._menubarMenuitems.length-1:this._currentMenubarIndex-1,h=this._menubarMenuitems[g];h.focus(),this._currentMenubarIndex=g,this.updateCurrentMenuitem(h),b=!0}else if(d==this._keyCode.ARROW_UP){this.openSubmenu(c);var k=c.parentNode.querySelector("ul[role=menu]").lastElementChild.firstElementChild;k.focus(),this.updateCurrentMenuitem(k),b=!0}else if(d==this._keyCode.HOME){var l=this._menubarMenuitems[0];l.focus(),this.updateCurrentMenuitem(l),b=!0}else if(d==this._keyCode.END){var m=this._menubarMenuitems[this._menubarMenuitems.length-1];m.focus(),this.updateCurrentMenuitem(m),b=!0}else;b&&(a.stopPropagation(),a.preventDefault())}}},{key:"handleKeydownSubmenu",value:function m(a){if(!a.defaultPrevented){var b=!1,c=a.target,d=this.normalizeKey(a.key||a.keyCode);if(d==this._keyCode.SPACE||d==this._keyCode.ENTER)c.click(),b=!0;else if(d==this._keyCode.ESC){var n=c.parentNode.parentNode.parentNode.querySelector("a[role=menuitem]");this.closeSubmenu(n),n.focus(),this.updateCurrentMenuitem(n),b=!0}else if(d==this._keyCode.ARROW_RIGHT){if(this.hasSubmenu(c)){var o=c.parentNode.querySelector("a + ul").querySelector("li > a");this.openSubmenu(c),o.focus(),this.updateCurrentMenuitem(o)}else{this.closeAllSubmenus();var e=this._currentMenubarIndex+1>=this._menubarMenuitems.length?0:this._currentMenubarIndex+1,f=this._menubarMenuitems[e];f.focus(),this.openSubmenu(f),this._currentMenubarIndex=e,this.updateCurrentMenuitem(f)}b=!0}else if(d==this._keyCode.ARROW_LEFT){var p=c.parentNode.parentNode.parentNode.querySelector("a[role=menuitem]");if(this.closeSubmenu(p),p.focus(),this.updateCurrentMenuitem(p),this._currentMenuitem.classList.contains("a11y-menubar-menuitem")){var g=0>this._currentMenubarIndex-1?this._menubarMenuitems.length-1:this._currentMenubarIndex-1,h=this._menubarMenuitems[g];h.focus(),this.openSubmenu(h),this._currentMenubarIndex=g,this.updateCurrentMenuitem(h)}b=!0}else if(d==this._keyCode.ARROW_DOWN){var i=void 0,j=c.parentNode.nextElementSibling;i=null==j?c.parentNode.parentNode.firstElementChild.querySelector("a"):j.querySelector("a"),i.focus(),this.updateCurrentMenuitem(i),b=!0}else if(d==this._keyCode.ARROW_UP){var k=void 0,l=c.parentNode.previousElementSibling;k=null==l?c.parentNode.parentNode.lastElementChild.querySelector("a"):l.querySelector("a"),k.focus(),this.updateCurrentMenuitem(k),b=!0}else if(d==this._keyCode.HOME){var q=c.parentNode.parentNode.firstElementChild.querySelector("a");q.focus(),this.updateCurrentMenuitem(q),b=!0}else if(d==this._keyCode.END){var r=c.parentNode.parentNode.lastElementChild.querySelector("a");r.focus(),this.updateCurrentMenuitem(r),b=!0}else;b&&(a.stopPropagation(),a.preventDefault())}}},{key:"handleMouseoverMenuitem",value:function c(a){if(!a.defaultPrevented){var b=a.target;this.hasSubmenu(b)&&this.openSubmenu(b),this.closeSiblingSubmenus(b)}}},{key:"handleMouseoutMenubar",value:function b(a){if(!a.defaultPrevented){a.target;this.closeAllSubmenus()}}},{key:"handleClickMenuitem",value:function d(a){if(!a.defaultPrevented){a.preventDefault();var b=a.target,c=b.hasAttribute("aria-expanded");if(c){var e=b.getAttribute("aria-expanded");"true"==e&&b.click()}else b.click()}}},{key:"updateCurrentMenuitem",value:function b(a){this._currentMenuitem.setAttribute("tabindex","-1"),this._currentMenuitem=a,this._currentMenuitem.setAttribute("tabindex","0")}},{key:"hasSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("a + ul");return null!=c}},{key:"openSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("ul");null!=c&&(c.classList.remove("a11y-menubar-menu-closed"),c.classList.add("a11y-menubar-menu-open"),a.setAttribute("aria-expanded","true"))}},{key:"closeSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("ul");null!=c&&(c.classList.remove("a11y-menubar-menu-open"),c.classList.add("a11y-menubar-menu-closed"),a.setAttribute("aria-expanded","false"))}},{key:"closeSiblingSubmenus",value:function f(a){for(var b=a.parentNode.parentNode,c=b.querySelectorAll("li > a[role=menuitem]"),d=[],e=0;e<c.length;e++)c[e]!==a&&d.push(c[e]);for(var g=0;g<d.length;g++)this.closeSubmenu(d[g])}},{key:"closeAllSubmenus",value:function d(){for(var a,b=this._navElem.querySelectorAll("ul.a11y-menubar-menu-open"),c=0;c<b.length;c++)a=b[c].parentNode.querySelector("a"),a.setAttribute("aria-expanded","false"),b[c].classList.remove("a11y-menubar-menu-open"),b[c].classList.add("a11y-menubar-menu-closed")}},{key:"normalizeKey",value:function c(a){var b=null;switch(a){case"Tab":case 9:b=this._keyCode.TAB;break;case"Enter":case 13:b=this._keyCode.ENTER;break;case"Escape":case"Esc":case 13:b=this._keyCode.ESC;break;case" ":case 32:b=this._keyCode.SPACE;break;case"End":case 35:b=this._keyCode.END;case"Home":case 36:b=this._keyCode.HOME;break;case"ArrowLeft":case 37:b=this._keyCode.ARROW_LEFT;break;case"ArrowUp":case 38:b=this._keyCode.ARROW_UP;break;case"ArrowRight":case 39:b=this._keyCode.ARROW_RIGHT;break;case"ArrowDown":case 40:b=this._keyCode.ARROW_DOWN;}return b}}]),a}();