import React from 'react';
import { Link } from 'gatsby';
import styles from './register.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';

const register = (props) => {
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
                <Input type="email" nameAttr="email" label="Email Address" id="email" />
                <Input type="text" nameAttr="fname" label="First Name" id="fname" />
                <Input type="text" nameAttr="lname" label="Last Name" id="lname" />
                <Input type="password" nameAttr="password" label="Password" id="password" />
                <Input type="number" nameAttr="phone" label="Phone" id="phone" />
                <div className={styles.selectInput}>
                  <label for="pricing-plan">Pricing Plan</label>
                  <select id="pricing-plan">
                    <option value="choose plan" selected>Choose Your Plan</option>
                    <option value="single plan">Single Plan</option>
                    <option value="combo plan">Combo Plan</option>
                  </select>
                </div>
                <button>Register</button>
              </form>
              <p className="mt-3" >Have an account? <Link to="/login">Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default register;