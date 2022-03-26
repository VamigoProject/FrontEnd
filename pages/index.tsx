import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  let str = 'hello';
  str = 'how';

  return (
    <div className={styles.container}>
      <div>{str}</div>
    </div>
  );
};

export default Home;
