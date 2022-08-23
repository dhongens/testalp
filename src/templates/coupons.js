import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Form from "../components/form"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import Fade from 'react-reveal/Fade';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import $ from 'jquery';
import Image from 'gatsby-image'
import couponBackground from "../images/couponBackground.png"



function changeActive(){
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }



export const query = graphql`
    query couponsQuery{
        sanityPages(slug: {current: {eq: "coupons"}}) {
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
            gradientcolor1{
                hex
            }
            gradientcolor2{
                hex
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
              <div className="location" style={{color: data.sanityCompanyInfo.accentcolor.hex}}><FaMapMarkerAlt /> Providing Same Day Service in Rockwall</div>
              <h1 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Today's Special Offers</h1>
              <p style={{color: data.sanityCompanyInfo.primarycolor.hex}}>
                <PortableText blocks={data.sanityPages._rawPageIntro} />

              </p>
              <div className="schedule-btn">
              <a onClick={changeActive} style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Schedule Today for {data.sanityPages.coupon.title} <FaArrowRight /></a>

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
        <div className="coupon-form-section" style={{height: "100%", backgroundImage: "url(" + couponBackground + ")"}} >
        {/* <Fade bottom> */}
            <div className="inner">
                <div className="columns">
                <div className="column1 column">
                    <div className="column-inner">
                    <h2 className="couponUSP">Family Owned & Operated since 1998</h2>
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
        {/* </Fade> */}
    </div>
    </div>
    
  </Layout>
)

