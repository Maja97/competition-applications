import Image from 'next/image';
import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}.`;

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
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
      </div>
      <div className={styles.rightSide}>
        <Image src={'/assets/images/avatar.png'} width={32} height={32} alt="avatar" />
        <p className={styles.smallText}>Nikola Kavezić</p>
      </div>
    </header>
  );
};

export default Header;
