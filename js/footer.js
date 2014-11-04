
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
    return window.innerHeight - window.scrollY;
};
Footer.prototype.getFooterHeight = function() {
    return this.footer.offsetHeight;
};

module.exports = Footer;
