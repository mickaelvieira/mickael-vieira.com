;(function(window, document, undefined) {

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

    window.Contact = Contact;
    window.contact = new Contact();

}(window, document));
;(function(window, document, undefined) {

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

    window.Footer = Footer;
    window.footer = new Footer();

}(window, document));