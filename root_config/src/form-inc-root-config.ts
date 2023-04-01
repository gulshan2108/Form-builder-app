import { registerApplication, start, LifeCycles } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import<LifeCycles>(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "awesome-form-builder",
  app: () => System.import<LifeCycles>("awesome-form-builder"),
  activeWhen: ["/"]
});

start({
  urlRerouteOnly: true,
});
