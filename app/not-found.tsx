import Link from 'next/link';
import React from 'react';
import styles from '@app/styles/404.module.scss';

export default function NotFound() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.fourOhFour}>404</h1>
        <p className={styles.message}>This page could not be found</p>
      </div>
    </>
  );
}
