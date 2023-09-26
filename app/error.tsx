'use client';
import strings from '@app/consts/strings.json';
import styles from '@app/styles/404.module.scss';
import { Box } from '@mui/material';
import Button from './components/shared/button';

export default function Error() {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <Box className={styles.wrapper}>
        <Box className={styles.text}>
          <h1 className={styles.title}>{strings.error.title}</h1>
          <p className={styles.message}>{strings.error.message}</p>
        </Box>
        <Button onClick={reloadPage} className={styles.button} variant="secondary">
          {strings.error.link}
        </Button>
      </Box>
    </>
  );
}
