import React from 'react';
import styles from './overlayPop.module.scss';

const overlayPop = ({ show, overlayClick, children, menuClick }) => {
  let menuStyles;
  if(show) {
    menuStyles = [styles.overlay, styles.showMenu];
  } else {
    menuStyles = [styles.overlay];
  }

  return(
    <div onClick={overlayClick} className={menuStyles.join(' ')}>
      <div className={styles.pop}>
        <ul>
          {children.map((menu, idx) => {
            return(
              <li onClick={menuClick} id={menu.id} key={`menu_${idx}`} className="py-2">{menu.menuName}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default overlayPop;