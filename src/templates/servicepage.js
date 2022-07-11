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
        sanityPages(slug: {current: {eq: $slug}}) {
            pagetitle
            pagetype{
                pagetype
            }
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
    <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>   
      
    </Helmet>
    <div className="popupForm">
            <div className="popupForm">
                   <div className="form">
                      <div className="two_columns">
                      <div className="column1" style={{backgroundImage: 'url('+ data.sanityCompanyInfo.couponbackground.asset.fluid.src + ')'}}>
                          <div className="column-inner" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex+"e3" }}>
                            <div className="coupon">
                              <span className="coupon-title">{data.sanityPages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityPages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityPages.coupon.coupontext}</span>
                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
                            <h2>Schedule Service</h2>  
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
                    fluid={data.sanityPages.headerimage.asset.fluid} className="leftImage">

                </Image>
                </div>
                </div>
                <div className="column2 column">
                <div className="column-inner">
                    <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> Providing Same Day Service {cityplace}</div>
                    <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>{citytitle} Best {data.sanityPages.pagetitle} Technicians</h1>
                    <PortableText style={{color: data.sanityCompanyInfo.primarycolor.hex}} blocks={data.sanityPages._rawPageIntro} />

                    <div className="schedule-btn">
                        <a onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}} >Schedule Today for {data.sanityPages.coupon.title + " " +data.sanityPages.coupon.type} <FaArrowRight /></a>
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
                    <div className="coupon">
                        <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>
                        <div className="couponOffer">{data.sanityPages.coupon.title}</div>
                        <div className="couponType">{data.sanityPages.coupon.type}</div>
                        <p className="couponInfo">{data.sanityPages.coupon.coupontext}</p>
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
                        <PortableText blocks={data.sanityPages._rawFirstcopy} />

                        </div>
                    </div>
                    <div className="column2 column">
                        <div className="column-inner">
                        <Image 
                            style={{height: "100%"}}
                            fluid={data.sanityPages.serviceimage.asset.fluid}>
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