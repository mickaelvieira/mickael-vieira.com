;(function(window, document, undefined) {

    "use strict";

    var Contact = function () {

        this.link  = document.querySelector('.link-icon-contact');

        this.addListeners();
    };

    Contact.prototype.constructor = Contact;

    Contact.prototype.built = false;

    Contact.prototype.parts = [
        "\u006d", "\u0061", "\u0069", "\u006c", "\u0074", "\u006f", "\u003a",
        "\u0063", "\u006f", "\u006e", "\u0074", "\u0061", "\u0063", "\u0074",
        "\u0040", "\u006d", "\u0069", "\u0063", "\u006b", "\u0061", "\u0065",
        "\u006c", "\u002d", "\u0076", "\u0069", "\u0065", "\u0069", "\u0072",
        "\u0061", "\u002e", "\u0063", "\u006f", "\u006d"
    ];
    Contact.prototype.addListeners = function() {
        document.addEventListener('mousemove', this.build.bind(this));
    };
    Contact.prototype.build = function() {

        if (!this.built) {
            this.link.href = this.parts.join("");
            this.built = true;
        }
    };

    document.addEventListener("DOMContentLoaded", function() {
        window.contact = new Contact();
    });

}(window, document));