import React, {useState, useEffect} from 'react';
import { Link } from 'gatsby';
import styles from './register.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pricingPlan, setPricingPlan] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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
      default:
        break;
    }
  }

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

    console.log(validationErrors);
    fields = {};
  }

  // useEffect(() => {
  //   console.log(pricingPlan);
  // }, [pricingPlan]);

  return(
    <React.Fragment>
      <SEO title="Register" />
      <div className={styles.registerContainer}>
        <div className="row">
          <div className={["col-md-7", styles.bleedImage].join(' ')}>
            
          </div>
          <div className="col-md-5">
            <div className={styles.registerForm}>
              <h2>Betsmart</h2>
              <h3 className="mt-5">Create Your Account</h3>
              <form className="mt-4">
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
                    <option value="choose plan" defaultValue="choose plan">Choose Your Plan</option>
                    <option value="single plan">Single Plan</option>
                    <option value="combo plan">Combo Plan</option>
                  </select>
                  { validationErrors.pricingPlan && <small>{validationErrors.pricingPlan}</small>}
                </div>
                <button onClick={onSubmit} >Register</button>
              </form>
              <p className="mt-3" >Have an account? <Link to="/login">Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;