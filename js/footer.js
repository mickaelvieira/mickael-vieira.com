
"use strict";

var Footer = function () {

    if (document.querySelector &&
        document.addEventListener) {

        this.body = document.body;
        this.html = document.documentElement;
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
    return Math.max(
        this.body.scrollHeight,
        this.body.offsetHeight,
        this.html.clientHeight,
        this.html.scrollHeight,
        this.html.offsetHeight
    );
};
Footer.prototype.getFooterHeight = function() {
    return this.footer.offsetHeight;
};

module.exports = Footer;
