import React from 'react';
import styles from './tipBox.module.scss';

const tipBox = ({hTeam, aTeam, leagueName, odds, tips}) => {
  return(
    <div className={styles.tipBox}>
      <h4>{hTeam} <span style={{color: "#FF9900"}}>vs.<br /></span> {aTeam}</h4>
      <p className={styles.leagueName}>{leagueName}</p>
      <div className="d-flex">
        <div className={["mr-5", styles.tipsPlusOdds].join(' ')}><span style={{color: "#FF9900", fontWeight: "600"}}>Odds</span> <br/>{odds}</div>
        <div className={styles.tipsPlusOdds}><span style={{color: "#FF9900", fontWeight: "600"}}>Tips</span> <br/>{tips}</div>
      </div>
    </div>
  );
}

export default tipBox;