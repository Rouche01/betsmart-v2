import React from 'react';
import styles from './tipBox.module.scss';

const tipBox = ({hTeam, aTeam, leagueName, odds, tips, riskLevel, btnHandler, btnName, btnBgColor, btnColor, id}) => {
  return(
    <div className={styles.tipBox} id={id}>
      <h4>{hTeam} <span style={{color: "#FF9900"}}>vs.<br /></span> {aTeam}</h4>
      <p className={styles.leagueName}>{leagueName}</p>
      <div className="d-flex">
        <div className={["mr-4", styles.tipsPlusOdds].join(' ')}><span style={{color: "#FF9900", fontWeight: "600"}}>Odds</span> <br/>{odds}</div>
        <div className={["mr-4", styles.tipsPlusOdds].join(' ')}><span style={{color: "#FF9900", fontWeight: "600"}}>Tips</span> <br/>{tips}</div>
        <div className={styles.tipsPlusOdds}><span style={{color: "#FF9900", fontWeight: "600"}}>Risk</span> <br/>{riskLevel}</div>
      </div>
      { btnName && <button onClick={btnHandler} style={{backgroundColor: btnBgColor, color: btnColor}}>{btnName}</button>}
    </div>
  );
}

export default tipBox;