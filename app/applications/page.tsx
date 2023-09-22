import React from 'react';
import Header from '../components/shared/header/Header';
import Button from '../components/shared/button/Button';
import styles from './applications.module.scss';
import SuccessDot from '@public/assets/SuccessDot';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.top}>
          <h1>My applications</h1>
          <div className={styles.buttonGroup}>
            <Button text="New application" />
            <Button text="Open" icon={<SuccessDot />} variant="secondary" disabled />
          </div>
        </section>
      </main>
    </>
  );
}
