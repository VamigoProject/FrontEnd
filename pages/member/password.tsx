import type { NextPage } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useRef, useEffect } from 'react';
import { useInput } from 'hooks';
import {
  passwordMailCheckApi,
  passwordMailAuthApi,
  passwordForgetApi,
} from 'utils/api';
import { useSystemStore } from 'stores';
import Router from 'next/router';

const password: NextPage = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const [mail, onChangeMail] = useInput<string>('', (e) => {
    setIsMailChecked(false);
    return e.target.value;
  });
  const [isMailChecked, setIsMailChecked] = useState<boolean>(false);

  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const onClickCheck = async () => {
    try {
      await passwordMailCheckApi(mail);
      setIsMailChecked(true);
    } catch (error) {
      alert(error);
    }
  };

  const onClickCode = async () => {
    alert('메일이 도착하기까지 시간이 걸릴 수 있습니다');
    try {
      timerId.current = setTimeout(() => {
        clearTimer();
        setCodeButton('코드요청');
      }, 61000);
      setCodeButton('60');
      intervalId.current = setInterval(() => {
        setCodeButton((prev) => String(parseInt(prev) - 1));
      }, 1000);
      await passwordMailAuthApi(mail);
    } catch (error) {
      alert(error);
    }
  };

  const [code, onChangeCode] = useInput<string>('');
  const [codeButton, setCodeButton] = useState<string>('코드요청');
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => {
    timerId.current ?? clearTimeout(timerId.current);
    intervalId.current ?? clearInterval(intervalId.current);
  };

  useEffect(() => {
    return clearTimer;
  }, []);

  const [password, onChangePassword] = useInput<string>('');
  const [passwordCheck, onChangePasswordCheck] = useInput<string>('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoadingAction();
      await passwordForgetApi(mail, password, code);
      alert('비밀번호가 성공적으로 변경되었습니다');
      Router.push('/');
    } catch (error) {
      alert(error);
    }
    endLoadingAction();
  };

  return (
    <Background>
      <Centering>
        <Link href="/">
          <a>
            <Logo>Vamigo</Logo>
          </a>
        </Link>
        <Box
          style={{ width: '100%', height: '100%' }}
          component="form"
          onSubmit={onSubmit}
        >
          <CustomTextField
            id="mail"
            style={{ width: '77%' }}
            size="small"
            required
            variant="outlined"
            type="email"
            helperText="가입한 이메일을 입력해주세요"
            value={mail}
            onChange={onChangeMail}
          />
          <Button
            style={{ width: '23%' }}
            variant="contained"
            disabled={!regEmail.test(mail)}
            onClick={onClickCheck}
          >
            메일확인
          </Button>

          <br />
          <CustomTextField
            style={{ width: '77%' }}
            id="code"
            label="인증코드"
            value={code}
            onChange={onChangeCode}
            size="small"
            required
            variant="outlined"
            autoComplete="off"
            disabled={!isMailChecked || codeButton === '코드요청'}
          />
          <Button
            style={{ width: '23%' }}
            variant="contained"
            disabled={
              codeButton !== '코드요청' ||
              !regEmail.test(mail) ||
              !isMailChecked
            }
            onClick={onClickCode}
          >
            {codeButton !== '코드요청' && codeButton}
            {codeButton === '코드요청' && '코드요청'}
          </Button>
          <br />
          <CustomTextField
            id="password"
            label="변경할 패스워드"
            value={password}
            onChange={onChangePassword}
            inputProps={{ maxLength: 20 }}
            size="small"
            type="password"
            required
            variant="outlined"
            autoComplete="off"
          />
          <br />
          <CustomTextField
            id="passwordCheck"
            label="패스워드확인"
            helperText="패스워드와 일치하여야합니다"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            inputProps={{ maxLength: 20 }}
            size="small"
            type="password"
            required
            variant="outlined"
            error={password !== passwordCheck}
            autoComplete="off"
          />
          <ChangeButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={
              !isMailChecked ||
              password !== passwordCheck ||
              password.length < 8 ||
              code === ''
            }
          >
            변 경
          </ChangeButton>
        </Box>
      </Centering>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgb(245, 245, 245);
  padding-top: 1rem;
`;

const Centering = styled.div`
  width: 25rem;
  height: 100%;
`;

const Logo = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
`;

const CustomTextField = styled(TextField)`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const ChangeButton = styled(Button)`
  display: relative;
  left: 100%;
  transform: translate(-100%, 0);
  margin-bottom: 1rem;
`;

export default password;
