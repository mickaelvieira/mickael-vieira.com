import Contact from "./contact";

(function() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", { useCache: false })
      .then(registration => {
        console.log(`Registration succeeded. Scope is ${registration.scope}`);
      })
      .catch(error => {
        console.log(`Registration failed with ${error}`);
      });
  }

  new Contact();
})();
