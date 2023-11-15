/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import Helmet from 'react-helmet'
import Image from "gatsby-image"
import "./layout.css"
import { FaCalendarAlt, FaPhone } from 'react-icons/fa'
import $ from "jquery"
import ConversionLoggingInit from '../util/conversionLogging.js';



ConversionLoggingInit.init({env: 'prod'});



const Layout = ({ children }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery($slug: String) {
      site {
        siteMetadata {
          title
        }
      }
      sanityCompanyInfo {
        companyname
        phone
        licenses
        logo{
          asset{
            fluid{
              ...GatsbySanityImageFluid
              src
            }
          }
        }
        favicon{
          asset{
            fluid{
              ...GatsbySanityImageFluid
              src
            }
          }
        }
        primarycolor{
          hex
      }
      secondarycolor{
          hex
      }
      accentcolor{
          hex
      }
        analytics
        marchex
        remarketing
        tagmanager
      }
      allSanityBadges{
        edges {
          node {
            badge_img {
              asset {
                fluid {
                  src
                }
              }
            }
            badge_name
          }
        }
      }
      sanityPages(slug: {current: {eq: $slug}}) {
            pagetitle
            slug{
              current
            }
            coupon{
              title
              type
            }
            serviceimage{
                asset{
                    fluid(maxWidth: 1920){
                        ...GatsbySanityImageFluid
                        src
                    }
                }
            }
            headerimage{
                asset{
                    fluid(maxWidth: 1920){
                        ...GatsbySanityImageFluid
                        src
                    }
                }
            }
        }
    }
  `)


  function changeActive(){
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }  

  return (
    <>
    
    <Helmet>

         <script
        src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="twitter:card" content="summary" />

        <meta property="og:image" content={data.sanityPages.headerimage.asset.fluid.src} />
        <meta property="og:title" content={data.sanityCompanyInfo.companyname + " | " + data.sanityPages.pagetitle} />
        <link rel="icon" type="image/png" href={data.sanityCompanyInfo.favicon.asset.fluid.src} sizes="16x16"/>

        {data.sanityCompanyInfo.analytics ? (
          <script async className="AnalyticsCode" src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.analytics}`}/> 
          
          ) : null}

          {data.sanityCompanyInfo.analytics ? (
              <script>
                {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                        
                  gtag('config', '${data.sanityCompanyInfo.analytics}');
                `}
              </script>
            ) : null}

          {data.sanityCompanyInfo.remarketing ? (
          <script async className="RemarketingCode" src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.remarketing}`}/> ) : null}

          {data.sanityCompanyInfo.remarketing ? (
            <script>{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${data.sanityCompanyInfo.remarketing}');
            `}
          </script>

          ) : null}
          
          {data.sanityCompanyInfo.remarketing ? (
              <script>{`
              gtag('event', 'page_view', {
                'send_to': '${data.sanityCompanyInfo.remarketing}',
                'user_id': 'replace with value'
              });
              `}
              </script>
          ) : null}

          {data.sanityCompanyInfo.tagmanager ? (
          <script>{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${data.sanityCompanyInfo.tagmanager}');

          `}</script>
          ) : null}

          
          

          <meta name="theme-color" content={data.sanityCompanyInfo.secondarycolor.hex} />
          <script type="text/javascript">
                {`var SETUP_VS_LP = function(){
                    INIT_VS_LP({
                        env: 'prod'
                    });
                };`}
					    </script>
					    <script src="https://s3.amazonaws.com/vs.static-files/vs_lp_conv_bundle.js"  async defer onLoad={`SETUP_VS_LP`}></script>
              
              
              <script type="text/javascript">{`
                vs_account_id      = "${data.sanityCompanyInfo.marchex}";
              `}</script>
              <script type="text/javascript" src="https://rw1.calls.net/euinc/number-changer.js"></script>

              <script src="https://kit.fontawesome.com/4ab4233178.js" crossorigin="anonymous"></script>
              <script type='text/javascript'>{`var script = document.createElement('script');
              script.async = true; script.type = 'text/javascript';
              var target = 'https://www.clickcease.com/monitor/stat.js';
              script.src = target;var elem = document.head;elem.appendChild(script);`}
              </script>
              <style>{`
                    .pageHeader h1, h1, h2, h3, h4, h5, h6{
                      color:  ${data.sanityCompanyInfo.primarycolor.hex } !important; 
                    }
                    `}
                  </style>
    </Helmet>
    <noscript>
   <a href='https://www.clickcease.com' rel='nofollow'><img src='https://monitor.clickcease.com/stats/stats.aspx' alt='ClickCease'/></a>
   </noscript>
   <noscript><iframe src={"https://www.googletagmanager.com/ns.html?id=" + data.sanityCompanyInfo.tagmanager} height="0" width="0" style={{display:'none', visibility:'hidden'}}></iframe></noscript>
    <div className="pagewrapper" >
   <Header />
          <div>
            <main>{children}</main>
            <Footer />
          </div>
        </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}



export default Layout
