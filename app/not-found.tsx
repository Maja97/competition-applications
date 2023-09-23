import React from 'react';
import styles from '@app/styles/404.module.scss';
import strings from '@app/consts/strings.json';
import Link from 'next/link';
import Button from './components/shared/button';
import { Routes } from './consts/routes';

export default function NotFound() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h1 className={styles.title}>{strings.notFound.title}</h1>
          <p className={styles.message}>{strings.notFound.message}</p>
        </div>
        <Button className={styles.button} variant="secondary">
          <Link href={Routes.Applications}>{strings.notFound.link}</Link>
        </Button>
      </div>
    </>
  );
}
