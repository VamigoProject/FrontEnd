import { Form, Input, Button } from 'antd';
import useInput from 'hooks/useInput';
import { useCallback } from 'react';
import useUserStore from 'stores/user';
import styled from 'styled-components';
import { signinApi } from 'utils/api';
import Router from 'next/router';
import Link from 'next/link';

const FormWrapper = styled(Form)`
  text-align: center;
`;

const InputCustom = styled(Input)`
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled(Button)`
  width: 5.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
  }
`;

const LoginForm = () => {
  const loginAction = useUserStore((state) => state.loginAction);

  const [mail, onChangeMail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitLogin = useCallback(async () => {
    try {
      const { uid, nickname, accessToken, refreshToken } = await signinApi(
        mail,
        password,
      );
      loginAction(uid, nickname, accessToken, refreshToken);
      Router.push('/home');
    } catch (err) {
      alert(err);
    }
  }, [mail, password]);

  const onSignupClick = useCallback(() => {
    Router.push('/member/signup');
  }, []);

  return (
    <div>
      <FormWrapper onFinish={onSubmitLogin}>
        <InputCustom
          name="mail"
          value={mail}
          onChange={onChangeMail}
          width="12rem"
          type="email"
          placeholder="vamigo@mail.com"
          required
        />
        <br />
        <InputCustom
          name="password"
          value={password}
          type="password"
          onChange={onChangePassword}
          width="12rem"
          placeholder="password"
          required
        />
        <br />
        <ButtonRow>
          <ButtonWrapper type="primary" loading={false} htmlType="submit">
            로 그 인
          </ButtonWrapper>
          <ButtonWrapper type="default" onClick={onSignupClick}>
            회원가입
          </ButtonWrapper>
        </ButtonRow>
        <Line></Line>
        <Link href="/member/password">
          <CustomA>비밀번호 찾기</CustomA>
        </Link>
      </FormWrapper>
    </div>
  );
};

export default LoginForm;
