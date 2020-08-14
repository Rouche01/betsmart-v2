import React from 'react';
import styles from './contact.module.scss';
import Layout from '../component/layout';
import Input from '../component/input/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelopeOpen, faMap } from '@fortawesome/free-solid-svg-icons';
import SEO from '../component/seo';


const contact = (props) => {
  return (
    <Layout>
      <SEO title="Contact Us" />
      <div className={styles.contactHero}>

      </div>

      <div className={styles.contactSection}>
        <div className="row">
          <div className="col-md-5 offset-md-1">
            <div className={styles.formWrapper}>
              <h2>Drop a Message</h2>
              <form className="mt-4">
                <Input type="text" placeholder="FullName*" nameAttr="fullname" id="fullname" />
                <Input type="email" placeholder="Email*" nameAttr="email" id="email" />
                <Input type="number" placeholder="Phone*" nameAttr="phone" id="phone" />
                <Input type="text" placeholder="Subject*" nameAttr="subject" id="subject" />
                <textarea placeholder="Message*" name="message" id="subject" />
                <input type="submit" className="mt-4" value="Send now" />
              </form>
            </div>
          </div>
          <div className={['col-md-5', 'mt-5', 'pl-md-5', 'pl-0', styles.contactInfo].join(' ')}>
            <h3>For Billing Issues</h3>
            <p>billing@betsmart.com.ng</p>
            <h3 className="mt-5">General Contact</h3>
            <div>
              <p><FontAwesomeIcon color="#FF9900" className="mr-3 d-none d-md-inline-block" icon={faPhoneAlt} />+234 901 765 6561</p>
            </div>
            <div>
              <p><FontAwesomeIcon color="#FF9900" className="mr-3 d-none d-md-inline-block" icon={faEnvelopeOpen} />support@betsmart.com.ng</p>
            </div>
            <div className="d-md-flex d-block align-content-start">
              <FontAwesomeIcon color="#FF9900" className={["mr-3", "d-none", "d-md-inline-block", styles.locationIcon].join(' ')} icon={faMap} />
              <p> 13, Engineer Ogunduyile Str.<br/>Off Thomas Estate, Ajah<br/>Lagos, Lagos State.</p>
            </div>
          </div>
          <div className="container">
            <hr />
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default contact;