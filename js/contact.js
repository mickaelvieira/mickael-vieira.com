
var Contact = function () {

    if (document.querySelector &&
        document.addEventListener) {

        this.init();
    }
};

Contact.prototype.parts = [
    '\u006d', '\u0061', '\u0069', '\u006c', '\u0074', '\u006f', '\u003a',
    '\u0063', '\u006f', '\u006e', '\u0074', '\u0061', '\u0063', '\u0074',
    '\u0040', '\u006d', '\u0069', '\u0063', '\u006b', '\u0061', '\u0065',
    '\u006c', '\u002d', '\u0076', '\u0069', '\u0065', '\u0069', '\u0072',
    '\u0061', '\u002e', '\u0063', '\u006f', '\u006d'
];
Contact.prototype.init = function() {

    this.getDOMElements();

    if (this.link) {
        this.showLink();
        this.addListeners();
    }
};
Contact.prototype.getDOMElements = function() {
    this.link = document.querySelector('.link-icon-contact');
};
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
    return this.parts.join('');
};

export default Contact;