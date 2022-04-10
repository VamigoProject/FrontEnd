import { Input } from 'antd';
import styled from 'styled-components';
import { MailTwoTone } from '@ant-design/icons';
import { COLOR_PRIMARY } from 'utils/statics';
import { useAuthStore } from 'stores/user';
import { useEffect } from 'react';
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
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

const mailauth = () => {
  const mail = useAuthStore((state) => state.mail);

  // useEffect(() => {
  //   if (mail === null) {
  //     location.href = '/';
  //     alert('올바르지 않은 접근입니다.');
  //   }
  // }, []);

  return (
    <Background>
      <Centering>
        <MailIcon twoToneColor={COLOR_PRIMARY} />
        <Line />
        <BottomDiv>
          <strong>{mail}</strong>로 인증메일을 발송하였습니다.
        </BottomDiv>
      </Centering>
    </Background>
  );
};

export default mailauth;
