(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";

var Contact = function () {

    if (document.querySelector &&
        document.addEventListener) {

        this.link = document.querySelector('.link-icon-contact');
        if (this.link) {
            this.showLink();
            this.addListeners();
        }
    }
};

Contact.prototype.constructor = Contact;

Contact.prototype.parts = [
    "\u006d", "\u0061", "\u0069", "\u006c", "\u0074", "\u006f", "\u003a",
    "\u0063", "\u006f", "\u006e", "\u0074", "\u0061", "\u0063", "\u0074",
    "\u0040", "\u006d", "\u0069", "\u0063", "\u006b", "\u0061", "\u0065",
    "\u006c", "\u002d", "\u0076", "\u0069", "\u0065", "\u0069", "\u0072",
    "\u0061", "\u002e", "\u0063", "\u006f", "\u006d"
];
Contact.prototype.showLink = function() {
    this.link.style.display = 'inline';
};
Contact.prototype.addListeners = function() {
    this.handler = this.build.bind(this);
    document.addEventListener('mousemove', this.handler);
};
Contact.prototype.build = function() {
    this.link.href = this.geHypertextReference();
    document.removeEventListener('mousemove', this.handler);
};
Contact.prototype.geHypertextReference = function() {
    return this.parts.join("");
};

module.exports = Contact;
},{}],2:[function(require,module,exports){

"use strict";

var Footer = function () {

    if (document.querySelector &&
        document.addEventListener) {

        this.footer = document.querySelector('.block-footer');
        if (this.footer) {
            this.adjust();
            this.addListeners();
        }
    }
};

Footer.prototype.constructor = Footer;

Footer.prototype.addListeners = function() {
    window.addEventListener('resize', this.adjust.bind(this));
};
Footer.prototype.adjust = function() {
    this.footer.style.top = this.getNewYPosition() + "px";
};
Footer.prototype.getNewYPosition = function() {
    return this.getViewportHeight() - this.getFooterHeight();
};
Footer.prototype.getViewportHeight = function() {
    return window.innerHeight;
};
Footer.prototype.getFooterHeight = function() {
    return this.footer.offsetHeight;
};

module.exports = Footer;

},{}],3:[function(require,module,exports){

"use strict";

var Contact = require('./contact.js');
var Footer = require('./footer.js');

var App = function() {

};
App.prototype.run = function() {

    this.contact = new Contact();
    this.footer = new Footer();
};
window.app = new App();
window.app.run();
},{"./contact.js":1,"./footer.js":2}]},{},[3]);
