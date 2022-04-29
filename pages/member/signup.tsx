import React, { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { TextField, Select, InputLabel, MenuItem, Button } from '@mui/material';
import { requestMailApi, signupApi } from 'utils/api';
import Router from 'next/router';
import { useAuthStore } from 'stores/user';
import useSystemStore from 'stores/system';

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
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const CustomTextField = styled(TextField)`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const CustomSelect = styled(Select)`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const SignupButton = styled(Button)`
  display: relative;
  left: 100%;
  transform: translate(-100%, 0);
`;

interface Item {
  value: string;
  display: string;
}

const signup: NextPage = () => {
  const clearTimer = () => {
    clearTimeout(timerId.current);
    clearInterval(intervalId.current);
  };

  useEffect(() => {
    return clearTimer();
  }, []);

  const { setMailAction } = useAuthStore((state) => state);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const [mail, onChangeMail] = useInput('test@test.com');
  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const [code, onChangeCode] = useInput('');
  const [codeButton, setCodeButton] = useState<string | number>('코드요청');
  const timerId = useRef<any>();
  const intervalId = useRef<any>();

  const onClickCode = async () => {
    await startLoadingAction();
    try {
      await requestMailApi(mail);
      alert(`${mail}로 인증코드를 발송하였습니다`);
      timerId.current = setTimeout(() => {
        clearTimer();
        setCodeButton('코드요청');
      }, 61000);
      setCodeButton(60);
      intervalId.current = setInterval(() => {
        setCodeButton((prev) => prev - 1);
      }, 1000);
    } catch (error) {
      alert(error);
    }
    await endLoadingAction();
  };

  const [nickname, onChangeNickname] = useInput('nickname_test');
  const [password, onChangePassword] = useInput('1q2w3e4r');
  const [passwordCheck, onChangePasswordCheck] = useInput('1q2w3e4r');

  const [mbti, onChangeMbti] = useInput('None');
  const mbtiList: Array<string> = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
    'None',
  ];

  const [sex, onChangeSex] = useInput('secret');
  const sexList: Array<Item> = [
    { value: 'female', display: '여자' },
    { value: 'male', display: '남자' },
    { value: 'secret', display: '비밀' },
  ];

  const now = new Date();
  const currentYear = now.getFullYear();
  const [year, onChangeYear] = useInput(currentYear - 1);
  const yearList: Array<number> = [...Array(100)].map(
    (_, index) => currentYear - index - 1,
  );

  const [category, onChangeCategory] = useInput([]);
  const categoryList: Array<Item> = [
    { value: 'movie', display: '영화' },
    { value: 'book', display: '책' },
    { value: 'game', display: '게임' },
    { value: 'animation', display: '애니메이션' },
  ];

  const [genre, onChangeGenre] = useInput([]);
  const genreList: Array<Item> = [
    { value: 'drama', display: '드라마' },
    { value: 'sf', display: 'SF' },
    { value: 'action', display: '액션' },
    { value: 'mystery', display: '미스터리' },
    { value: 'thriller', display: '스릴러' },
    { value: 'rpg', display: 'RPG' },
    { value: 'fps', display: 'FPS' },
    { value: 'simulation', display: '시뮬레이션' },
    { value: 'adventure', display: '어드벤처' },
    { value: 'racing', display: '레이싱' },
  ];

  //회원가입 버튼을 누를 경우
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regEmail.test(mail) || password !== passwordCheck) {
      alert('메일 또는 패스워드를 확인해주세요');
      return;
    }
    try {
      await startLoadingAction();
      await signupApi(
        mail,
        code,
        nickname,
        password,
        mbti,
        sex,
        year,
        category,
        genre,
      );

      setMailAction(mail);
      endLoadingAction();
      alert('회원가입을 축하합니다');
      Router.push('/');
    } catch (error) {
      endLoadingAction();
      alert(error);
    }
  };

  return (
    <Background>
      <Centering>
        <Link href="/">
          <a>
            <Logo>Vamigo</Logo>
          </a>
        </Link>
        <Form onSubmit={onSubmit} noValidate>
          <CustomTextField
            id="mail"
            helperText="사용가능한 이메일을 입력해주세요"
            label="메일"
            value={mail}
            onChange={onChangeMail}
            error={!regEmail.test(mail)}
            type="email"
            size="small"
            required
            variant="outlined"
          />
          <br />
          <div>
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
            />
            <Button
              style={{ width: '23%' }}
              variant="outlined"
              onClick={onClickCode}
              disabled={codeButton !== '코드요청' || !regEmail.test(mail)}
            >
              {codeButton !== '코드요청' && codeButton}
              {codeButton === '코드요청' && '코드요청'}
            </Button>
          </div>
          <br />
          <CustomTextField
            id="nickname"
            helperText="표출될 닉네임을 설정해주세요"
            label="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            inputProps={{ maxLength: 15 }}
            size="small"
            required
            variant="outlined"
            autoComplete="off"
          />
          <br />
          <CustomTextField
            id="password"
            label="패스워드"
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
          <br />
          <InputLabel id="mbti">MBTI</InputLabel>
          <CustomSelect
            labelId="mbti"
            onChange={onChangeMbti}
            value={mbti}
            size="small"
            required
          >
            {mbtiList.map((mbti) => (
              <MenuItem key={mbti} value={mbti}>
                {mbti}
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          <InputLabel id="sex">성별</InputLabel>
          <CustomSelect
            labelId="sex"
            value={sex}
            onChange={onChangeSex}
            size="small"
            required
          >
            {sexList.map((sex) => (
              <MenuItem key={sex.value} value={sex.value}>
                {sex.display}
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          <InputLabel id="year">출생년도</InputLabel>
          <CustomSelect
            labelId="year"
            value={year}
            onChange={onChangeYear}
            size="small"
            required
          >
            {yearList.map((year) => (
              <MenuItem key={year} value={year}>
                {year}년
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          <InputLabel id="category">선호작품</InputLabel>
          <CustomSelect
            labelId="category"
            value={category}
            onChange={onChangeCategory}
            size="small"
            multiple
          >
            {categoryList.map((w) => (
              <MenuItem key={w.value} value={w.value}>
                {w.display}
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          <InputLabel id="genre">선호장르</InputLabel>
          <CustomSelect
            labelId="genre"
            value={genre}
            onChange={onChangeGenre}
            size="small"
            multiple
          >
            {genreList.map((g) => (
              <MenuItem key={g.value} value={g.value}>
                {g.display}
              </MenuItem>
            ))}
          </CustomSelect>
          <br />
          <br />
          <SignupButton type="submit" color="primary" variant="contained">
            회원가입
          </SignupButton>
        </Form>
      </Centering>
    </Background>
  );
};

export default signup;
