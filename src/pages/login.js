import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import Notifications, {notify} from 'react-notify-toast';
import { setUser, isLoggedIn } from '../utils/auth';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import styles from './login.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';
import Logo from '../images/Betsmart-Logo.png';
import LogoAlt from '../images/Betsmart-Logo-White.png';
Amplify.configure(awsconfig);

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [windowSize, setWindowSize] = useState();
  const [forgetPwd, setForgetPwd] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [resetEmail, setResetEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    const getWindowSize = window.innerWidth;
    setWindowSize(getWindowSize);
  }, []);

  useEffect(() => {
    if(isLoggedIn()) {
      navigate('/app/dashboard');
    }
  }, [])

  const inputChange = e => {
    switch(e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'reset-email':
        setResetEmail(e.target.value);
        break;
      case 'reset-code':
        setConfirmCode(e.target.value);
        break;
      case 'new-password':
        setNewPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const signIn = async(aEmail, aPassword) => {
    setLoadingState(true);
    try {
      await Auth.signIn(aEmail, aPassword);
      const user = await Auth.currentAuthenticatedUser();
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      setUser(userInfo);
      // console.log(userInfo);
      setLoadingState(false);
      navigate('/app/dashboard');
    } catch(err) {
      console.log(err, 'error signing in');
      setLoginError(err.message);
      setLoadingState(false);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const fields = {email, password};
    
    let errorsInit = {}
    for(const key in fields) {
      if(!fields[key]) {
        errorsInit[key] = "This field is required";
      }
      if(fields.email && !fields.email.match(validMail)) {
        errorsInit.email = "This email is invalid";
      }
      if(fields.password && fields.password.length < 8) {
        errorsInit.password = "Password must be at least 8 characters";
      }
    }

    setValidationErrors(errorsInit);
    // console.log(validationErrors);
    if(Object.entries(errorsInit).length === 0) {
      signIn(email, password);
    }
  }

  const handlePasswordReset = () => {
    setForgetPwd(true);
  }

  const passwordResetHandler = async() => {
    setLoadingState(true)
    if(resetEmail) {
      try {
        console.log(resetEmail);
        await Auth.forgotPassword(resetEmail);
        setLoginError(null);
        setLoadingState(false);
        setConfirmReset(true);
      } catch(err) {
        setLoginError(err.message);
        setLoadingState(false);
      }
    } else {
      setLoginError('This field is required');
      setLoadingState(false);
    }
  }

  const confirmPasswordReset = async() => {
    console.log('works');
    setLoadingState(true);
    try {
      await Auth.forgotPasswordSubmit(resetEmail, confirmCode, newPassword);
      setLoadingState(false);
      setConfirmReset(false);
      setForgetPwd(false);
      notify.show("Password updated successfully!", "success");
    } catch(err) {
      setLoadingState(false);
      const errMsg = err.message.split(':');
      const msgIdx = errMsg.length - 1;
      notify.show(`Unable to reset password, ${errMsg[msgIdx]}`, "error");
    }
  }

  const resendCode = async() => {
    try {
      await Auth.forgotPassword(resetEmail);
      notify.show("A new confirmation code has been sent to your email", "success");
    } catch(err) {
      notify.show("Unable to send a confirmation code, try again", "error");
    }
  }

  return(
    <React.Fragment>
      <SEO title="Login" />
      <Notifications options={{zIndex: 200, top: '20px'}} />
      <div className={styles.loginContainer}>
        <div className="row">
          <div className={["col-md-4", 'order-md-1', 'order-2', styles.loginForm].join(' ')}>
            <Link to="/"><img src={windowSize > 500 ? Logo : LogoAlt} alt="Betsmart logo" /></Link>
            { !forgetPwd && <React.Fragment>
              <h3 className="mt-5">Welcome back, Log in</h3>
              <div className="mt-4">
                { loginError && <p className={styles.loginError}>{loginError}</p>}
                <Input type="email" nameAttr="email" label="Email Address" id="email" 
                  changed={inputChange} error={validationErrors.email} />
                <Input type="password" nameAttr="password" label="Password" id="password" 
                  changed={inputChange} error={validationErrors.password} />
                <button onClick={onSubmit} >Log in
                    <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                  </button>
                  <p onClick={handlePasswordReset} className={styles.forgotPwd}>Forgot Password?</p>
              </div>
              <p className="mt-3" >Don’t have an account? <Link to="/register">Register</Link></p>
            </React.Fragment>}
            { forgetPwd && <React.Fragment>
              <h3 className="mt-5">Reset your password</h3>
              { !confirmReset && <React.Fragment>
                <small className="mt-3">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</small>
                <div className="mt-4">
                  <Input type="email" className nameAttr="reset-email" label="Email Address" id="reset-email" 
                  changed={inputChange} error={loginError} />
                  <button onClick={passwordResetHandler} >Reset Password
                      <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                  </button>
                </div>
              </React.Fragment>}
              { confirmReset && <React.Fragment>
                <small className="mt-3">Please check your email inbox for a confirmation code to complete the reset.</small>
                <div className="mt-4">
                  { loginError && <p className={styles.loginError}>{loginError}</p> }
                  <Input type="text" className nameAttr="reset-code" label="Confirmation Code"
                    id="reset-code" changed={inputChange}  />
                  <Input type="password" className nameAttr="new-password" label="New Password"
                    id="new-password" changed={inputChange} />
                  <button onClick={confirmPasswordReset} >Confirm Reset
                      <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                  </button>
                  <p onClick={resendCode} className={styles.resendCode}>Resend code</p>
                </div>
              </React.Fragment>}
            </React.Fragment> }
          </div>
          <div className={["col-md-8", 'order-md-2', 'order-1', styles.bleedImage].join(' ')}>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;