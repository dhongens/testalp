import React from 'react';
import { graphql } from 'gatsby';
import Image from "gatsby-image";
import Layout from "../components/layout";
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import Form from "../components/form";
import Helmet from 'react-helmet';
import $ from 'jquery';
import Fade from 'react-reveal/Fade';
import SocialProof from '../components/socialProof';
import quoteIcon from "../images/quote-left-solid.png";
import PortableText from '@sanity/block-content-to-react'


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

  }
export const query = graphql`
    query reviewsQuery {
        sanityPages(slug: {current: {eq: "reviews"}}) {
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
        allSanityReviews{
            edges{
                node{
                    author
                    review
                }
            }
        }
    }
`


export default ({ data }) => (
    <Layout>
        <Helmet>
            <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>
            
        </Helmet>
        <div className="reviews">
        <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                        <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <span className="closeForm" onClick={changeActive}><FaTimes /></span>

                            <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}} >
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
          <div className="column-inner">
          <Image
            style={{
              height: "100%",
              backgroundPosition: "center"
            }}
            fluid={data.sanityPages.headerimage.asset.fluid} className="leftImage">

          </Image>
          </div>
        </div>
        <div className="column2 column">
          <div className="column-inner">
              <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> {data.sanityPages.topPageTitle} {cityplace}</div>
              <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>{data.sanityPages.pageIntroTitle}</h1>

              <PortableText style={{color: data.sanityCompanyInfo.primarycolor.hex}} blocks={data.sanityPages._rawPageIntro} />

              <div className="schedule-btn">
              <a onClick={changeActive} className="buttonstyle" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for <span style={{color: data.sanityCompanyInfo.tertiarycolor.hex }}>{data.sanityPages.coupon.title}</span> <FaArrowRight /></a>


              </div>
          </div>
        </div>
      </div>
    </div>
    {/* </Fade> */}

    <div className="reviewsSection">
        {/* <Fade bottom cascade> */}
        <div className="row reviewRow">

                {data.allSanityReviews.edges.map(({ node: reviews }) => (
                    <div className="review">
                        <span className="quote-icon" style={{backgroundImage: "url(" + quoteIcon + ")"}}></span>
                        <p className="reviewText">{reviews.review}</p>
                        <div className="review-meta">
                            <p className="author">{reviews.author}</p>
                        </div>
                    </div>
                ))}
        </div>
        {/* </Fade> */}
    </div>
    <SocialProof />
        </div>
        <div className="sticky-mobile">
              <a onClick={changeActive} className="schedule-btn" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityPages.coupon.title} <FaArrowRight /></a>
            </div>
    </Layout>
)