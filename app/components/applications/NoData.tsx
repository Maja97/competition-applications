import strings from '@app/consts/strings.json';
import Image from 'next/image';
import Button from '../shared/button';
import styles from './nodata.module.scss';

const NoData = ({ openModal }: { openModal: () => void }) => {
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
      <Button onClick={openModal} variant="highlight">
        {strings.noData.button}
      </Button>
    </section>
  );
};

export default NoData;
