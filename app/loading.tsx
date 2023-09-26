import React from 'react';
import styles from '@app/styles/loading.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
