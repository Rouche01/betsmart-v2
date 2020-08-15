import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './login.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const inputChange = e => {
    switch(e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
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
      if(fields.password && fields.password.length < 6) {
        errorsInit.password = "Password must be at least 6 characters";
      }
    }

    setValidationErrors(errorsInit);
    console.log(validationErrors);
  }

  return(
    <React.Fragment>
      <SEO title="Login" />
      <div className={styles.loginContainer}>
        <div className="row">
          <div className={["col-md-4", 'order-md-1', 'order-2', styles.loginForm].join(' ')}>
            <h2>Betsmart</h2>
            <h3 className="mt-5">Welcome back, Log in</h3>
            <div className="mt-4">
              <Input type="email" nameAttr="email" label="Email Address" id="email" 
                changed={inputChange} error={validationErrors.email} />
              <Input type="password" nameAttr="password" label="Password" id="password" 
                changed={inputChange} error={validationErrors.password} />
              <button onClick={onSubmit} >Log in</button>
            </div>
            <p className="mt-3" >Don’t have an account? <Link to="/register">Register</Link></p>
          </div>
          <div className={["col-md-8", 'order-md-2', 'order-1', styles.bleedImage].join(' ')}>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;