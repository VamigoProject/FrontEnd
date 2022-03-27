import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Sample: NextPage = () => {
  let str = 'hello';
  str = 'how';

  return (
    <div className={styles.container}>
      <div>{str}</div>
    </div>
  );
};

export default Sample;
