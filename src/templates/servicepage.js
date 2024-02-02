import React , { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import CouponForm from "../components/coupon_form"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import $ from 'jquery';


function changeActive(){
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }

  function getUrlVars(){
    var vars = [], hash;
    if(typeof window !== 'undefined'){
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
  }
  var city = getUrlVars()["city"];

  if (city !== undefined){
    let cityDash = city;
    cityDash = cityDash.replace(/-/g, ' ');

      var cityplace = " in " + cityDash;
      var citytitle = cityDash+"'s";

      var citylink = "?city=" + city;
    } else{
      var citylink ="";
    }

    function getUrlParams() {
        if (typeof window !== 'undefined') {
          const urlSearchParams = new URLSearchParams(window.location.search);
          const params = Object.fromEntries(urlSearchParams.entries());
          return params;
        }
        return {};
      }
      
      const urlParams = getUrlParams();

export const query = graphql`
    query servicePageQuery($slug: String){
        sanityServicepages(slug: {current: {eq: $slug}}) {
            pagetitle
            slug {
                current
            }
            topPageTitle
            pageIntroTitle
            _rawFirstcopy
            _rawPageIntro
            
            coupon {
                title
                type
                coupontext
            }
            headerimage {
                asset {
                    fluid(maxWidth: 1920) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            serviceimage {
                asset {
                    fluid(maxWidth: 1920) {
                      ...GatsbySanityImageFluid
                    }
                }
            }
            servicetitle
            services{
                slug{current}
                pagetitle
            }
    }
        sanityCompanyInfo {
            companyname
            phone
            favicon{
                asset{
                    fluid{
                        src
                    }
                }
            }
            primarycolor{
                hex
                rgb{
                    a
                    r
                    g
                    b
                }
            }
            secondarycolor{
                hex
            }
            tertiarycolor{
                hex
            }
            accentcolor{
                hex
            }
            gradientcolor1{hex}
            gradientcolor2{hex}
            couponbackground{
                asset{
                    fluid{
                        src
                    }
                }
            }
        }
        
    }
`

export default ({ data }) => {


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(urlSearchParams.entries());
    
    
        // Update the links with URL parameters
        document.querySelectorAll('.serviceLink').forEach((link) => {
        const serviceSlug = link.getAttribute('data-service-slug');
        const modifiedLink = `${serviceSlug}?${Object.entries(urlParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
        link.href = modifiedLink;
        });
        
    }, []);

    return (
    <Layout>
    <Helmet>
    <title>{data.sanityCompanyInfo.companyname} | {data.sanityServicepages.pagetitle}</title>   
      
    </Helmet>
    <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                      <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
                            <div className="mobile-button formButton" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now</span> {data.sanityCompanyInfo.phone}</a></div>
                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>

                              <span className="coupon-title">{data.sanityServicepages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityServicepages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityServicepages.coupon.coupontext}</span>

                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
                          <div className="desktop-button formButton" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now</span> {data.sanityCompanyInfo.phone}</a></div>

                          <h2 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Don’t Wait All Day for Service!</h2>  
                            <p>Fill out the form below and we'll reach out to schedule your service appointment. </p>
                            <span  className="closeForm" onClick={changeActive} onKeyDown={changeActive} style={{fill: "#fff", color: '#fff'}}><FaTimes /></span>
                            <Form />
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        {/* <Fade bottom> */}
        <div className="pageHeader">
            <div className="columns">
                <div className="column1 column">
                <div className="column-inner">
                <Image
                    style={{
                    height: "100%",
                    backgroundPosition: "center"
                    }}
                    fluid={data.sanityServicepages.headerimage.asset.fluid} className="leftImage">

                </Image>
                </div>
                </div>
                <div className="column2 column">
                <div className="column-inner">
                    <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> {data.sanityServicepages.topPageTitle} {cityplace}</div>
                    <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>{data.sanityServicepages.pageIntroTitle} {cityplace}</h1>

                    <PortableText style={{color: data.sanityCompanyInfo.primarycolor.hex}} blocks={data.sanityServicepages._rawPageIntro} />

                    <div className="schedule-btn">
                    <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityServicepages.coupon.title}</span> <FaArrowRight /></a>

                    </div>
                    <div className="servicesSelection">
                        <h3 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Count on {data.sanityCompanyInfo.companyname} for all of your {data.sanityServicepages.servicetitle} needs!</h3>
                        <div className="servicesIcons">
                        {data.sanityServicepages.services.map(service => 
                         <div className="service">
                         <div className="service-inner">
                         <a href={service.slug.current} className="serviceLink" data-service-slug={`${service.slug.current}`}>
                        <div className="icon">
                            <img src={data.sanityCompanyInfo.favicon.asset.fluid.src} alt="" />
                        </div>
                        <div className="serviceName" style={{ color: data.sanityCompanyInfo.secondarycolor.hex }}>
                            {service.pagetitle}
                        </div>
                        </a>
                         </div>
                     </div>
                        )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        {/* </Fade> */}
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + data.sanityCompanyInfo.couponbackground.asset.fluid.src + ")"}} >
        {/* <Fade bottom> */}
        <div className="background-overlay" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.8" +")"}}>

                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>
                        <div className="couponOffer">{data.sanityServicepages.coupon.title}</div>
                        <div className="couponType">{data.sanityServicepages.coupon.type}</div>
                        <p className="couponInfo">{data.sanityServicepages.coupon.coupontext}</p>
                    </div>
                    </div>
                </div>
                <div className="column2 column">
                    <div className="inner">
                    <h3>Don’t Wait All Day for Service!</h3>
                    <p>Fill out the form below and we’ll reach out to schedule your appointment.</p>
                    <CouponForm />
                    </div>
                </div>
                </div>
            </div>
            </div>
        {/* </Fade> */}
    </div>
    <SocialProof />
        <div className="contentSection">
            <div className="inner">
            {/* <Fade bottom cascade> */}
                <div className="columns">
                    <div className="column1 column">
                        <div className="column-inner">
                        <PortableText blocks={data.sanityServicepages._rawFirstcopy} />

                        </div>
                    </div>
                    <div className="column2 column">
                        <div className="column-inner">
                        <Image 
                            style={{height: "100%"}}
                            fluid={data.sanityServicepages.serviceimage.asset.fluid}>
                        </Image>
                        <div className="schedule-btn"><a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityServicepages.coupon.title}</span> <FaArrowRight /></a></div>
                        </div>
                    </div>
                </div>
                {/* </Fade> */}
            </div>
        </div>
        <div className="sticky-mobile">
              <a onClick={changeActive} className="schedule-btn" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityServicepages.coupon.title} {data.sanityServicepages.coupon.type} <FaArrowRight /></a>
            </div>
  </Layout>
)}