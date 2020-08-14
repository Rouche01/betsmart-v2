import React from 'react';
import { Link } from 'gatsby';
import styles from './footer.module.scss';
import igIcon from '../../images/instagram.svg';
import fbIcon from '../../images/facebook.svg';
import twIcon from '../../images/twitter.svg';

const footer = ({bgType}) => {
  let colorStyle = {},
  linkStyle = {}

  if(bgType === 'dark') {
    colorStyle = {
      backgroundColor: '#333',
      color: '#fff'
    }
    linkStyle = {
      color: '#fff'
    }
  } else {
    colorStyle = {
      backgroundColor: '#fff',
      color: '#333'
    }
    linkStyle = {
      color: '#333'
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
              <a href="https://facebook.com"><img src={fbIcon} alt="facebook icon"/></a>
            </li>
            <li className="mx-3 mx-md-0 mr-0 mr-md-3">
              <a href="https://instagram.com"><img src={igIcon} alt="instagram icon" /></a>
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
        <div className={styles.subForm}>
          <input type="email" className="form-control form-control-lg" placeholder="Your email" />
          <button className="btn btn-lg">Subscribe</button>
        </div>
        <input type="checkbox" name="agreement" id="agreement" className="mr-2 mt-2" />
        <label className="mt-2" for="agreement">I Agree to the Privacy Policy</label>
      </div>
    </div>
  );
}

export default footer;