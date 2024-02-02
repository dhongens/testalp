import React , { useEffect, useState } from 'react';

import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import CouponForm from "../components/coupon_form"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import Fade from 'react-reveal/Fade';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaAngleRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import QuoteIcon from "../images/quote-left-solid.png"
import couponBackground from "../images/couponBackground.png"
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

      var cityplace = "in " + cityDash;

      var citytitle = city+"'s";
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
    query aboutQuery{
        sanityPages(slug: {current: {eq: "home"}}) {
            pagetitle
            slug {
                current
            }
            topPageTitle
            pageIntroTitle
            _rawPageIntro
            _rawFirstcopy
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
        allSanityReviews(limit: 2) {
            edges {
              node {
                review
                author
              }
            }
          }
          allSanityThreeservices {
            edges {
              node {
                servicelink
                servicetext
                servicetitle
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

  // Define reviewsLink as a state variable
  const [reviewsLink, setReviewsLink] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlParams = Object.fromEntries(urlSearchParams.entries());

  
    // Update the links with URL parameters
    document.querySelectorAll('.serviceLink').forEach((link) => {
      const serviceSlug = link.getAttribute('data-service-slug');
      const modifiedLink = `${serviceSlug}?${Object.entries(urlParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
      link.href = modifiedLink;
    });
  
     // Update the "See More Reviews" link
    const updatedReviewsLink = `/reviews${
      Object.keys(urlParams).length > 0
        ? '?' + Object.entries(urlParams).map(([key, value]) => `${key}=${value}`).join('&')
        : ''
    }`;

    // Set the reviewsLink state with the updated link
    setReviewsLink(updatedReviewsLink);

    console.log("reviewsLink:", reviewsLink); // Add this console.log statement
  
  }, []);
  return(
    <Layout>
    <Helmet>
    <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>   
    </Helmet>
    <div className="about-us">
    <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                      <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
                            <div className="mobile-button formButton" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now</span> {data.sanityCompanyInfo.phone}</a></div>

                            <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>

                              <span className="coupon-title">{data.sanityPages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityPages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityPages.coupon.coupontext}</span>

                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
                            <div className="desktop-button formButton" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}><a href={"tel:" + data.sanityCompanyInfo.phone}><span style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Call Now</span> {data.sanityCompanyInfo.phone}</a></div>
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
        <div className="uspSection">
            <div className="inner">
                <h2 className="uspTitle">Count on {data.sanityCompanyInfo.companyname} for all of your home service needs!</h2>
                {/* <Fade bottom cascade> */}
                <div className="uspColumns">
                {data.allSanityThreeservices.edges.map(( {node: service})  => 


                        <div className="column1 column" >
                        <div className="column-inner" style={{boxShadow: "0px 3px 50px rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+data.sanityCompanyInfo.primarycolor.rgb.b + ", 0.3)"}}>
                            <div className="icon" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex}}><img style={{width: '20px'}} src={service.icon.asset.fluid.src}/></div>
                            <h3 className="serviceTitle">{service.servicetitle} Services</h3>
                            <p>{service.servicetext}</p>
                            <a href={`${service.servicelink}`} className="serviceLink" data-service-slug={`${service.servicelink}`} style={{ color: data.sanityCompanyInfo.secondarycolor.hex }}>
                              Go to {service.servicetitle} Page <FaAngleRight />
                            </a>

                        </div>
                    </div>
                    )}
                </div>
                {/* </Fade> */}
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
        <div className="reviewsSection">
        {/* <Fade bottom cascade> */}
            <div className="inner">
                <h2>What our <br />customers say</h2>
                <div className="columns">
                {data.allSanityReviews.edges.map(({ node: reviews }) => (
                    <>
                    <div className="column1 column">
                        <div className="quote-icon" style={{backgroundImage: "url(" + QuoteIcon + ")"}}></div>
                        <div className="column-inner">
                        

                            <div className="review">
                                <p>{reviews.review}</p>
                                <div className="author"><p>{reviews.author}</p></div>
                            </div>
                        </div>
                    </div>
                        </>
                    ))}
                </div>
                <div className="reviews-btn">
                  <a href={reviewsLink} className="buttonstyle" style={{ background: `linear-gradient(to right, ${data.sanityCompanyInfo.gradientcolor1.hex}, ${data.sanityCompanyInfo.gradientcolor2.hex})` }}>
                      See More Reviews
                    </a>
                </div>
            </div>
            {/* </Fade> */}
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
            </div>
        {/* </Fade> */}
    </div>
    </div>
    
    <div className="sticky-mobile">
    <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityPages.coupon.title}</span> <FaArrowRight /></a>

            </div>
    
  </Layout>
)
                }