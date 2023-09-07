import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import React, { Component } from "react"
import Fade from "react-reveal"
import $ from "jquery"
import { HiMenu, HiX } from "react-icons/hi"

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlparams: null // Initialize to null
    };
  }

  componentDidMount() {
    // Check if window is available (client side)
    if (typeof window !== "undefined") {
      this.setState({
        urlparams: new URLSearchParams(window.location.search)
      });
    }
  }

  changeActive(event) {
    $(".form").toggleClass("expanded");
    $("body").toggleClass("formExpanded");
  }

  render() {
    const { urlparams } = this.state; // Destructure urlparams

    return (
      <>
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
            <>
              <header>
              <div className="header-inner">
                <a href={"/" + (urlparams ? "?" + urlparams : "")}>
                <Image
                  fluid={data.sanityCompanyInfo.logo.asset.fluid}
                  style={{ height: "auto", width: "200px" }}
                  className="align-center logo"
                  alt="Logo"
                />
              </a>
              <div className="mobileWrap">
                <div className="mobile-hamburger" onClick={this.changeActive}>
                  <HiMenu style={{fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex}} />
                </div>
                  <div className="items">
                <div className="menu">
                  <ul>
                    <li><a href={"/about-us" + (urlparams ? "?" + urlparams : "")}>About Us</a></li>
                    <li><a href={"/our-services" + (urlparams ? "?" + urlparams : "")}>Our Services</a></li>
                    <li><a href={"/coupons" + (urlparams ? "?" + urlparams : "")}>Specials</a></li>
                    <li><a href={"/reviews" + (urlparams ? "?" + urlparams : "")}>Reviews</a></li>
                  </ul>
                </div>
                <div className="headerBtns">
                            <div className="btns-wrap">
                               <a className="headerbtn phone" style={{ backgroundColor: data.sanityCompanyInfo.secondarycolor.hex, borderColor: data.sanityCompanyInfo.secondarycolor.hex}} href={"tel:" + data.sanityCompanyInfo.phone}><span className="calltext" style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call 24/7</span> <span id="number_rewrite">{data.sanityCompanyInfo.phone}</span></a>
                             </div>
                           </div>
                         </div>
                       </div>
                    </div>
                    
                    <div className="mobile-menu" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.9" +")"}}>
                      <div className="close-menu" onClick={this.changeActive}>
                        <HiX style={{fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex}} />
                      </div>
                        <ul>
                          <li><a href={"/about-us" + (urlparams ? "?" + urlparams : "")}>About Us</a></li>
                          <li><a href={"/our-services"  + (urlparams ? "?" + urlparams : "")}>Our Services</a></li>
                          <li><a href={"/coupons"  + (urlparams ? "?" + urlparams : "")}>Specials</a></li>
                          <li><a href={"/reviews"  + (urlparams ? "?" + urlparams : "")}>Reviews</a></li>
                        </ul>
                    </div>
              </header>
            </>
          )}
        />
      </>
    )
  }
}




