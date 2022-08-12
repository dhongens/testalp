import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import Fade from 'react-reveal/Fade';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import couponBackground from "../images/couponBackground.png"
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
      var cityplace = "in " + city;
      var citytitle = city+"'s";
  }

export const query = graphql`
    query servicePageQuery($slug: String){
        sanityServicepages(slug: {current: {eq: $slug}}) {
            pagetitle
            slug {
                current
            }
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
    allSanityPageheaderservices {
        edges {
          node {
            servicelink
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
        sanityCompanyInfo {
            companyname
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

export default ({ data }) => (
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
                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>

                              <span className="coupon-title">{data.sanityServicepages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityServicepages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityServicepages.coupon.coupontext}</span>
                        <p className="disclaimer">*Restrictions may apply. Call office for details.</p>

                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
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
        <Fade bottom>
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
                    <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> Providing Same Day Service {cityplace}</div>
                    <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>{citytitle} Best {data.sanityServicepages.pagetitle} Technicians</h1>
                    <PortableText style={{color: data.sanityCompanyInfo.primarycolor.hex}} blocks={data.sanityServicepages._rawPageIntro} />

                    <div className="schedule-btn">
                        <a onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}} >Schedule Today for {data.sanityServicepages.coupon.title} <FaArrowRight /></a>
                    </div>
                    <div className="servicesSelection">
                        <h3 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Count on Plumbit for all of your plumbing needs!</h3>
                        <div className="servicesIcons">
                        {data.allSanityPageheaderservices.edges.map(( {node: service})  => 
                        <div className="service">
                            <div className="service-inner">
                            <a href={service.servicelink}>
                                <div className="icon">
                                <img src={service.icon.asset.fluid.src} alt="" />
                                </div>
                                <div className="serviceName" style={{color: data.sanityCompanyInfo.secondarycolor.hex}}>{service.servicetitle}</div>

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
        </Fade>
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + couponBackground + ")"}} >
        <Fade bottom>
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.8" +")"}}>

                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>
                        <div className="couponOffer">{data.sanityServicepages.coupon.title}</div>
                        <div className="couponType">{data.sanityServicepages.coupon.type}</div>
                        <p className="couponInfo">{data.sanityServicepages.coupon.coupontext}</p>
                        <p className="disclaimer">*Restrictions may apply. Call office for details.</p>
                    </div>
                    </div>
                </div>
                <div className="column2 column">
                    <div className="inner">
                    <h3>Don’t Wait All Day for Service!</h3>
                    <p>Fill out the form below and we’ll reach out to schedule your appointment.</p>
                    <Form />
                    </div>
                </div>
                </div>
            </div>
        </Fade>
    </div>
    <SocialProof />
        <div className="contentSection">
            <div className="inner">
            <Fade bottom cascade>
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
                        <div className="schedule-btn"><a role="button" tabIndex={0} onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule today for $20 off plumbing repairs <FaArrowRight /></a></div>
                        </div>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
  </Layout>
)