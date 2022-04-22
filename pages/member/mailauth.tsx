import styled from 'styled-components';
import { useAuthStore } from 'stores/user';
import { useRef, useState, useEffect, useCallback } from 'react';
import useInput from 'hooks/useInput';
import Router from 'next/router';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Button, Box, TextField } from '@mui/material';
import useSystemStore from 'stores/system';
import { mailAuthApi } from 'utils/api';

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

// const MailIcon = styled(MailTwoTone)`
//   font-size: 4rem;
// `;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const BottomForm = styled(Box)`
  width: 100%;
  height: 100%;
`;

const CustomInput = styled(TextField)`
  width: 15rem;
  height: 1.5rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 5rem;
`;

const mailauth = () => {
  const mail = 'lwc421@gmail.com';
  // const mail = useAuthStore((state) => state.mail);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
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

  const onSubmit = async () => {
    alert('메일인증시작');
    startLoadingAction();
    try {
      await mailAuthApi(mail, code);
      endLoadingAction();
      alert('확인되었습니다');
      Router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Background>
      <Centering>
        <DraftsIcon sx={{ fontSize: 50 }} />
        <Line />
        <BottomForm component="form" onSubmit={onSubmit}>
          <strong>{mail}</strong>로 인증메일을 발송하였습니다.
          <br />
          <CustomInput size="small" value={code} onChange={onChangeCode} />
          <span> {time}초 </span>
          <Button
            onClick={onClickResend}
            variant="outlined"
            disabled={time > 280}
          >
            재전송
          </Button>
          <br />
          <SubmitButton type="submit" color="primary" variant="contained">
            인증하기
          </SubmitButton>
        </BottomForm>
      </Centering>
    </Background>
  );
};

export default mailauth;
