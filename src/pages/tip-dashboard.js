import React from 'react';
import styles from './tip-dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import TipBox from '../component/tipBox/tipBox';
import SEO from '../component/seo';

const tipDashboard = (props) => {
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

  return (
    <React.Fragment>
      <SEO title="Dashboard" />
      <div className={styles.tipDashboard}>
        <header>
          <nav>
            <Link className={styles.logo} to="/tip-dashboard">Betsmart</Link>
            <ul>
              <li><Link to="/profile"><FontAwesomeIcon icon={faCog} className={styles.profileLink} /></Link></li>
              <li><FontAwesomeIcon icon={faUserCircle} color="#333" className="fa-2x" /></li>
              <li className="d-none d-md-inline-block"><Link to="/logout" className={styles.navBtn}>Logout</Link></li>
            </ul>
          </nav>
        </header>
        <div className={styles.tipPlusDash}>
          <div class="row">
            <div className="col-md-3 offset-md-1">
              <div className={[styles.profileInfo, 'text-center', 'text-white'].join(' ')}>
                <FontAwesomeIcon icon={faUserCircle} color="#c4c4c4" className={["fa-5x", styles.profileImg].join(' ')} />
                <h3 className="mt-4" >Darlene Robertson</h3>
                <p style={{color: "#FF9900"}} >Combo Plan</p>
                <hr />
                <p className={styles.billingTitle} >Next Billing</p>
                <p className={styles.billingDate}>22-08-2020</p>
              </div>
            </div>
            <div className="col-md-7 mt-md-0 mt-4">
              { tipData.map((tip, idx) => {
                return (
                  <TipBox key={`tip_${idx}`} hTeam={tip.homeTeam} aTeam={tip.awayTeam} leagueName={tip.league} odds={tip.odds} tips={tip.tips} />
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default tipDashboard;