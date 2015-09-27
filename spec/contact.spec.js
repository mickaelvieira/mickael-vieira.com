
import Contact from '../js/contact';

describe("Contact Module", function() {

    var contact;

    beforeEach(function() {
        contact = new Contact();
    });

    it("should return the hypertext reference", function() {
        expect(contact.geHypertextReference()).toEqual('mailto:contact@mickael-vieira.com');
    });
});

