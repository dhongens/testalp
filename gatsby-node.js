/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

// You can delete this file if you're not using it


exports.createPages = async ({ actions, graphql }) => {
    const result = await graphql(`
        query MyQuery {
            allSanityPages {
                edges {
                    node {
                        slug {
                        current
                        }
                        pagetype{
                            pagetype
                        }
                    }
                }
            }
            allSanityServicepages{
                edges {
                    node {
                        slug {
                        current
                        }   
                    }
                }
            }
        }
    `);

    const projects = result.data.allSanityPages.edges.map(({ node }) => node );
    projects.forEach(project => {
        if(project.slug.current == "our-services"){
            actions.createPage({
                path: project.slug.current,
                component: require.resolve('./src/templates/ourServices.js'),
                context: {
                    slug: project.slug.current
                }
            })
        } else if (project.slug.current == "coupons"){
                 actions.createPage({
                    path: project.slug.current,
                    component: require.resolve('./src/templates/coupons.js'),
                    context: {
                        slug: project.slug.current
                    }
                })
        } else if (project.slug.current == "special-offers"){
            actions.createPage({
               path: project.slug.current,
               component: require.resolve('./src/templates/coupons.js'),
               context: {
                   slug: project.slug.current
               }
           })
        } else if (project.slug.current == "reviews") {
            actions.createPage({
                path: project.slug.current,
                component: require.resolve('./src/templates/reviews.js'),
                context: {
                    slug: project.slug.current
                }
            })
        // } else if (project.pagetype.pagetype == "Service Page") {
        //     actions.createPage({
        //         path: project.slug.current,
        //         component: require.resolve('./src/templates/servicepage.js'),
        //         context: {
        //             slug: project.slug.current
        //         }
        //     })
        } else if (project.slug.current == "about-us") {
            actions.createPage({
                path: project.slug.current,
                component: require.resolve('./src/templates/aboutUs.js'),
                context: {
                    slug: project.slug.current
                }
            })
        } 
        else {
            actions.createPage({
                path: project.slug.current,
                component: require.resolve('./src/templates/page.js'),
                context: {
                    slug: project.slug.current
                }
            })
        }
    })
    const servicePages = result.data.allSanityServicepages.edges.map(({ node }) => node );
        servicePages.forEach(servicePage => {
            actions.createPage({
                path: servicePage.slug.current,
                component: require.resolve('./src/templates/servicepage.js'),
                context: {
                    slug: servicePage.slug.current
                }
            })
        })
}





