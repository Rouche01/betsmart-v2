import React, { useState } from 'react';
import styles from './blockedEntry.module.scss';
import { getCurrentUser, logout, setUser } from '../../utils/auth';
import Notifications, {notify} from 'react-notify-toast';
import { API, Auth } from 'aws-amplify';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const BlockedEntry = (props) => {
  const [loadingState, setLoadingState] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const user = getCurrentUser();
  const plan = user['custom:user-type'];
  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);

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

  const unlockAccess = async() => {
    console.log('works');
    setLoadingState(true);
    try {
      const paymentInfo = await redirectToCheckout(user.email, plan);
      setLoadingState(false);
      console.log(paymentInfo.data.authorization_url);
      setUser(null);
      navigate(paymentInfo.data.authorization_url);
    } catch(err) {
      setLoadingState(false);
      // console.log(err);
      notify.show("Unable to unlock access at the moment, try again")
    }
  }

  const logoutHandler = async() => {
    await Auth.signOut();
    logout(() => {
      navigate('/login');
    })
  }

  return(
    <React.Fragment>
      <Notifications options={{zIndex: 200, top: '20px'}} />
      <div className={styles.blockedEntry}>
        <div>
          { paymentError && <small>{paymentError}</small> }
          <h2>{user.given_name} {user.family_name}</h2>
          <p className={styles.planName}>{formattedPlan} Plan</p>
          <div className={[styles.blockedInfo, 'mt-3'].join(' ')}>
            <FontAwesomeIcon color="#FF9900" className="fa-2x" icon={faLock} />
            <p>You do not have access to the dashboard yet, you need to make payment to unlock access</p>
          </div>
          <button onClick={unlockAccess} className={[styles.btn, 'mt-3'].join(' ')}>Unlock Access
            <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
          </button>
          <button onClick={logoutHandler} className={[styles.btnOutline, 'mt-3', 'ml-md-3'].join(' ')}>Logout</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BlockedEntry;