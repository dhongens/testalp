import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import Fade from "react-reveal"
import $ from "jquery"
import { HiMenu, HiX } from "react-icons/hi"




export default class Header extends React.Component {


// function getUrlVars(){
//   var vars = [], hash;
//   if(typeof window !== 'undefined'){
//       var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//       for(var i = 0; i < hashes.length; i++)
//       {
//           hash = hashes[i].split('=');
//           vars.push(hash[0]);
//           vars[hash[0]] = hash[1];
//       }
//   }
//   return vars;
// }
// var city = getUrlVars()["city"];

// if (city !== undefined){
//   let cityDash = city;
//   cityDash = cityDash.replace(/-/g, ' ');

//     var cityplace = " in " + cityDash;
//     var citytitle = cityDash+"'s";
      
//     var citylink = "?city=" + city;
// } else{
//   var citylink ="";
// }

constructor(props) {
  super(props);

  if(typeof window !== 'undefined'){
    var urlparameters = new URLSearchParams(window.location.search)
  }

  this.state = {
    urlparams: urlparameters
  };
}


changeActive(event){
  $(".form").toggleClass("expanded");
  $("body").toggleClass("formExpanded");
}

  render() {
    
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
          // <Fade bottom cascade>
          <>
          <header>
            
              <div className="header-inner">
              
              <a href={"/"}>
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
                        <li><a href={"/about-us?" + this.state.urlparams}>About Us</a></li>
                        <li><a href={"/our-services?"  + this.state.urlparams}>Our Services</a></li>
                        <li><a href={"/coupons?"  + this.state.urlparams}>Specials</a></li>
                        <li><a href={"/reviews?"  + this.state.urlparams}>Reviews</a></li>
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
                    {/* <li><a href={"/about-us" + citylink}>About Us</a></li>
                    <li><a href={"/our-services"  + citylink}>Our Services</a></li>
                    <li><a href={"/coupons"  + citylink}>Specials</a></li>
                    <li><a href={"/reviews"  + citylink}>Reviews</a></li> */}
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




