import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import CouponForm from "../components/coupon_form"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import $ from 'jquery';
import Image from 'gatsby-image'



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
    query couponsQuery{
        sanityPages(slug: {current: {eq: "coupons"}}) {
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
            companyTagline
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
                rgb{
                    a
                    r
                    g
                    b
                }
            }
            tertiarycolor{
                hex
            }
            accentcolor{
                hex
                rgb{
                    a
                    r
                    g
                    b
                }
            }
            gradientcolor1{
                hex
                rgb{
                    a
                    r
                    g
                    b
                }
            }
            gradientcolor2{
                hex
                rgb{
                    a
                    r
                    g
                    b
                }
            }
            couponbackground{
                asset{
                    fluid{
                        src
                    }
                }
            }
        }
        allSanityCoupon{
            edges{
                node{
                    title
                    type
                    hidecoupon
                    coupontext
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
    <div className="coupons">
    <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                      <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <div className="coupon">
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
                            <h2>Schedule Service</h2>  
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
        <div className="row couponsRow">
            <div className="inner">
                <ul>
                    {data.allSanityCoupon.edges.map(({ node: coupon }) => (
                    <>
                    {coupon.hidecoupon === true && <li className="coupon" key={coupon.title} style={{ border: "dashed 2px " + data.sanityCompanyInfo.accentcolor.hex }}>
                        {coupon.hidecoupon === true && <span key={coupon.title} className="couponTitle">{coupon.title}</span>}
                        <br />
                        {coupon.hidecoupon === true && <span key={coupon.type} className="couponType">{coupon.type}</span>}
                        <br />
                        {coupon.hidecoupon === true && <p key={coupon.slug} className="restrictions">{coupon.coupontext}</p>}
                    </li>}
                    </>
                    ))}
                </ul>
            </div>
        </div>
        <SocialProof />
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + data.sanityCompanyInfo.couponbackground.asset.fluid.src + ")"}} >
        {/* <Fade bottom> */}
        <div className="background-overlay" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <h2 className="couponUSP">{data.sanityCompanyInfo.companyTagline}</h2>
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
              <a onClick={changeActive} className="schedule-btn" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityPages.coupon.title} <FaArrowRight /></a>
            </div>
  </Layout>
)

