import React from 'react';
import styles from './teaserTip.module.scss';

const teaserTip = ({hTeam, aTeam, league, odds, tips}) => {
  return(
    <div className={["mt-3", styles.teaserTip].join(' ')}>
      <h3>{hTeam} <span style={{color: "#FF9900"}}>vs.</span><br/>{aTeam}</h3>
      <p className={styles.leagueName}>{league}</p>
      <div className={['d-flex', styles.tipValues].join(' ')}>
        <p><span className="font-weight-bold" >Odd:</span> <span style={{filter: "blur(4px)"}} >{odds}</span></p>
        <p><span className="font-weight-bold ml-4" >Tips:</span> <span style={{filter: "blur(4px)"}} >{tips}</span></p>
      </div>
    </div> 
  )
}


export default teaserTip;