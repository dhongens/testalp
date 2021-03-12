// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-our-services-js": () => import("./../src/templates/ourServices.js" /* webpackChunkName: "component---src-templates-our-services-js" */),
  "component---src-templates-reviews-js": () => import("./../src/templates/reviews.js" /* webpackChunkName: "component---src-templates-reviews-js" */),
  "component---src-templates-servicepage-js": () => import("./../src/templates/servicepage.js" /* webpackChunkName: "component---src-templates-servicepage-js" */),
  "component---src-templates-coupons-js": () => import("./../src/templates/coupons.js" /* webpackChunkName: "component---src-templates-coupons-js" */),
  "component---src-templates-page-js": () => import("./../src/templates/page.js" /* webpackChunkName: "component---src-templates-page-js" */),
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-contact-form-js": () => import("./../src/pages/contact_form.js" /* webpackChunkName: "component---src-pages-contact-form-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */)
}

