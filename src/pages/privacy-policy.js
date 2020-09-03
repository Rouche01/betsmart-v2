import React from 'react';
import styles from './termsPlusPrivacy.module.scss';
import Header from '../component/header/header';

const PrivacyPolicy = (props) => {
  return(
    <React.Fragment>
      <Header />
      <div className={styles.hero}>

      </div>
      <div className={styles.termsPlusConditions}>
        <h2>Privacy Policy</h2>
        <div className={styles.subTopic}>
          <p>The information that you send to us will be processed in accordance with our Privacy Policy. You hereby acknowledge and consent to Betsmart.com.ng processing your personal data for the purposes of allowing you to access and use the website.</p>
          <p>Betsmart.com.ng will also process your personal data for the purposes of carrying out verification procedure in relation to your use of the services provided on the website.</p>
          <p>You agree to indemnify us and hold us harmless of the release of any personal data pursuant to our Privacy Policy. This Privacy Policy describes the way in which the company deal with the information and data you provide to us to enable us to manage your relationship with us.</p>
          <p>We will process any personal information provided to us via the website using the registration form. By submitting your information to us and using the website you confirm your consent to the use of your personal information as set out in this Privacy Policy. If you do not agree with the terms of this Privacy Policy please do not use the Website or otherwise provide us with your personal information.</p>
          <p>Your personal data will not be disclosed to third parties, unless such disclosure is necessary for processing of your request, such as effecting transactions on your Betsmart.com.ng account or to carry verification procedures.</p>
        </div>
        <div className={styles.subTopic}>
          <h3>How Information Collected Is Used</h3>
          <p>The information and data about you which we may collect, use and process includes the following:</p>
          <ol>
            <li>Information that you provide to us by filling in the forms on the Website or any other information you submit to us via the website or email.</li><br/>
            <li>Records of correspondence received via the website, email & telephone.</li><br/>
            <li>Your responses to surveys or customer research that we carry out from time to time.</li><br/>
            <li>Details of the transactions you carry out with us via the website, telephone or other means.</li><br/>
            <li>Details of your visits to the website including, but not limited to, location data, weblogs and other communication data.</li><br/>
            <li>We may use your personal information and data together with other information for the purposes of processing your transactions, including card and on-line payments, setting up, operating and managing your account, complying with our legal and regulatory duties, building up personal profiles, carrying out customer research, surveys and analyses.</li><br/>
            <li>Regularly providing you with information about promotional offers, products and services.</li><br/>
          </ol>
        </div>
        <div className={styles.subTopic}>
          <h3>Information Storage</h3>
          <p>We will take all reasonable steps to ensure that your information is secured and protected. We will only disclose personal information to other companies within associated or subsidiary companies and to business partners, successors in title to our business and suppliers that are engaged to process such information on our behalf. If you apply for an account with us then to help us make credit decisions about you, to prevent fraud, to check your age and identity and to prevent money laundering, we may use third parties including credit reference agencies who will record any searches on your file. We may also make inquiries of, and disclose details of how you conduct your account to such agencies, security organizations and any other relevant third parties for fraud and money laundering prevention.</p>
        </div>
        <div className={styles.subTopic}>
          <h3>Telephone Calls</h3>
          <p>Telephone calls to and from our Customer Contact Centre are recorded for training and security purposes along with the resolution of any queries arising from the service you receive.</p>
        </div>
        <div className={styles.subTopic}>
          <h3>Use of Cookies</h3>
          <p>In order to make your visit to the Website more user-friendly, to keep track of visits and to improve the service, the company collects a small piece of information sent from your browser, called a cookie. If you register with us or if you continue to use the website you agree to our use of cookies. We will take all reasonable steps to ensure that your information and data is treated securely and in accordance with this Privacy Policy.</p>
        </div>
        <div className={styles.subTopic}>
          <h3>Disclosure of Information</h3>
          <p>We are entitled to share the information we hold of you which includes personal data  with the regulatory bodies, sporting bodies and other bodies, including the police, in order to investigate fraud, money laundering or sports integrity issues and to comply with our regulatory duties. In the processing of your Betsmart.com.ng account and associated transactions, the company have recourse to credit rating agencies, fraud detection agencies, anti-money laundering agencies who may keep record of your information. You hereby consent to such disclosures. All such information will be held in accordance with this Privacy Policy.</p>
        </div>
        <div className={styles.subTopic}>
          <h3>Changes to our Privacy Policy</h3>
          <p>Any changes we may make to our Privacy Policy in the future will be posted on this page and any such changes will become effective upon posting of the revised Privacy Policy. If we make any material or substantial changes to this Privacy Policy we will endeavor to inform you by email, notice on the website or other agreed communications channels.</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PrivacyPolicy;