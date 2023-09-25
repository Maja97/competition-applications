import React from 'react';
import { Spinner } from '@chakra-ui/react';
import styles from '@app/styles/loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <Spinner width={50} height={50} />
    </div>
  );
};

export default Loading;
