import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';

const Header = () => {
  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}.`;

  return (
    <header className={styles.header}>
      <Box className={styles.leftSide}>
        <Image
          src="/assets/images/logo.png"
          alt="logo image"
          width={32}
          height={32}
          className={styles.logo}
        />
        <h3>Competition name&nbsp;</h3>
        <h3 className={styles.dot}>·&nbsp;</h3>
        <h3 className={styles.largeText}>{date}</h3>
      </Box>
      <Box className={styles.rightSide}>
        <Image src={'/assets/images/avatar.png'} width={32} height={32} alt="avatar" />
        <p className={styles.smallText}>Nikola Kavezić</p>
      </Box>
    </header>
  );
};

export default Header;
