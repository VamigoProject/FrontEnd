import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LinearProgress from '@mui/material/LinearProgress';
import Router from 'next/router';
import Link from 'next/link';

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
`;

const Centering = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 20rem;
`;

const Custom404 = () => {
  const [progress, setProgress] = useState<number | undefined>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        prev = prev as number;
        if (prev === 100) {
          Router.push('/home');
        } else {
          return prev + 4;
        }
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <Centering>
        <SearchOffIcon fontSize="large" />
        <br />
        페이지를 찾을 수 없습니다
        <LinearProgress variant="determinate" value={progress} />
        <Link href="/home">
          <a style={{ color: 'blue' }}>홈으로</a>
        </Link>
      </Centering>
    </Wrapper>
  );
};

export default Custom404;
