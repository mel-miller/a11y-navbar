"use strict";function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var a11yMenubar=function(){function a(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,a),this._keyCode={TAB:9,ENTER:13,ESC:27,SPACE:32,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40},this._defaultOptions={windowObj:window,domObj:document,ariaLabel:"",hoverintent:hoverintent,ariaOrientation:"horizontal",breakpointMinWidth:500,menubarToggleText:"Menu",mode:"standard"},this._options=_extends(this._defaultOptions,c),this._id=b,this._navElem=this._options.domObj.getElementById(this._id),this._menubarMenuitems=[],this._currentMenubarIndex=0,this._currentMenuitem=null,"dualAction"==this._options.mode&&(this._menubarInstructions=this._options.domObj.createElement("div"),this._menubarInstructions.innerHTML="<p>Use <strong>Enter</strong> or <strong>Space</strong> to activate links.</p><p>Use appropriate arrow key to open or close submenus.</p>",this._menubarInstructions.setAttribute("id",this._id+"-menubar-instructions"),this._menubarInstructions.classList.add("a11y-menubar-instructions"),this._menubarInstructions.classList.add("a11y-menubar-instructions-hide"),this._navElem.insertBefore(this._menubarInstructions,this._navElem.firstElementChild),this._options.windowObj.addEventListener("focusin",this.handleFocusinWindowObj.bind(this)),this._options.windowObj.addEventListener("blur",this.handleBlurWindowObj.bind(this))),this._menubarToggle=this._options.domObj.createElement("button"),this._menubarToggle.textContent=this._options.menubarToggleText,this._menubarToggle.setAttribute("id",this._id+"-toggle"),this._menubarToggle.setAttribute("aria-expanded","false"),this._menubarToggle.setAttribute("aria-controls",this._id),this._menubarToggle.classList.add("a11y-menubar-toggle");var d=this._options.domObj.createElement("span");d.setAttribute("aria-hidden","true"),this._menubarToggle.appendChild(d),this._menubarToggle.addEventListener("click",this.handleClickMenubarToggle.bind(this)),this._options.windowObj.addEventListener("resize",this.handleMenubarResize.bind(this)),this._navElem.setAttribute("aria-label",this._options.ariaLabel),this._navElem.classList.add("a11y-menubar"),this._navElem.classList.add("a11y-menubar-orientation-"+this._options.ariaOrientation);var e=this._navElem.querySelector("ul");if(e.setAttribute("role","menubar"),e.setAttribute("aria-label",this._options.ariaLabel),e.setAttribute("aria-orientation",this._options.ariaOrientation),"dualAction"==this._options.mode&&(e.setAttribute("aria-describedby",this._id+"-menubar-instructions"),e.addEventListener("focusin",this.handleFocusinMenubar.bind(this))),this._options.hoverintent){this._options.hoverintent(e,function(){},this.handleMouseoutMenubar.bind(this)).options({timeout:900,interval:50})}else e.addEventListener("mouseout",this.handleMouseoutMenubar.bind(this));for(var f,g=e.children,h=0;h<g.length;h++)f=g[h].firstElementChild,f.classList.add("a11y-menubar-menuitem"),this._menubarMenuitems[h]=f,f.addEventListener("keydown",this.handleKeydownMenubar.bind(this));for(var m=this._navElem.querySelectorAll("a + ul > li > a"),n=0;n<m.length;n++)m[n].addEventListener("keydown",this.handleKeydownSubmenu.bind(this));for(var o=e.querySelectorAll("li > a"),p=0;p<o.length;p++){o[p].setAttribute("role","menuitem"),o[p].setAttribute("tabindex","-1");for(var q=o[p].parentNode,r=q.querySelectorAll("a + ul"),s=0;s<r.length;s++){var t=r[s].parentNode,u=t.querySelector("a"),v=u.textContent;u.setAttribute("aria-haspopup","true"),u.setAttribute("aria-expanded","false"),r[s].setAttribute("role","menu"),r[s].setAttribute("aria-label",v),r[s].classList.add("a11y-menubar-menu-closed")}if(this._options.hoverintent){this._options.hoverintent(o[p],this.handleMouseoverMenuitem.bind(this),function(){}).options({timeout:500,interval:100})}else o[p].addEventListener("mouseover",this.handleMouseoverMenuitem.bind(this));o[p].addEventListener("click",this.handleClickMenuitem.bind(this)),o[p].addEventListener("touchmove",this.handleTouchmoveMenuitem.bind(this)),"dualAction"==this._options.mode&&o[p].addEventListener("mousedown",this.handleMousedownMenuitem.bind(this))}for(var w=e.querySelectorAll("li"),x=0;x<w.length;x++)w[x].setAttribute("role","none");this._menubarMenuitems[0].setAttribute("tabindex","0"),this._currentMenuitem=this._menubarMenuitems[0],this.menubarResize()}return _createClass(a,[{key:"destroy",value:function a(){}},{key:"handleMenubarResize",value:function b(a){a.defaultPrevented||this.menubarResize()}},{key:"handleClickMenubarToggle",value:function b(a){a.defaultPrevented||(this._navElem.classList.contains("a11y-menubar-closed")?(this._navElem.classList.remove("a11y-menubar-closed"),this._navElem.classList.add("a11y-menubar-open")):this._navElem.classList.contains("a11y-menubar-open")&&(this._navElem.classList.remove("a11y-menubar-open"),this._navElem.classList.add("a11y-menubar-closed")))}},{key:"handleKeydownMenubar",value:function j(a){if(!a.defaultPrevented){var b=!1,c=a.target,d=this.normalizeKey(a.key||a.keyCode),e=this._options.mode;if(d==this._keyCode.SPACE&&"standard"==e||d==this._keyCode.ENTER&&"standard"==e||"horizontal"==this._options.ariaOrientation&&d==this._keyCode.ARROW_DOWN||"vertical"==this._options.ariaOrientation&&d==this._keyCode.ARROW_RIGHT){this.closeAllSubmenus(),this.openSubmenu(c);var k=c.parentNode.querySelector("ul[role=menu] > li > a[role=menuitem]");null!=k&&(k.focus(),this.updateCurrentMenuitem(k)),b=!0}else if(d==this._keyCode.SPACE&&"dualAction"==e||d==this._keyCode.ENTER&&"dualAction"==e)this.handleClick(c),b=!0;else if("horizontal"==this._options.ariaOrientation&&d==this._keyCode.ARROW_RIGHT||"vertical"==this._options.ariaOrientation&&d==this._keyCode.ARROW_DOWN){var f=this._currentMenubarIndex+1>=this._menubarMenuitems.length?0:this._currentMenubarIndex+1,g=this._menubarMenuitems[f];g.focus(),this._currentMenubarIndex=f,this.updateCurrentMenuitem(g),b=!0}else if("horizontal"==this._options.ariaOrientation&&d==this._keyCode.ARROW_LEFT||"vertical"==this._options.ariaOrientation&&d==this._keyCode.ARROW_UP){var h=0>this._currentMenubarIndex-1?this._menubarMenuitems.length-1:this._currentMenubarIndex-1,i=this._menubarMenuitems[h];i.focus(),this._currentMenubarIndex=h,this.updateCurrentMenuitem(i),b=!0}else if("horizontal"==this._options.ariaOrientation&&d==this._keyCode.ARROW_UP||"vertical"==this._options.ariaOrientation&&d==this._keyCode.ARROW_LEFT){if(this.hasSubmenu(c)){this.openSubmenu(c);var l=c.parentNode.querySelector("ul[role=menu]").lastElementChild.firstElementChild;l.focus(),this.updateCurrentMenuitem(l)}b=!0}else if(d==this._keyCode.HOME){var m=this._menubarMenuitems[0];m.focus(),this.updateCurrentMenuitem(m),b=!0}else if(d==this._keyCode.END){var n=this._menubarMenuitems[this._menubarMenuitems.length-1];n.focus(),this.updateCurrentMenuitem(n),b=!0}else;b&&(a.stopPropagation(),a.preventDefault())}}},{key:"handleKeydownSubmenu",value:function n(a){if(!a.defaultPrevented){var b=!1,c=a.target,d=this.normalizeKey(a.key||a.keyCode),e=this._options.mode;if((d==this._keyCode.SPACE||d==this._keyCode.ENTER)&&"standard"==e){if(this.hasSubmenu(c)){this.openSubmenu(c);var o=c.parentNode.querySelector("ul[role=menu] > li").firstElementChild;null!=o&&(o.focus(),this.updateCurrentMenuitem(o)),b=!0}else this.handleClick(c),b=!0;}else if((d==this._keyCode.SPACE||d==this._keyCode.ENTER)&&"dualAction"==e)this.handleClick(c),b=!0;else if(d==this._keyCode.ESC){var p=c.parentNode.parentNode.parentNode.querySelector("a[role=menuitem]");this.closeSubmenu(p),p.focus(),this.updateCurrentMenuitem(p),b=!0}else if(d==this._keyCode.ARROW_RIGHT){if(this.hasSubmenu(c)){var q=c.parentNode.querySelector("a + ul").querySelector("li > a");this.openSubmenu(c),q.focus(),this.updateCurrentMenuitem(q)}else{this.closeAllSubmenus();var f=this._currentMenubarIndex+1>=this._menubarMenuitems.length?0:this._currentMenubarIndex+1,g=this._menubarMenuitems[f];g.focus(),this.openSubmenu(g),this._currentMenubarIndex=f,this.updateCurrentMenuitem(g)}b=!0}else if(d==this._keyCode.ARROW_LEFT){var r=c.parentNode.parentNode.parentNode.querySelector("a[role=menuitem]");if(this.closeSubmenu(r),r.focus(),this.updateCurrentMenuitem(r),this._currentMenuitem.classList.contains("a11y-menubar-menuitem")){var h=0>this._currentMenubarIndex-1?this._menubarMenuitems.length-1:this._currentMenubarIndex-1,i=this._menubarMenuitems[h];i.focus(),this.openSubmenu(i),this._currentMenubarIndex=h,this.updateCurrentMenuitem(i)}b=!0}else if(d==this._keyCode.ARROW_DOWN){var j=void 0,k=c.parentNode.nextElementSibling;j=null==k?c.parentNode.parentNode.firstElementChild.querySelector("a"):k.querySelector("a"),j.focus(),this.updateCurrentMenuitem(j),b=!0}else if(d==this._keyCode.ARROW_UP){var l=void 0,m=c.parentNode.previousElementSibling;l=null==m?c.parentNode.parentNode.lastElementChild.querySelector("a"):m.querySelector("a"),l.focus(),this.updateCurrentMenuitem(l),b=!0}else if(d==this._keyCode.HOME){var s=c.parentNode.parentNode.firstElementChild.querySelector("a");s.focus(),this.updateCurrentMenuitem(s),b=!0}else if(d==this._keyCode.END){var t=c.parentNode.parentNode.lastElementChild.querySelector("a");t.focus(),this.updateCurrentMenuitem(t),b=!0}else;b&&(a.stopPropagation(),a.preventDefault())}}},{key:"handleMouseoverMenuitem",value:function c(a){if(!a.defaultPrevented){var b=a.target;this.hasSubmenu(b)&&this.openSubmenu(b),this.closeSiblingSubmenus(b)}}},{key:"handleMouseoutMenubar",value:function b(a){if(!a.defaultPrevented){a.target;this.closeAllSubmenus()}}},{key:"handleClickMenuitem",value:function d(a){if(!a.defaultPrevented){a.preventDefault();var b=a.target,c=b.hasAttribute("aria-expanded");if(c){var e=b.getAttribute("aria-expanded");"true"==e?this.handleClick(b):this.openSubmenu(b)}else this.handleClick(b)}}},{key:"handleTouchmoveMenuitem",value:function b(a){a.preventDefault()}},{key:"handleFocusinMenubar",value:function b(){var a=!!this._menubarInstructions.classList.contains("a11y-menubar-instructions-show");a||this.showInstructions()}},{key:"handleFocusinWindowObj",value:function c(a){var b=a.target.getAttribute("role");(null==b||"menuitem"!=b)&&this.hideInstructions()}},{key:"handleBlurWindowObj",value:function a(){this.hideInstructions()}},{key:"handleMousedownMenuitem",value:function b(a){a.preventDefault()}},{key:"menubarResize",value:function b(){var a=this._options.windowObj.innerWidth;a<=this._options.breakpointMinWidth?this.addMenubarToggle():this.removeMenubarToggle()}},{key:"addMenubarToggle",value:function a(){null==this._options.domObj.getElementById(this._menubarToggle.getAttribute("id"))&&(this._navElem.parentNode.insertBefore(this._menubarToggle,this._navElem),this._navElem.classList.add("a11y-menubar-responsive"),this._navElem.classList.add("a11y-menubar-closed"))}},{key:"removeMenubarToggle",value:function a(){this._options.domObj.getElementById(this._menubarToggle.getAttribute("id"))&&(this._navElem.parentNode.removeChild(this._menubarToggle),this._navElem.classList.remove("a11y-menubar-responsive"),this._navElem.classList.remove("a11y-menubar-open"),this._navElem.classList.remove("a11y-menubar-closed"))}},{key:"showMenubar",value:function a(){this._navElem.classList.remove("a11y-menubar-closed"),this._navElem.classList.add("a11y-menubar-open")}},{key:"hideMenubar",value:function a(){this._navElem.classList.remove("a11y-menubar-open"),this._navElem.classList.add("a11y-menubar-closed")}},{key:"toggleInstructions",value:function b(){var a=!!this._menubarInstructions.classList.contains("a11y-menubar-instructions-show");a?this.hideInstructions():this.showInstructions()}},{key:"showInstructions",value:function a(){this._menubarInstructions.classList.add("a11y-menubar-instructions-show"),this._menubarInstructions.classList.remove("a11y-menubar-instructions-hide")}},{key:"hideInstructions",value:function a(){this._menubarInstructions.classList.add("a11y-menubar-instructions-hide"),this._menubarInstructions.classList.remove("a11y-menubar-instructions-show")}},{key:"updateCurrentMenuitem",value:function b(a){this._currentMenuitem.setAttribute("tabindex","-1"),this._currentMenuitem=a,this._currentMenuitem.setAttribute("tabindex","0")}},{key:"hasSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("a + ul");return null!=c}},{key:"openSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("ul");null!=c&&(c.classList.remove("a11y-menubar-menu-closed"),c.classList.add("a11y-menubar-menu-open"),a.setAttribute("aria-expanded","true"))}},{key:"openParentSubmenus",value:function c(){var a=this._currentMenuitem,b=a.parentNode.parentNode}},{key:"closeSubmenu",value:function d(a){var b=a.parentNode,c=b.querySelector("ul");null!=c&&(c.classList.remove("a11y-menubar-menu-open"),c.classList.add("a11y-menubar-menu-closed"),a.setAttribute("aria-expanded","false"))}},{key:"closeSiblingSubmenus",value:function f(a){for(var b=a.parentNode.parentNode,c=b.querySelectorAll("li > a[role=menuitem]"),d=[],e=0;e<c.length;e++)c[e]!==a&&d.push(c[e]);for(var g=0;g<d.length;g++)this.closeSubmenu(d[g])}},{key:"closeAllSubmenus",value:function d(){for(var a,b=this._navElem.querySelectorAll("ul.a11y-menubar-menu-open"),c=0;c<b.length;c++)a=b[c].parentNode.querySelector("a"),a.setAttribute("aria-expanded","false"),b[c].classList.remove("a11y-menubar-menu-open"),b[c].classList.add("a11y-menubar-menu-closed")}},{key:"handleClick",value:function c(a){var b=a.getAttribute("href");window.location=b}},{key:"normalizeKey",value:function c(a){var b=null;switch(a){case"Tab":case 9:b=this._keyCode.TAB;break;case"Enter":case 13:b=this._keyCode.ENTER;break;case"Escape":case"Esc":case 13:b=this._keyCode.ESC;break;case" ":case 32:b=this._keyCode.SPACE;break;case"End":case 35:b=this._keyCode.END;case"Home":case 36:b=this._keyCode.HOME;break;case"ArrowLeft":case 37:b=this._keyCode.ARROW_LEFT;break;case"ArrowUp":case 38:b=this._keyCode.ARROW_UP;break;case"ArrowRight":case 39:b=this._keyCode.ARROW_RIGHT;break;case"ArrowDown":case 40:b=this._keyCode.ARROW_DOWN;}return b}}]),a}();