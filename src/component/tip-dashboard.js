import React, { useState, useEffect, useRef } from 'react';
import styles from './tip-dashboard.module.scss';
import { getCurrentUser, logout, setUser } from '../utils/auth';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { getSession } from '../utils/accountTools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import { navigate } from '@reach/router'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import TipBox from './tipBox/tipBox';
import Input from './input/input';
import SEO from './seo';
Amplify.configure(awsconfig);


const TipDashboard = (props) => {
  const user = getCurrentUser();
  const plan = user['custom:user-type'];
  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
  const phoneNumber = `0${user.phone_number.slice(4)}`;

  const [dashboardState, setDashboardState] = useState('home');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [supportNumber, setSupportNumber] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');


  useEffect(() => {
    setEmail(user.email);
    setPhone(phoneNumber);
    setGender(user.gender);
  }, []);

  const genderRef = useRef();

  const tipData = [
    {
      homeTeam: 'Pachucha',
      awayTeam: 'Gallos Blancos',
      league: 'Mexican Primera',
      odds: 1.55,
      tips: 'Over +2.5 Goals'
    },
    {
      homeTeam: 'Musan Salama',
      awayTeam: 'Mypa',
      league: 'Finland Ykonnen',
      odds: 3.35,
      tips: 'Over +2.5 Goals'
    },
    {
      homeTeam: 'Man. United',
      awayTeam: 'Copenhagen',
      league: 'UEFA Europa League',
      odds: 1.35,
      tips: 'Man. United Wins'
    },
    {
      homeTeam: 'Rukh Vynnyky',
      awayTeam: 'Metalurh',
      league: 'Ukraine Persha',
      odds: 1.45,
      tips: 'Rukh Vynnyky Wins'
    },
    {
      homeTeam: 'Jerv',
      awayTeam: 'Kongsvinger',
      league: 'Norway OBOS-ligaen',
      odds: 8.15,
      tips: 'Correct Score 1-1 or 1-0'
    }
  ]

  const handleLogout = async() => {
    console.log('logout works');
    await Auth.signOut();
    logout(() => {
      navigate('/login');
    })
  }

  const inputChange = (e) => {
    console.log('works');
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
          console.log(optionsArr);
          for(let i = 0; i < optionsArr.length; i++) {
            if(optionsArr[i].value === gender ) {
              console.log(optionsArr[i]);
              optionsArr[i].selected = true;
            }
          }
        }
      }, 4000);
    }
  }
  
  const updateUserInfo = async() => {
    console.log('works');
    getSession().then(({ user }) => {
      const attributeList = [];
      const formattedPhoneNum = `+234${phone.slice(1)}`;
      console.log(formattedPhoneNum);

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
        if(err) console.error(err);
        Auth.currentAuthenticatedUser().then(user => {
          const userInfo = {
            ...user.attributes,
            username: user.username
          }
          setUser(userInfo);
        });
        console.log(result);
      });
    });
  }

  const changeUserPassword = async() => {
    const user = await Auth.currentAuthenticatedUser();
    try { 
      await Auth.changePassword(user, oldPassword, newPassword);
      await Auth.signOut();
      logout(() => {
        navigate('/login');
      })
    } catch(err) {
      setError(err.message);
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <SEO title="Dashboard" />
      <div className={styles.tipDashboard}>
        <header>
          <nav>
            <Link className={styles.logo} to="/tip-dashboard">Betsmart</Link>
            <ul>
              <li className={styles.dropdown}>
                <button className={styles.profileBtn}>
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
                <p className={styles.billingDate}>22-08-2020</p>
              </div>
            </div>
            <div className="col-md-7 mt-md-0 mt-4">
              { dashboardState === 'home' &&  tipData.map((tip, idx) => {
                return (
                  <TipBox key={`tip_${idx}`} hTeam={tip.homeTeam} aTeam={tip.awayTeam} leagueName={tip.league} odds={tip.odds} tips={tip.tips} />
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
                <button className="mt-4" onClick={updateUserInfo}>Save Changes</button>
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
                <button className="mt-4" onClick={changeUserPassword} >Change Password</button>
              </div>}
              { dashboardState === 'support' && <div className={styles.support}>
                <h3>Need Support? Send us a Message</h3>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Input className="mb-3" type="text" nameAttr="support-number" label="Mobile Number" 
                      id="support-number" changed={inputChange} />
                  </div>
                  <div className="col-md-6">
                    <Input className="mb-3" type="text" nameAttr="support-subject" label="Subject" 
                      id="support-subject" changed={inputChange} />
                  </div>
                  <div className={[styles.textareaInput, 'col-md-12'].join(' ')}>
                    <label htmlFor="support-message" >Message</label>
                    <textarea name="support-message" id="support-message" onChange={inputChange} />
                  </div>
                </div>
                <button className="mt-4">Send Message</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TipDashboard;