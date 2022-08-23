import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Van from "../images/van.png"

import Fade from 'react-reveal/Fade';



export default () => (
    <StaticQuery query={ graphql`
        query SocialProofquery($slug: String) {
            sanityPages(slug: {current: {eq: $slug}}) {
                pagetitle
                slug{
                  current
                }
                coupon{
                  title
                  type
                }
                serviceimage{
                    asset{
                        fluid(maxWidth: 1920){
                            ...GatsbySanityImageFluid
                            src
                        }
                    }
                }
                headerimage{
                    asset{
                        fluid(maxWidth: 1920){
                            ...GatsbySanityImageFluid
                            src
                        }
                    }
                }
            }
            sanityCompanyInfo {
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
                socialproof{
                    number
                    socialprooftype
                }
            }
        }
    `}
    
    
    render={ data => (
        <div className="socialProofSection">
            <div className="inner">
                {/* <Fade bottom cascade> */}
                <div className="left-items" style={{background: "linear-gradient( to top,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>
                    {data.sanityCompanyInfo.socialproof.map(( socialproof  => 
                        <div className="item">
                                <span className="number">{socialproof.number}</span><br />
                                <span>{socialproof.socialprooftype}</span>
                        </div>
                    ))}
                </div>
                    <div className="van-img">
                        <img src={Van} alt="" />
                    </div>
                {/* </Fade> */}
            </div>
        </div>
    )}
    />
    )
    