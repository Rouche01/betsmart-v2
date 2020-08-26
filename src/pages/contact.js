import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from 'aws-amplify';
import Notifications, {notify} from 'react-notify-toast';
import styles from './contact.module.scss';
import { navigate } from '@reach/router';
import { isLoggedIn } from '../utils/auth'
import Layout from '../component/layout';
import Input from '../component/input/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelopeOpen, faMap } from '@fortawesome/free-solid-svg-icons';
import SEO from '../component/seo';


const Contact = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState({});

  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });

  const inputChange = (e) => {
    e.preventDefault();
    switch(e.target.id) {
      case 'fullname':
        setFullName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'subject':
        setSubject(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: {ok, msg}
    });
    if(ok) {
      form.reset();
    }
  };

  useEffect(() => {
    if(isLoggedIn()) {
      navigate('/app/dashboard');
    }
  }, [])

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const contactFields = {
      fullName: fullName,
      email: email,
      phone: phone,
      subject: subject,
      message: message
    }

    let errorInit = {};

    for(let key in contactFields) {
      if(!contactFields[key]) {
        errorInit[key] = 'This field is required';
      }
    }

    setValidationError(errorInit);
    // console.log(errorInit);

    if(Object.entries(errorInit).length === 0) {
      console.log('works');
      const form = e.target;
      setServerState({ submitting: true });
      axios({
        method: "post",
        url: "https://cors-anywhere.herokuapp.com/https://getform.io/f/396c6a8e-18a7-4f2e-a89d-f8130a3768b1",
        data: new FormData(form)
      })
        .then(r => {
          handleServerResponse(true, "We've received your message and we will be in touch soon", form);
          notify.show("We've received your message and we will be in touch soon", 'success');
          // console.log(r);
        })
        .catch(r => {
          handleServerResponse(false, r, form);
          notify.show("There was an error submitting the form, please try again", 'error');
          // console.log(r);
        });
    }
  }

  const redirectToCheckout = async() => {
    const fetchSession = async() => {
      const apiName = 'subscription';
      const apiEndpoint = '/checkout';
      const body = {
        email: 'richardemate@gmail.comc'
      };
      const session = await API.post(apiName, apiEndpoint, { body });
      return session;
    }
    const session = await fetchSession();
    console.log(session);
  }

  return (
    <Layout>
      <Notifications options={{zIndex: 200, top: '20px'}} />
      <SEO title="Contact Us" />
      <div className={styles.contactHero}>

      </div>

      <div className={styles.contactSection}>
        <div className="row">
          <div className="col-md-5 offset-md-1">
            <div className={styles.formWrapper}>
              <h2>Drop a Message</h2>
              <form onSubmit={handleFormSubmit} className="mt-4">
                <Input type="text" changed={inputChange} placeholder="FullName*" nameAttr="fullname"
                  id="fullname" error={validationError.fullName} />
                <Input type="email" changed={inputChange} placeholder="Email*" nameAttr="email" 
                  id="email" error={validationError.email} />
                <Input type="number" changed={inputChange} placeholder="Phone*" nameAttr="phone" 
                  id="phone" error={validationError.phone} />
                <Input type="text" changed={inputChange} placeholder="Subject*" nameAttr="subject"
                  id="subject" error={validationError.subject} />
                <div>
                  <textarea placeholder="Message*" onChange={inputChange} name="message" id="message" />
                  { validationError.message && <small className={styles.small}>{validationError.message}</small> }
                </div>
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
            <button onClick={redirectToCheckout}>Test paystack checkout</button>
          </div>
          <div className="container">
            <hr />
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Contact;