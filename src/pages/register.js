import React, {useState, useEffect} from 'react';
import { Link } from 'gatsby';
import Logo from '../images/Betsmart-Logo.png';
import LogoAlt from '../images/Betsmart-Logo-White.png';
import Amplify, { Auth, API } from 'aws-amplify';
import { isLoggedIn } from '../utils/auth';
import { navigate } from '@reach/router';
import awsconfig from '../aws-exports';
import styles from './register.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';
Amplify.configure(awsconfig);

const Register = (props) => {
  useEffect(() => {
    if(isLoggedIn()) {
      navigate('/app/dashboard');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pricingPlan, setPricingPlan] = useState('');
  // const [confirmationCode, setConfirmationCode] = useState('');
  // const [signupStage, setSignupStage] = useState(0);
  const [registerError, setRegisterError] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    const getWindowSize = window.innerWidth;
    setWindowSize(getWindowSize);
  }, []);

  const inputChange = (e) => {
    switch(e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'fname':
        setFName(e.target.value);
        break;
      case 'lname':
        setLName(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'pricing-plan':
        setPricingPlan(e.target.options[e.target.selectedIndex].value);
        break;
      // case 'confirmation-code':
      //   setConfirmationCode(e.target.value);
      //   break;
      default:
        break;
    }
  }

  const redirectToCheckout = async(customerEmail, plan) => {
    const fetchSession = async(customerEmail, plan) => {
      console.log('works');
      const apiName = 'subscription';
      const apiEndpoint = '/checkout';
      const body = {
        email: customerEmail,
        plan: plan
      };
      const session = await API.post(apiName, apiEndpoint, { body });
      return session;
    }
    const session = await fetchSession(customerEmail, plan);
    return session;
  }

  async function signUp(aEmail, aFName, aLName, aPassword, aPhone, aPricingPlan)  {
    setLoadingState(true);
    try {
      await Auth.signUp({username: aEmail, password: aPassword, attributes: { email: aEmail, phone_number: aPhone, given_name: aFName, family_name: aLName, gender: 'rather not say', 'custom:user-type': aPricingPlan} })
      // setSignupStage(1);
      const paymentLink = await redirectToCheckout(aEmail, aPricingPlan);
      console.log('Working');
      setLoadingState(false);
      setRegisterError('');
      navigate(paymentLink.data.authorization_url);
    } catch(error) {
      setRegisterError(error.message);
      console.log('There was an error signing up', error);
      setLoadingState(false);
    }
  }

  // const confirmSignup = async(username, authCode, plan) => {
  //   setLoadingState(true);
  //   try {
  //     await Auth.confirmSignUp(username, authCode);
  //     // navigate('/login');
  //     const paymentLink = await redirectToCheckout(username, plan);
  //     setLoadingState(false);
  //     setRegisterError('');
  //     console.log(paymentLink.data.authorization_url);
  //     navigate(paymentLink.data.authorization_url);
  //   } catch(err) {
  //     console.log('error in confirmation', err);
  //     setRegisterError(err.message);
  //     setLoadingState(false);
  //   }
  // }

  const onSubmit = (e) => {
    e.preventDefault();

    let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let fields = {email, fName, lName, password, phone, pricingPlan};
    const errorsInit = {}
    for(const key in fields) {
      if(!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if(fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "Email is invalid";
      }
      if(fields.password && fields.password.length < 6) {
        errorsInit.password = "Password must be at least 6 characters"
      }
      if(fields.pricingPlan === 'choose plan') {
        errorsInit.pricingPlan = "Please choose a valid plan"
      }
    }

    setValidationErrors(errorsInit);

    if(Object.entries(errorsInit).length === 0) {
      const numberArr = phone.split('');
      const convertedPhone = `+234${numberArr.splice(1).join('')}`;
      signUp(email, fName, lName, password, convertedPhone, pricingPlan);
    }

    // console.log(validationErrors);
    // fields = {};
  }

  // const handleConfirmation = e => {
  //   // console.log('works');
  //   e.preventDefault();
  //   confirmSignup(email, confirmationCode, pricingPlan);
  // }

  return(
    <React.Fragment>
      <SEO title="Register" />
      <div className={styles.registerContainer}>
        <div className="row">
          <div className={["col-md-7", styles.bleedImage].join(' ')}>
            
          </div>
          <div className="col-md-5">
            <div className={styles.registerForm}>
              <Link to="/"><img src={ windowSize > 500 ? Logo : LogoAlt } alt="Betsmart logo" /></Link>
              <h3 className="mt-5">Create Your Account</h3>
              <form className="mt-4">
                { registerError && <p className={styles.registerError}>{registerError}</p>}
                <React.Fragment>
                  <Input type="email" nameAttr="email" label="Email Address" id="email" 
                    changed={inputChange} error={validationErrors.email} />
                  <Input type="text" nameAttr="fname" label="First Name" id="fname" 
                    changed={inputChange} error={validationErrors.fName} />
                  <Input type="text" nameAttr="lname" label="Last Name" id="lname" 
                    changed={inputChange} error={validationErrors.lName} />
                  <Input type="password" nameAttr="password" label="Password" id="password" 
                    changed={inputChange} error={validationErrors.password} />
                  <Input type="number" nameAttr="phone" label="Phone" id="phone" 
                    changed={inputChange} error={validationErrors.phone} />
                  <div className={styles.selectInput}>
                    <label htmlFor="pricing-plan">Pricing Plan</label>
                    <select id="pricing-plan" onChange={inputChange} >
                      <option value="" selected disabled hidden>Choose Your Plan</option>
                      <option value="single">Single Plan (N3,000 monthly)</option>
                      <option value="combo">Combo Plan (N7,000 quarterly)</option>
                    </select>
                    { validationErrors.pricingPlan && <small>{validationErrors.pricingPlan}</small>}
                  </div>
                  <button onClick={onSubmit} >Register
                    <span className={loadingState ? [styles.isLoading, styles.btnRegLoader].join(' ') : styles.btnRegLoader}><i>Loading...</i></span>
                  </button>
                  <p className="mt-3" >Have an account? <Link to="/login">Log in</Link></p>
                </React.Fragment>
                {/* { signupStage === 1 && <React.Fragment>
                  <h5 className="font-weight-bold mb-4">Check your email for your confirmation code!</h5>
                  <Input type="text" nameAttr="confirmation-code" label="Confirmation Code" id="confirmation-code"
                    changed={inputChange} />
                  <button onClick={handleConfirmation}>Confirm
                    <span className={loadingState ? [styles.isLoading, styles.btnRegLoader].join(' ') : styles.btnRegLoader}><i>Loading...</i></span>
                  </button>
                </React.Fragment>} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;