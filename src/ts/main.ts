import contact from "./contact";

(function () {
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
