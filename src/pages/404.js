import React from 'react';
import styles from './404.module.scss';
import SEO from '../component/seo';
import { Link } from 'gatsby';

const notFound = (props) => {
  return (
    <React.Fragment>
      <SEO title="404 Page" />
      <div className={styles.wrapper}>
        <div>
          <h2>Oops!</h2>
          <p>We can't seem to find the page you're looking for.</p>
          <p className={styles.linkOwner}>Return to <Link to="/">Homepage</Link> to continue exploring!</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default notFound;