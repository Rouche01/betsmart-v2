import React from 'react';
import styles from './input.module.scss';

const input = ({type, nameAttr, placeholder, id, label}) => {
  return(
    <React.Fragment>
      {label ? <label for={id} className={styles.label}>{label}</label> : null}
      <input className={styles.input} type={type} name={nameAttr} id={id} placeholder={placeholder} />
    </React.Fragment>
  );
}

export default input;