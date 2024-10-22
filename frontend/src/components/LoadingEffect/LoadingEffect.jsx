import React from 'react';
import styles from './style.module.css';

const LoadingEffect = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default LoadingEffect;
