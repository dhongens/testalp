import React from "react"
import $ from "jquery"
import { StaticQuery, graphql } from "gatsby"
import { FaTimesCircle, FaEnvelope, FaPhone } from 'react-icons/fa'
import Image from "gatsby-image"


//Setting Form Message
const FormMessage = props => {
  let message = 'Thank you for your submission, we will be with you shortly.';
  let style = {};
  if(props.submitted){
    message = 'Thank you for your submission, we will be with you shortly.';
    style.display = 'block';
  }
  return (
    <p className="form-message" style={style}>
      {message}
      <FaEnvelope />
    </p>
  );
};


export default class ContactForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    
    this.state = {
      name: "",
      honeypot: "",
      tel: "",
      message: "",
      vsref: "",
      gclid: "",
      submitted: false,
      formAction: 'https://metrics.vitalstorm.com/email_form_submission/xxx/'
    };
  }
  componentDidMount() {
    // Move gclid extraction here
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const gclid = urlParams.get("gclid") || "";
      this.setState({ gclid }); // Update the gclid state
    }
  
    // Check for the existence of "number_rewrite" and wait if necessary
    this.waitForVsrefElement();
  }
  
  waitForVsrefElement() {
    const vsrefElement = document.getElementById("number_rewrite");
  
    const updateVsrefState = () => {
      const phone = vsrefElement.innerHTML;
      const vsref = phone.replace(/-/g, "");
      this.setState({ vsref }); // Update the vsref state
    };
  
    if (vsrefElement) {
      // If the element is found, extract vsref and update the state
      updateVsrefState();
  
      // Use a MutationObserver to watch for changes and update the state accordingly
      const observer = new MutationObserver(updateVsrefState);
      observer.observe(vsrefElement, { childList: true, characterData: true, subtree: true });
    } else {
      // If the element is not found, wait and check again after a delay
      setTimeout(this.waitForVsrefElement, 100); // Adjust the timeout as needed
    }
  }
    
  
  handleInputChange(event){
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }
  
  changeActive(event){
    $(".form").toggleClass("expanded");
    $("body").toggleClass("formExpanded");
  }
  handleSubmit(event){
    event.preventDefault();
    //phone number validation
    var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var phoneinput = document.getElementById('mail-tel');
    
    //email validation
    const emailvalidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var emailinput = document.getElementById('mail-emailfield');
    var emailinputValue = emailinput.value;
    
    var emailerrormsg = document.createElement("p");
    emailerrormsg.classList.add('form-error-text');
    emailerrormsg.innerHTML = "Wrong Email Format, please check and fix before submitting";

    function emailIsValid (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    var honeypotfield = document.getElementById("mail-honeyfield");

    if(honeypotfield.value !== ''){
      event.preventDefault();
      alert("Please do not fill in the hidden field.");
    }

    else if (/*phoneinput.value.match(phoneno) &&*/ emailIsValid(emailinputValue)){
      const elements = document.getElementsByClassName('form-error-text-shown');

      emailinput.classList.remove('form-error'); 
      // emailerrormsg.classList.remove('form-error-text-shown');

      
      while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
      }
      $("#mail-submit").prop('disabled', true);
      const fieldData = new URLSearchParams({
        name: this.state.name,
        honeypot: this.state.honeypot,
        message: this.state.message,
        tel: this.state.tel,
        // city: this.state.city,
        // zipcode: this.state.zipcode,
        vsref: this.state.vsref,
        gclid: this.state.gclid,
        });
        $.ajax({
          type: "POST",
           url: this.state.formAction,
           data:  fieldData.toString(), // serializes the form's elements.
           success: data => {
              this.setState({
                name: "",
                honeypot: "",
                tel: "",
                // city: "",
                // zipcode: "",
                message: "",
                vsref: "",
                gclid: "",
                submitted: true
              });
              window.location.href = "/thank-you/"

           }
          })
    } else if (emailIsValid(emailinputValue) == false){
      emailinput.parentNode.insertBefore(emailerrormsg, emailinput.nextSibling);
      emailinput.classList.add('form-error');
      emailerrormsg.classList.add('form-error-text-shown');
      emailinput.focus();
      console.log('wrong email');
    }    
  }  
   render() {
    
    return (
      <>
      <StaticQuery
          query={graphql`
              query coupon_formquery($slug: String) {
                sanityCompanyInfo {
                  companyname
                  phone
                  companyTagline
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
                  formhash
                }
                sanityPages(slug: {current: {eq:$slug}}){
                  slug{
                    current
                  }
                  coupon {
                    title
                    type
                    coupontext
                  }
                }
              }
            `}
                 render={data => (
                   <>
                   <div className="coupon_form">                   
                      <form ref={this.formRef} id="form-metrics" onSubmit={this.handleSubmit} action={this.state.formAction} method="POST">
                        <input id="mail-name" className="inputfield" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                        <input id="mail-emailfield" className="inputfield" type="text" name="honeypot" value={this.state.honeypot} onChange={this.handleInputChange} placeholder="Email address" minLength="3" maxLength="64" required />
                        <input id="mail-honeyfield" className="inputfield" type="text" name="email" />
                        <input id="mail-tel" className="inputfield" name="tel" value={this.state.tel} pattern="^\d{10}$" type="tel" onChange={this.handleInputChange} placeholder="Phone Number (Format: 1234567890)" required />
                        <input id="mail-message" className="inputfield" type="text" value={this.state.message} onChange={this.handleInputChange} name="message" placeholder="Request a service" required />
                        <input type="hidden" name="gclid" value={this.state.gclid} />
                        <input type="hidden" name="vsref" value={this.state.vsref} />
                        <div className="ajax-button">
                            <button id="mail-submit" type="submit" name="mail-submit" style={{background: "linear-gradient( to right,"+ data.sanityCompanyInfo.gradientcolor1.hex + ","+ data.sanityCompanyInfo.gradientcolor2.hex +")"}}>Request Service</button>
                        </div>
                        <FormMessage submitted={this.state.submitted} />
                      </form>
                      </div>
                    </>
                  )}  
              />
      </>
    )
  }
}
