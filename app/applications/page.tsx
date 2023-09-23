import React from 'react';
import Header from '../components/shared/header';
import Button from '../components/shared/button';
import styles from './page.module.scss';
import SuccessDot from '@public/assets/SuccessDot';
import NoData from '@app/components/applications/NoData';
import strings from '@app/consts/strings.json';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.top}>
          <h1>{strings.applications.title}</h1>
          <div className={styles.buttonGroup}>
            <Button>{strings.applications.button}</Button>
            <Button icon={<SuccessDot />} variant="secondary" disabled>
              Open
            </Button>
          </div>
        </section>
        <NoData />
      </main>
    </>
  );
}
