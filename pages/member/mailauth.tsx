import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { MailTwoTone } from '@ant-design/icons';
import { COLOR_PRIMARY } from 'utils/statics';
import { useAuthStore } from 'stores/user';
import { useRef, useState, useEffect, useCallback } from 'react';
import useInput from 'hooks/useInput';
import Router from 'next/router';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgb(230, 230, 230);
`;

const Centering = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30rem;
  height: 20rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgb(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  padding: 1rem;
`;

const MailIcon = styled(MailTwoTone)`
  font-size: 4rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const BottomForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

const CustomInput = styled(Input)`
  width: 15rem;
  height: 1.5rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 5rem;
`;

const mailauth = () => {
  const mail = useAuthStore((state) => state.mail);
  const [code, onChangeCode] = useInput('');
  const [time, setTime] = useState(300);
  const timerId = useRef<any>(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    // if (mail === null) {
    //   //mail이 없을 경우 회원가입 절차를 제대로 거친것이 아니므로 초기화면으로 돌아감
    //   location.href = '/';
    //   alert('올바르지 않은 접근입니다.');
    // }
    return () => clearInterval(timerId.current);
  }, []);

  const onClickResend = useCallback(() => {
    alert('재전송합니당');
    clearInterval(timerId.current);
    setTime(300);
    timerId.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, []);

  const onSubmit = () => {
    alert('확인되었습니다');
    Router.push('/');
  };

  return (
    <Background>
      <Centering>
        <MailIcon twoToneColor={COLOR_PRIMARY} />
        <Line />
        <BottomForm onFinish={onSubmit}>
          <strong>{mail}</strong>로 인증메일을 발송하였습니다.
          <br />
          <CustomInput value={code} onChange={onChangeCode} />
          <span> {time}초 </span>
          <Button onClick={onClickResend} disabled={time > 280}>
            재전송
          </Button>
          <br />
          <SubmitButton type="primary" htmlType="submit">
            인증하기
          </SubmitButton>
        </BottomForm>
      </Centering>
    </Background>
  );
};

export default mailauth;
