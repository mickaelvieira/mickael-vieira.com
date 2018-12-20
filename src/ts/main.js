define(["require", "exports", "./contact"], function (require, exports, contact_1) {
    "use strict";
    exports.__esModule = true;
    (function () {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(function (registration) {
                console.log("Registration succeeded. Scope is " + registration.scope);
            })["catch"](function (error) {
                console.log("Registration failed with " + error);
            });
        }
        contact_1["default"]();
    })();
});
