import React from 'react';
import styles from '@app/styles/loading.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <Box className={styles.wrapper}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
