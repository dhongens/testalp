import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
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



function changeActive(){
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }

export const query = graphql`
    query pageQuery{
        sanityPages(slug: {current: {eq: "about-us"}}) {
            pagetitle
            pagetype{
                pagetype
            }
            slug {
                current
            }
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
                            <span className="closeForm" onClick={changeActive}><FaTimes /></span>

                            <div className="coupon" style={{borderColor: data.sanityCompanyInfo.accentcolor.hex}}>
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
              <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Rockwall's Best Plumbing Technicians</h1>
              <p style={{color: data.sanityCompanyInfo.primarycolor.hex}}>
                <PortableText blocks={data.sanityPages._rawPageIntro} />

              </p>
              <div className="schedule-btn">
                <a href="#" onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for $20 Off Toilet Repair <FaArrowRight /></a>
              </div>
          </div>
        </div>
      </div>
    </div>
    </Fade>
        <div className="uspSection">
            <div className="inner">
                <h2 className="uspTitle">Count on Plumbit for all of your home service needs!</h2>
                <Fade bottom cascade>
                <div className="uspColumns">
                {data.allSanityThreeservices.edges.map(( {node: service})  => 

                        <div className="column1 column">
                        <div className="column-inner">
                            <div className="icon" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex}}><img style={{width: '20px'}} src={service.icon.asset.fluid.src}/></div>
                            <h3 className="serviceTitle">{service.servicetitle} Services</h3>
                            <p>{service.servicetext}</p>
                            <a href={service.servicelink} className="serviceLink" style={{color: data.sanityCompanyInfo.secondarycolor.hex}}>Go to {service.servicetitle} Page <FaAngleRight /></a>
                        </div>
                    </div>
                    )}
                </div>
                    </Fade>
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
                        <div className="schedule-btn"><a onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule today for $20 off plumbing repairs <FaArrowRight /></a></div>
                        </div>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
        <div className="reviewsSection">
        <Fade bottom cascade>

            <div className="inner">
                <h2>What our customers say</h2>
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
                    <a href="/reviews/" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}} class="buttonstyle">See More Reviews</a>
                </div>
            </div>
            </Fade>
        </div>
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
                    <form action="">
                        <input type="text" placeholder="Name" name="" id="" />
                        <input type="email" placeholder="Email" name="" id="" />
                        <input type="tel" placeholder="Phone Number" name="" id="" />
                        <input type="text" placeholder="Service Requested" name="" id="" />
                        <input type="submit" value="Request Service" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </Fade>
    </div>

    
  </Layout>
)