const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-page-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/templates/page.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/pages/404.js"))),
  "component---src-pages-contact-form-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/pages/contact_form.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/pages/index.js"))),
  "component---src-templates-our-services-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/templates/ourServices.js"))),
  "component---src-templates-reviews-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/templates/reviews.js"))),
  "component---src-templates-coupons-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/templates/coupons.js"))),
  "component---src-templates-servicepage-js": hot(preferDefault(require("/Users/pietertenret/Documents/VitalStorm/Sandbox/Peter Levi/gatsby/src/templates/servicepage.js")))
}

