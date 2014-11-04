
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