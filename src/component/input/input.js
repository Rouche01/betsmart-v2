import React from 'react';
import styles from './input.module.scss';

const input = ({type, nameAttr, placeholder, id, label, changed, error, value, disabled}) => {
  return(
    <div className={styles.inputGroup}>
      {label ? <label htmlFor={id} className={styles.label}>{label}</label> : null}
      <input className={styles.input} type={type} name={nameAttr} id={id} placeholder={placeholder} 
        onChange={changed} value={value} disabled={disabled} />
      { error && <small className={styles.small}>{error}</small> }
    </div>
  );
}

export default input;