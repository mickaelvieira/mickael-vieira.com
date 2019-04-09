/* eslint no-console: "off" */
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";
import "../css/styles.css";

import contact from "./contact";

(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log(`Registration succeeded. Scope is ${registration.scope}`);
      })
      .catch(error => {
        console.log(`Registration failed with ${error}`);
      });
  }

  contact();
})();
