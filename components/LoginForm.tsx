import React from 'react';
import { useInput } from 'hooks';
import { useCallback } from 'react';
import {
  useUserStore,
  useSystemStore,
  useOtherReviewStore,
  useReviewStore,
} from 'stores';
import styled from 'styled-components';
import { signinApi } from 'utils/api';
import Router from 'next/router';
import Link from 'next/link';
import { Button, Box, TextField } from '@mui/material';

const CustomTextField = styled(TextField)`
  margin-bottom: 0.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const CustomA = styled.a`
  color: gray;
  &:hover {
    color: rgba(26, 13, 171, 0.75);
    cursor: pointer;
  }
`;

const LoginForm = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const loginAction = useUserStore((state) => state.loginAction);

  const [mail, onChangeMail] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');

  const { resetReviewAction } = useReviewStore((state) => state);
  const resetOtherReviewAction = useOtherReviewStore(
    (state) => state.resetReviewAction,
  );

  const onSubmitLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      startLoadingAction();
      try {
        const { uid, nickname, profile, introduce, accessToken, refreshToken } =
          await signinApi(mail, password);
        if (profile === 'NoImage') {
          //profile이미지가 없을 경우
          loginAction(
            uid,
            nickname,
            null,
            introduce,
            accessToken,
            refreshToken,
          );
        } else {
          loginAction(
            uid,
            nickname,
            profile,
            introduce,
            accessToken,
            refreshToken,
          );
        }
        resetReviewAction();
        resetOtherReviewAction();
        endLoadingAction();
        location.replace('/home');
      } catch (err) {
        endLoadingAction();
        alert(err);
      }
    },
    [mail, password],
  );

  const onSignupClick = useCallback(() => {
    Router.push('/member/signup');
  }, []);

  return (
    <>
      <Box
        style={{ textAlign: 'center', width: '14rem' }}
        component="form"
        onSubmit={onSubmitLogin}
      >
        <CustomTextField
          id="mail"
          label="mail"
          value={mail}
          type="email"
          onChange={onChangeMail}
          size="small"
          required
        />
        <CustomTextField
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          size="small"
          required
        />
        <br />
        <ButtonRow>
          <Button type="submit" color="primary" variant="contained">
            로 그 인
          </Button>
          <Button variant="outlined" onClick={onSignupClick}>
            회원가입
          </Button>
        </ButtonRow>
        <Line></Line>
        <Link href="/member/password">
          <CustomA>비밀번호 찾기</CustomA>
        </Link>
      </Box>
    </>
  );
};

export default LoginForm;
