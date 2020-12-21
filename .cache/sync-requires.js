const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-page-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Ideal Garage Doors/gatsby/src/templates/page.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Ideal Garage Doors/gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Ideal Garage Doors/gatsby/src/pages/404.js"))),
  "component---src-pages-contact-form-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Ideal Garage Doors/gatsby/src/pages/contact_form.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Ideal Garage Doors/gatsby/src/pages/index.js")))
}

