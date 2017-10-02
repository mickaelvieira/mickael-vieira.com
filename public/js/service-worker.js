export default function(window) {
  if ("serviceWorker" in window.navigator) {
    window.navigator.serviceWorker
      .register("/sw.js", { useCache: false })
      .then(registration => {
        console.log(`Registration succeeded. Scope is ${registration.scope}`);
      })
      .catch(error => {
        console.log(`Registration failed with ${error}`);
      });
  }
}
