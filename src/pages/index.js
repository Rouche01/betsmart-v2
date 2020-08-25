import React, { useEffect } from "react";
import Layout from "../component/layout";
import styles from "./index.module.scss";
import SEO from '../component/seo';
import { Link, graphql } from "gatsby";
import { navigate } from '@reach/router';
import { isLoggedIn } from '../utils/auth';
import calendarIcon from "../images/calendar-2.svg";
import checkIcon from "../images/check-mark.svg";
import dollarIcon from "../images/dollar-sign.svg";
import TeaserTip from "../component/teaserTip/teaserTip";
import Img from 'gatsby-image';

export default function Home({data}) {

  useEffect(() => {
    if(isLoggedIn()) {
      navigate('/app/dashboard');
    }
  }, [])

  const tipData = [
    {
      homeTeam: 'Pachucha',
      awayTeam: 'Gallos Blancos',
      league: 'Mexican Primera',
      odds: 1.45,
      tips: 'Over +2.5 goals'
    },
    {
      homeTeam: 'Crvena Zvezda',
      awayTeam: 'Radnicki',
      league: 'Serbia Super League',
      odds: 1.75,
      tips: 'Radnicki to win'
    }
  ]

  const betSlipImages = data.allImageSharp.edges;

  return (
    <Layout footerBgType="dark" >
      <SEO title="Home" />
      <div className={styles.hero}>
        <div className={[styles.heroContent, 'text-center', 'text-white'].join(' ')}>
          <h1>We are the <span style={{color: "#FF9900"}}>King</span> of Betting Odds</h1>
          <p className="mt-4">Win more money on your Sport Bettings. <br/> Cheaper plans, Money back guarantee & 93% Odds Accuracy.</p>
          <Link to="/register"><button className="mt-4">Get Started</button></Link>
        </div>
      </div>
      <div className={styles.moreInfo}>
        <div className="container">
          <h2>Learn a bit more<span style={{color: "#FF9900"}}>...</span></h2>
          <p className={styles.mainInfo}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
          <div className="row mt-5">
            <div className={[styles.iconInfoGroup, 'col-md-4', 'mb-3', 'mb-md-0'].join(' ')}>
              <img src={calendarIcon} alt="Daily odds" />
              <h4 className="mt-2 mt-md-3" >Daily Odds</h4>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
            </div>
            <div className={[styles.iconInfoGroup, 'col-md-4', 'mb-3', 'mb-md-0'].join(' ')}>
              <img src={checkIcon} alt="90% Accuracy" />
              <h4 className="mt-2 mt-md-3" >90% Accuracy</h4>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
            </div>
            <div className={[styles.iconInfoGroup, 'col-md-4'].join(' ')}>
              <img src={dollarIcon} alt="Cheaper plans" />
              <h4 className="mt-2 mt-md-3" >Cheaper Plans</h4>
              <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pricing}>
        <div className="row">
          <div className="col-md-11 offset-md-1">
            <h2>Ready to get started?</h2>
          </div>
          <div className={['col-md-4', 'offset-md-1', 'mt-5'].join(' ')}>
            <div className={styles.teaser}>
              <h4 className="mt-3">Today's Tips</h4>
              <hr />
              { tipData.map((tip, idx) => {
                return (
                  <TeaserTip key={`tip_${idx}`} hTeam={tip.homeTeam} aTeam={tip.awayTeam} 
                league={tip.league} odds={tip.odds} tips={tip.tips} />
                )
              })}
              <Link to="/register"><button className="mt-3 mb-3">Unlock All</button></Link> 
            </div>
          </div>
          <div className={["col-md-3", 'mt-5', 'text-white'].join(' ')}>
            <div className={styles.singlePlan}>
              <h2>Single Plan</h2>
              <h4 className="mt-3">N3,000</h4>
              <p className={styles.billingFreq}>Billed Monthly</p>
              <ul className="mt-4">
                <li className='mb-2'>5+ odds daily</li>
                <li className='mb-2'>Money back guarantee</li>
                <li className='mb-2'>24 hours online & offline support</li>
              </ul>
              <Link to="/register"><button>Get Started</button></Link> 
            </div>
          </div>
          <div className="col-md-3 mt-5 text-white">
            <div className={styles.comboPlan}>
              <h2>Combo Plan</h2>
              <h4 className="mt-3">N7,000</h4>
              <p className={styles.billingFreq}>Billed Quartely (3 Months)</p>
              <ul className="mt-4">
                <li className='mb-2'>5+ odds daily</li>
                <li className='mb-2'>Money back guarantee</li>
                <li className='mb-2'>24 hours online & offline support</li>
              </ul>
              <Link to="/register"><button>Get Started</button></Link> 
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subFooter}>
        <h2>You can keep losing your games or join us & be assured of 90% wins.</h2>
        <p className="mt-4">Here are some testimonials to our accurate odds...</p>
        <div className="container">
          <div className="row mt-5 pt-2">
            { betSlipImages.map((betSlip, idx) => {
              return (
                <div className="col-md-3 mb-md-0 mb-4">
                  <Img sizes={betSlip.node.sizes} alt="betslip snapshot" />
                </div>
              )
            })}
          </div>
          <Link to="/register"><button>Get Started Now</button></Link>
          <hr style={{borderColor: "#fff", opacity: "0.4"}} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allImageSharp {
      edges {
        node {
          sizes(maxWidth: 400) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`
