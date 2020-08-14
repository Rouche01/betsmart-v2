import React from 'react';
import { Link } from 'gatsby';
import styles from './login.module.scss';
import Input from '../component/input/input';
import SEO from '../component/seo';

const login = (props) => {
  return(
    <React.Fragment>
      <SEO title="Login" />
      <div className={styles.loginContainer}>
        <div className="row">
          <div className={["col-md-4", 'order-md-1', 'order-2', styles.loginForm].join(' ')}>
            <h2>Betsmart</h2>
            <h3 className="mt-5">Welcome back, Log in</h3>
            <form className="mt-4">
              <Input type="email" nameAttr="email" label="Email Address" id="email" />
              <Input type="password" nameAttr="password" label="Password" id="password" />
              <button>Log in</button>
            </form>
            <p className="mt-3" >Don’t have an account? <Link to="/register">Register</Link></p>
          </div>
          <div className={["col-md-8", 'order-md-2', 'order-1', styles.bleedImage].join(' ')}>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default login;