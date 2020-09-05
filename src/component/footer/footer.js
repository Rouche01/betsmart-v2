import React, { useState } from 'react';
import { Link } from 'gatsby';
import $ from 'jquery';
import styles from './footer.module.scss';
import igIcon from '../../images/instagram.svg';
import fbIcon from '../../images/facebook.svg';
import twIcon from '../../images/twitter.svg';

const Footer = ({bgType}) => {
  const [subscriberEmail, setSubscriberEmail] = useState();
  const [formStatus, setFormStatus] = useState();
  const [loadingState, setLoadingState] = useState(false);

  let colorStyle = {},
  linkStyle = {},
  privacyLink = {}

  if(bgType === 'dark') {
    colorStyle = {
      backgroundColor: '#333',
      color: '#fff'
    }
    linkStyle = {
      color: '#fff'
    }
    privacyLink = {
      color: '#fff',
      textDecoration: 'underline'
    }
  } else {
    colorStyle = {
      backgroundColor: '#fff',
      color: '#333'
    }
    linkStyle = {
      color: '#333'
    }
    privacyLink = {
      color: '#333',
      textDecoration: 'underline'
    }
  }

  const inputChange = (e) => {
    setSubscriberEmail(e.target.value);
  }

  const addToMailingList = (e) => {
    e.preventDefault();
    let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const url = `https://betsmart.us17.list-manage.com/subscribe/post-json?u=f7b9d825296b4a41bba8f6876&amp;id=fa61327c16&c=?`;

    const data = {
      email: subscriberEmail
    }

    const agreeCheck = document.getElementById('agreement');
    if(!subscriberEmail) {
      setFormStatus('The email field is empty');
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);

    } else if(!subscriberEmail.match(validMail)) {
      setFormStatus('This is an invalid email address');
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    } else if(subscriberEmail.match(validMail) && agreeCheck.checked ) {
      console.log('works');
      setLoadingState(true);
      $.ajax({
        type: "POST",
        url: url,
        data: $('#mc-embedded-subscribe-form').serialize(),
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: (error) => {
          setLoadingState(false);
          // console.log('Error', error);
          setFormStatus('Unable to subscribe, try again');
          setTimeout(() => {
            setFormStatus(null);
          }, 3000);
        },
        success: (res) => {
          setLoadingState(false);
          // console.log('success');
          document.getElementById('mc-embedded-subscribe-form').reset();
          setFormStatus('You are successfully subscribed to our mailing list');
          setTimeout(() => {
            setFormStatus(null);
          }, 3000);
        }
      })
    } else if(!agreeCheck.checked) {
      setFormStatus('Please tick the agreement checkbox');
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }
  }

  return (
    <div className={[styles.footer, 'row'].join(' ')} style={colorStyle}>
      <div className={[styles.socials, 'col-md-3', 'mb-4', 'mb-md-0', 'offset-md-1', 'order-md-1', 'order-3'].join(' ')}>
        <h4>Join us on</h4>
        <ul>
            <li className="mx-3 mx-md-0 mr-0 mr-md-3">
              <a href="https://twitter.com"><img src={twIcon} alt="twitter icon"/></a>
            </li>
            <li className="mx-3 mx-md-0 mr-0 mr-md-3">
              <a href="https://www.facebook.com/betsmartNG/"><img src={fbIcon} alt="facebook icon"/></a>
            </li>
            <li className="mx-3 mx-md-0 mr-0 mr-md-3">
              <a href="https://www.instagram.com/betsmart_ng/"><img src={igIcon} alt="instagram icon" /></a>
            </li>
        </ul>
        <p>Betsmart, Copyright &copy; 2020</p>
      </div>
      <div className={[styles.footerLinks, 'col-md-3', 'mb-4', 'mb-md-0', 'order-md-2', 'order-2'].join(' ')}>
        <h4>Information</h4>
        <ul>
          <li><Link to="/contact" style={linkStyle}>Contact / Support</Link></li>
          <li><Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link></li>
          <li><Link to="/terms-conditions" style={linkStyle}>Terms + Conditions</Link></li>
        </ul>
      </div>
      <div className={[styles.newsletter, 'col-md-4', 'mb-4', 'mb-md-0', 'order-1', 'order-md-3'].join(' ')}>
        <h4>Subscribe Newsletter</h4>
        <div className={styles.formGroup}>
          { formStatus && <p className={styles.formStatus} style={{color: '#FF9900'}}>{formStatus}</p>}
          <form className={styles.subForm} id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" noValidate>
            <input onChange={inputChange} name="EMAIL" id="mce-EMAIL" type="email" className="form-control form-control-lg" placeholder="Your email" />
            <button onClick={addToMailingList} className="btn btn-lg">Subscribe
              <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
            </button>
          </form>
        </div>
        <input type="checkbox" name="agreement" id="agreement" className="mr-2 mt-2" />
        <label className="mt-2" htmlFor="agreement">I Agree to the <Link to='/privacy-policy' style={privacyLink} >Privacy Policy</Link></label>
      </div>
    </div>
  );
}

export default Footer;