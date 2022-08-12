import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import Helmet from 'react-helmet'
import BackgroundImage from 'gatsby-background-image';
import SocialProof from '../components/socialProof';
import Fade from 'react-reveal/Fade';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import couponBackground from "../images/couponBackground.png"
import $ from 'jquery';


function changeActive(e){
    e.preventDefault();
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }

export const query = graphql`
    query ourServicesQuery{
        sanityPages(slug: {current: {eq: "our-services"}}) {
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
                            <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.7" +")"}}>
                             <div className="scheduleText" style={{color: data.sanityCompanyInfo.accentcolor.hex}}>Schedule Today For</div>

                              <span className="coupon-title">{data.sanityPages.coupon.title}</span>
                              <span className="coupon-type">{data.sanityPages.coupon.type}</span>
                              <span className="coupon-text">{data.sanityPages.coupon.coupontext}</span>
                        <p className="disclaimer">*Restrictions may apply. Call office for details.</p>

                            </div>
                          </div>

                        </div>
                        <div className="column2">
                          <div className="innerColumn">
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
        <Fade bottom>
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
              <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> Providing Same Day Service in Rockwall</div>
              <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Trustworthy Service when you need it</h1>
              <p style={{color: data.sanityCompanyInfo.primarycolor.hex}}>
                <PortableText blocks={data.sanityPages._rawPageIntro} />

              </p>
              <div className="schedule-btn">
                <a href="#" onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityPages.coupon.title} <FaArrowRight /></a>

              </div>
          </div>
        </div>
      </div>
    </div>
    </Fade>
        <div className="servicesSection">
            <div className="inner">
                <h2>Our Trusted Services</h2>
                <div className="columns">
                {data.allSanityOurservices.edges.map(({ node: services }) => (
                    <div className="column1 column">
                        <div className="column-inner">
                            <div className="service-icon" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex}}>
                                <img src={services.icon.asset.fluid.src} alt="" />
                            </div>
                            <h3>{services.servicemaintitle} Services</h3>
                            <ul>
                                {services.servicelist.map(item => (
                                    <li><a href={item.servicelink}>{item.servicename}</a></li>
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
                        <div className="schedule-btn"><a href="#" onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityPages.coupon.title} <FaArrowRight /></a></div>
                        </div>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + couponBackground + ")"}} >
        <Fade bottom>
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <div className="coupon" style={{backgroundColor: "rgba(" + data.sanityCompanyInfo.primarycolor.rgb.r +","+ data.sanityCompanyInfo.primarycolor.rgb.g +","+ data.sanityCompanyInfo.primarycolor.rgb.b +","+ "0.8" +")"}}>

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
                    <form action="">
                        <input type="text" placeholder="Name" name="" id="" />
                        <input type="email" placeholder="Email" name="" id="" />
                        <input type="tel" placeholder="Phone Number" name="" id="" />
                        <input type="text" placeholder="Service Requested" name="" id="" />
                        <input type="submit" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}} value="Request Service" />

                    </form>
                    </div>
                </div>
                </div>
            </div>
        </Fade>
    </div>
  </Layout>
)