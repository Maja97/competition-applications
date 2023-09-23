import Image from 'next/image';
import React from 'react';
import styles from './nodata.module.scss';
import Button from '../shared/button';
import strings from '@app/consts/strings.json';

const NoData = () => {
  return (
    <section className={styles.section}>
      <Image
        className={styles.image}
        src="/assets/images/ghost.png"
        alt="Ghost"
        width={80}
        height={80}
      />
      <h3>{strings.noData.title}</h3>
      <p className={styles.explanation}>{strings.noData.explanation}</p>
      <Button variant="highlight">{strings.noData.button}</Button>
    </section>
  );
};

export default NoData;
