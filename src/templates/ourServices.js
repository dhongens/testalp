import React , { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import CouponForm from "../components/coupon_form"
import Helmet from 'react-helmet'
import BackgroundImage from 'gatsby-background-image';
import SocialProof from '../components/socialProof';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import $ from 'jquery';


function changeActive(e){
    e.preventDefault();
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

export const query = graphql`
    query ourServicesQuery{
        sanityPages(slug: {current: {eq: "our-services"}}) {
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
    }
        sanityCompanyInfo {
            companyname
            phone
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
        allSanityOurservices {
            edges {
              node {
                servicelist {
                  servicelink
                  servicename
                }
                servicemaintitle
                icon {
                  asset {
                    fluid {
                      src
                    }
                  }
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
    <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>   
      
    </Helmet>
    <div className="our-services">
    <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                      <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
                            <div className="mobile-button formButton" style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now!</span> {data.sanityCompanyInfo.phone}</a></div>
                             <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>

                              <span className="coupon-title">{data.sanityPages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityPages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityPages.coupon.coupontext}</span>

                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
                          <div className="desktop-button formButton" style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now!</span> {data.sanityCompanyInfo.phone}</a></div>
                            <h2 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Don’t Wait All Day for Service!</h2>  
                            <p>Fill out the form below and we'll reach out to schedule your service appointment. </p>
                            <a className="closeForm" onClick={changeActive} style={{fill: "#fff", color: '#fff'}}><FaTimes /></a>
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
          <BackgroundImage
            style={{
              height: "100%",
              width: "100%",
              backgroundPosition: "center",
              backgroundSize: 'cover',
              borderRadius: '50px 0 50px 0'
            }}
            fluid={data.sanityPages.headerimage.asset.fluid} className="leftImage">
          <div className="column-inner">

          </div>
          </BackgroundImage>
        </div>
        <div className="column2 column">
          <div className="column-inner">
              <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> {data.sanityPages.topPageTitle} {cityplace}</div>
              <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>{data.sanityPages.pageIntroTitle} {cityplace}</h1>
              <p style={{color: data.sanityCompanyInfo.primarycolor.hex}}>
                <PortableText blocks={data.sanityPages._rawPageIntro} />

              </p>
              <div className="schedule-btn">
              <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityPages.coupon.title}</span> <FaArrowRight /></a>


              </div>
          </div>
        </div>
      </div>
    </div>
    {/* </Fade> */}
        <div className="servicesSection">
            <div className="inner">
                <h2>Our Trusted Services</h2>
                <div className="columns">
                {data.allSanityOurservices.edges.map(({ node: services }) => (
                    <div className="column1 column">
                        <div className="column-inner">
                            <div className="service-icon" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex}}>
                                <img style={{width: '20px'}} src={services.icon.asset.fluid.src} alt="" />
                            </div>
                            <h3>{services.servicemaintitle} Services</h3>
                            <ul>
                                {services.servicelist.map(item => (
                                    <li><a href={item.servicelink} className="serviceLink" data-service-slug={`${item.servicelink}`}>{item.servicename}</a></li>
                                 ))}
                            </ul>
                        </div>
                    </div>
                    ))}

                </div>
            </div>   
        </div>
        <SocialProof />
        <div className="contentSection">
            <div className="inner">
            {/* <Fade bottom cascade> */}
                <div className="columns">
                    <div className="column1 column">
                        <div className="column-inner">
                        <PortableText blocks={data.sanityPages._rawFirstcopy} />

                        </div>
                    </div>
                    <div className="column2 column">
                        <div className="column-inner">
                        <Image 
                            style={{height: "100%"}}
                            fluid={data.sanityPages.serviceimage.asset.fluid}>
                        </Image>
                        <div className="schedule-btn">
                        <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityPages.coupon.title}</span> <FaArrowRight /></a>

                          </div>
                        </div>
                    </div>
                </div>
                {/* </Fade> */}
            </div>
        </div>
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + data.sanityCompanyInfo.couponbackground.asset.fluid.src + ")"}} >
        {/* <Fade bottom> */}
        <div className="background-overlay" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.8" +")"}}>

                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>
                        <div className="couponOffer">{data.sanityPages.coupon.title}</div>
                        <div className="couponType">{data.sanityPages.coupon.type}</div>
                        <p className="couponInfo">{data.sanityPages.coupon.coupontext}</p>
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
        {/* </Fade> */}
        </div>
    </div>
    </div>
    <div className="sticky-mobile">
            <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityPages.coupon.title}</span> <FaArrowRight /></a>

            </div>
  </Layout>
)}