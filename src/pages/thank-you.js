import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Helmet from 'react-helmet'
import SocialProof from '../components/socialProof';
import Fade from 'react-reveal/Fade';
import PortableText from '@sanity/block-content-to-react'
import { FaArrowRight, FaAngleRight, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import Image from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import QuoteIcon from "../images/quote-left-solid.png"
import thankyouImg from "../images/van.png"
import $ from 'jquery';
import { Player, Controls } from '@lottiefiles/react-lottie-player';




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

  }

export const query = graphql`
    query thankyouQuery{
        sanityPages(slug: {current: {eq: "home"}}) {
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
                        srcWebp
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
                rgb{
                    a
                    r
                    g
                    b
                }
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
            favicon{
                asset{
                  fluid{
                    ...GatsbySanityImageFluid
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
    <div className="thankyoupage">
          <div className="row">
              <div className="columns">
                  <div className="column column1">
                      <h1>Thank you</h1>
                      <p>Your form submission has been submitted succesfully! We appreciate your interest in our services and we'll get back to you as soon as possible!</p>
                      <p>Our team is committed to providing high-quality home services that meet your needs and exceed your expectations. If you have any questions in the meantime, don't hesitate to contact us directly. We look forward to serving you!</p>
                      <a href="/" className="buttonstyle" style={{background: "linear-gradient(to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Go Back</a>
                  </div>
                  <div className="column column2">
                      <img src={thankyouImg} />
                  </div>
              </div>
        </div>
    </div>
    
    

    
  </Layout>
)