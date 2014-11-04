describe("Contact Module", function() {

    var contact;

    beforeEach(function() {
        contact = window.app.contact;
    });

    it("should return the hypertext reference", function() {
        expect(contact.geHypertextReference()).toEqual('mailto:contact@mickael-vieira.com');
    });
});

