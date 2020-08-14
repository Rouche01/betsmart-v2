import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './header.module.scss';

const Header = (props) => {
  const [toggleState, setToggleState] = useState(false);

  const toggleMobileMenu = () => {
    // console.log('worked');
    setToggleState(!toggleState);
  }

  let menuClasses = styles.burgerMenu;
  let popupClasses = styles.mainNav;

  if(toggleState) {
    menuClasses = [styles.burgerMenu, styles.clicked].join(' ');
    popupClasses = [styles.mainNav, styles.clicked].join(' ');
  }

  return (
    <header>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>Betsmart</Link>
        <ul className={popupClasses}>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/login" className={styles.navBtnOutline} >Log in</Link>
          </li>
          <li>
            <Link to="/register" className={styles.navBtn} >Register</Link>
          </li>
        </ul>
        <div className={menuClasses} onClick={toggleMobileMenu} >
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;