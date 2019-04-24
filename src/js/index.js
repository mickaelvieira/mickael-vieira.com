/* eslint no-console: "off" */
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "roboto-fontface/css/roboto-condensed/roboto-condensed-fontface.css";
import "font-awesome/css/font-awesome.css";
import "../css/styles.css";

import contact from "./contact";

(() => {
  // @TODO I need to fix caches in order to reactivate the service worker
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker
  //     .register("/dist/js/sw.js")
  //     .then(registration => {
  //       console.log(`Registration succeeded. Scope is ${registration.scope}`);
  //     })
  //     .catch(error => {
  //       console.log(`Registration failed with ${error}`);
  //     });
  // }

  contact();
})();
