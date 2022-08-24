import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import Fade from "react-reveal"
import $ from "jquery"
import { HiMenu, HiX } from "react-icons/hi"


function changeActive(){
    $(".mobile-menu").toggleClass("active");
    $("body").toggleClass("overflow-hidden");
}

  
// if(typeof window !== 'undefined'){
//   var lastScrollTop = 0;
//   $(window).on('scroll', function(event){
//      var st = $(this).scrollTop();
//      if (st > lastScrollTop){
//          $("body").addClass("scroll-down");
//      } else {
//         $("body").removeClass("scroll-down");
//      }
//      lastScrollTop = st;
//   });
// }

    

export default () => (
  <StaticQuery query={ graphql`
          query CompanyQuery {
            sanityCompanyInfo {
              phone
              companyTagline
              primarycolor{
                rgb{
                  a
                  r
                  g
                  b
              }
                hex
            }
            secondarycolor{
                hex
            }
            accentcolor{
                hex
            }
              logo {
                asset {
                  fluid(maxWidth: 700) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
          }
        `} 

        
        render={data => (
          // <Fade bottom cascade>
          <header>
            
              <div className="header-inner">
              
              <a href="/">
              <Image location="/"
                  fluid={data.sanityCompanyInfo.logo.asset.fluid}
                  style={{ height: "auto", width: "200px" }}
                  className="align-center logo"
                  alt="Logo"
                />
              </a>
              <div className="mobileWrap">
                <div className="mobile-hamburger" onClick={changeActive}>
                  <HiMenu style={{fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex}} />
                </div>
                  <div className="items">
                    <div className="menu">
                      <ul>
                        <li><a href="/about-us/">About Us</a></li>
                        <li><a href="/our-services/">Our Services</a></li>
                        <li><a href="/coupons/">Specials</a></li>
                        <li><a href="/reviews/">Reviews</a></li>
                      </ul>
                    </div>
                    <div className="headerBtns">
                      <div className="btns-wrap">
                        <a className="headerbtn phone" style={{ backgroundColor: data.sanityCompanyInfo.secondarycolor.hex, borderColor: data.sanityCompanyInfo.secondarycolor.hex}} href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call 24/7</span> {data.sanityCompanyInfo.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mobile-menu" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.9" +")"}}>
                <div className="close-menu" onClick={changeActive}>
                  <HiX style={{fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex}} />
                </div>
                  <ul>
                    <li><a href="/about-us/">About Us</a></li>
                    <li><a href="/our-services/">Our Services</a></li>
                    <li><a href="/coupons/">Specials</a></li>
                    <li><a href="/reviews/">Reviews</a></li>
                  </ul>
              </div>
          </header>
          // </Fade>
        )}
  />
)




