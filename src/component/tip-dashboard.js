import React, { useState, useEffect, useRef } from 'react';
import styles from './tip-dashboard.module.scss';
import Logo from '../images/Betsmart-Logo.png';
import Notifications, {notify} from 'react-notify-toast';
import { getCurrentUser, logout, setUser } from '../utils/auth';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { getSession } from '../utils/accountTools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import { navigate } from '@reach/router'
import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import TipBox from './tipBox/tipBox';
import Input from './input/input';
import SEO from './seo';
import BlockedEntry from './blockedEntry/blockedEntry';
import OverlayPop from './overlayPop/overlayPop';
Amplify.configure(awsconfig);


const TipDashboard = (props) => {

  let user = getCurrentUser();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(res => {
      // console.log(res.attributes);
      if (user !== res.attributes) {
        setUser(res.attributes);
        user = res.attributes
      }
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const plan = user['custom:user-type'];
  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
  const phoneNumber = `0${user.phone_number.slice(4)}`;
  let date = user['custom:next-payment-date'];
  if(date) {
    date = new Date(date);
    date = date.toISOString().split('T');
    date = date[0];
  }


  const [dashboardState, setDashboardState] = useState('home');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [supportErrors, setSupportErrors] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const [supportNumber, setSupportNumber] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);


  useEffect(() => {
    setEmail(user.email);
    setPhone(phoneNumber);
    setGender(user.gender);
    // console.log(user['custom:payment-status']);
    setPaymentStatus(user['custom:payment-status'])
  }, []);

  const genderRef = useRef();

  const tipData = [
    {
      homeTeam: 'Keflavik',
      awayTeam: 'Vestmannaeyjar',
      league: 'Iceland 1. Delid',
      odds: 1.50,
      tips: 'Over +2.5 Goals',
      risk: 'Low/Moderate',
      time: ''
    },
    {
      homeTeam: 'Blau-Weiss Linz',
      awayTeam: 'Amstetten',
      league: 'Austria 2. Liga',
      odds: 1.45,
      tips: 'Over 2.5 Goals',
      risk: 'Low/Moderate',
      time: ''
    },
    {
      homeTeam: 'Austria Wien',
      awayTeam: 'SV Horn',
      league: 'Austria 2. Liga',
      odds: 1.50,
      tips: 'Over +2.5 Goals',
      risk: 'Low/Moderate',
      time: ''
    },
    {
      homeTeam: 'Arka Gdynia',
      awayTeam: 'GKS Tychy',
      league: 'Poland Liga 1',
      odds: 1.55,
      tips: 'Over +2.5 Goals',
      risk: 'Moderate',
      time: ''
    },
    {
      homeTeam: 'FC Eindhoven',
      awayTeam: 'Roda JC',
      league: 'Netherlands Eerste Divisie',
      odds: 1.55,
      tips: 'Over +2.5 Goals',
      risk: 'Moderate',
      time: ''
    },
    {
      homeTeam: 'Tottenham Hotspur',
      awayTeam: 'Chelsea',
      league: 'England, EFL Cup',
      odds: 1.60,
      tips: 'Over +2.5 Goals',
      risk: 'Moderate/High',
      time: ''
    }
  ]

  const handleLogout = async() => {
    await Auth.signOut();
    logout(() => {
      navigate('/login');
    })
  }

  const inputChange = (e) => {
    // console.log('works');
    switch(e.target.id) {
      case 'gender':
        setGender(e.target.options[e.target.selectedIndex].value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'old-password':
        setOldPassword(e.target.value);
        break;
      case 'new-password':
        setNewPassword(e.target.value);
        break;
      case 'support-number':
        setSupportNumber(e.target.value);
        break;
      case 'support-subject':
        setSupportSubject(e.target.value);
        break;
      case 'support-message':
        setSupportMessage(e.target.value);
        break;
      default:
        break;
    }
  }

  const changeDashboardState = (e) => {
    e.preventDefault();
    setDashboardState(e.target.id);
    if(e.target.id === 'profile') {
      setTimeout(() => {
        if(genderRef.current !== undefined) {
          const optionsArr = genderRef.current.options;
          // console.log(optionsArr);
          for(let i = 0; i < optionsArr.length; i++) {
            if(optionsArr[i].value === gender ) {
              // console.log(optionsArr[i]);
              optionsArr[i].selected = true;
            }
          }
        }
      }, 4000);
    }
  }
  
  const updateUserInfo = async() => {
    // console.log('works');
    setLoadingState(true);
    getSession().then(({ user }) => {
      const attributeList = [];
      const formattedPhoneNum = `+234${phone.slice(1)}`;
      // console.log(formattedPhoneNum);

      const updateableProfile = {
        gender: gender,
        email: email,
        phone_number: formattedPhoneNum
      }
      for(let key in updateableProfile) {
        var singleAttr = {
          Name: key,
          Value: updateableProfile[key]
        }
        singleAttr = new CognitoUserAttribute(singleAttr);
        attributeList.push(singleAttr);
      }

      user.updateAttributes(attributeList, (err, result) => {
        if(err) {
          notify.show(err, "error");
          setLoadingState(false);
        }
        Auth.currentAuthenticatedUser().then(user => {
          const userInfo = {
            ...user.attributes,
            username: user.username
          }
          setUser(userInfo);
        });
        setLoadingState(false);
        notify.show("Your profile was edited successfully!", "success");
        // console.log(result);
      });
    });
  }

  const changeUserPassword = async() => {
    setLoadingState(true);
    const user = await Auth.currentAuthenticatedUser();
    try { 
      await Auth.changePassword(user, oldPassword, newPassword);
      await Auth.signOut();
      setLoadingState(false);
      // notify.show("Your password was successfully changed!", "success");
      logout(() => {
        navigate('/login');
      })
    } catch(err) {
      const errorArr = err.message.split(':');
      const idx = errorArr.length - 1;
      setError(errorArr[idx]);
      setLoadingState(false);
      // console.log(errorArr[idx]);
    }
  }

  const sendSupportMessage = async(e) => {
    e.preventDefault();

    const supportFields = { supportNumber, supportSubject, supportMessage };
    const errorInit = {}

    for(const key in supportFields) {
      if(!supportFields[key]) {
        errorInit[key] = "This field is required";
      }
    }

    setSupportErrors(errorInit);

    if(Object.entries(errorInit).length === 0) {
      setLoadingState(true)
      const apiName = 'sendEmail';
      const apiEndpoint = '/sendEmail';
      const user = getCurrentUser();
      const body = {
        destination: user.email,
        supportMsg: supportMessage,
        supportNum: supportNumber,
        supportSbj: supportSubject
      }
      try {
        console.log('worked');
        await API.post(apiName, apiEndpoint, { body });
        console.log('worked');
        setLoadingState(false);
      } catch(err) {
        setLoadingState(false);
        console.log('error', err);
      }
    }
    
  }

  const displayMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  }

  const handleMobileMenuClick = (e) => {
    if(e.target.id !== 'logout') {
      changeDashboardState(e)
    } else {
      console.log(e.target.id);
      handleLogout();
    }
  }


  return (
    <React.Fragment>
      <Notifications options={{zIndex: 200, top: '20px'}} />
      <OverlayPop show={showMobileMenu} overlayClick={displayMobileMenu} menuClick={handleMobileMenuClick} >
        {[
          { menuName: `Today's Tips`, id: `home`}, 
          { menuName: `Edit Profile`, id: `profile`}, 
          { menuName: `Reset Password`, id: `password`},
          { menuName: `Support`, id: `support`},
          { menuName: `Logout`, id: `logout` }
        ]}
      </OverlayPop>
      { paymentStatus === 'fail' || paymentStatus === undefined && <BlockedEntry /> }
      <SEO title="Dashboard" />
      <div className={styles.tipDashboard}>
        <header>
          <nav>
            <Link className={styles.logo} to="/app/dashboard">
              <img src={Logo} alt="Betsmart logo" />
            </Link>
            <ul>
              <li className={styles.dropdown}>
                <button onClick={displayMobileMenu} className={styles.profileBtn}>
                  <FontAwesomeIcon icon={faCog} className={styles.profileLink} />
                </button>
                <div>
                  <button id="home" onClick={changeDashboardState}>
                    Today's Tips
                  </button>
                  <button id="profile" onClick={changeDashboardState}>
                    Edit Profile
                  </button>
                  <button id="password" onClick={changeDashboardState}>
                    Reset Password
                  </button>
                  <button id="support" onClick={changeDashboardState}>
                    Support
                  </button>
                </div>
              </li>
              <li><FontAwesomeIcon icon={faUserCircle} color="#333" className="fa-2x" /></li>
              <li className="d-none d-md-inline-block">
                <button className={styles.navBtn} onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.tipPlusDash}>
          <div className="row">
            <div className="col-md-3 offset-md-1">
              <div className={[styles.profileInfo, 'text-center', 'text-white'].join(' ')}>
                <FontAwesomeIcon icon={faUserCircle} color="#c4c4c4" className={["fa-5x", styles.profileImg].join(' ')} />
                <h3 className="mt-4" >{user.given_name} {user.family_name}</h3>
                <p style={{color: "#FF9900"}} >{formattedPlan} Plan</p>
                <hr />
                <p className={styles.billingTitle} >Next Billing</p>
                <p className={styles.billingDate}>{date}</p>
              </div>
            </div>
            <div className="col-md-7 mt-md-0 mt-4">
              { dashboardState === 'home' &&  tipData.map((tip, idx) => {
                return (
                  <TipBox key={`tip_${idx}`} hTeam={tip.homeTeam} aTeam={tip.awayTeam} leagueName={tip.league} odds={tip.odds} tips={tip.tips} riskLevel={tip.risk} />
                )
              }) }
              { dashboardState === 'profile' && <div className={styles.accountInfo} >
                <h3>Account Info</h3>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Input className="mb-3" type="text" nameAttr="f-name" label="First Name" id="f-name" 
                      value={user.given_name} disabled={true} />
                    <Input className="mb-3" type="text" nameAttr="l-name" label="Last Name" id="l-name" 
                      value={user.family_name} disabled={true} />
                    <div className={styles.selectInput}>
                      <label htmlFor="gender">Gender</label>
                      <select id="gender" ref={genderRef}  onChange={inputChange}>
                        <option value="rather not say">Rather not say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Input className="mb-3" type="email" nameAttr="email" label="Email" id="email" 
                      changed={inputChange} value={email} />
                    <Input className="mb-3" type="text" nameAttr="phone" label="Mobile Number" id="phone" 
                      changed={inputChange} value={phone} />
                    <Input className="mb-3" type="text" nameAttr="plan" label="Plan" id="plan" 
                      value={formattedPlan} disabled={true} />
                  </div>
                </div>
                <button className="mt-4" onClick={updateUserInfo}>Save Changes
                  <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                </button>
              </div>}
              { dashboardState === 'password' && <div className={styles.resetPassword}>
                <h3>Reset Password</h3>
                <small className="row mt-4 ml-1" style={{color: 'red'}}>{error}</small>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Input className="mb-3" type="password" nameAttr="old-password" label="Old Password" 
                      id="old-password" changed={inputChange} />
                  </div>
                  <div className="col-md-6">
                    <Input className="mb-3" type="password" nameAttr="new-password" label="New Password" 
                      id="new-password" changed={inputChange} />
                  </div>
                </div>
                <button className="mt-4" onClick={changeUserPassword}>Change Password
                  <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                </button>
              </div>}
              { dashboardState === 'support' && <div className={styles.support}>
                <h3>Need Support? Send us a Message</h3>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Input className="mb-3" type="text" nameAttr="support-number" label="Mobile Number" 
                      id="support-number" error={supportErrors.supportNumber} changed={inputChange} />
                  </div>
                  <div className="col-md-6">
                    <Input className="mb-3" type="text" nameAttr="support-subject" label="Subject" 
                      id="support-subject" error={supportErrors.supportSubject} changed={inputChange} />
                  </div>
                  <div className={[styles.textareaInput, 'col-md-12'].join(' ')}>
                    <label htmlFor="support-message" >Message</label>
                    <textarea name="support-message" id="support-message" onChange={inputChange} />
                    { supportErrors.supportMessage && <small>{supportErrors.supportMessage}</small>}
                  </div>
                </div>
                <button onClick={sendSupportMessage} className="mt-4">Send Message
                  <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                </button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TipDashboard;