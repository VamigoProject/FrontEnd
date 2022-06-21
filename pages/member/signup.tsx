import React, { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import { useInput } from 'hooks';
import styled from 'styled-components';
import Link from 'next/link';
import { TextField, Select, InputLabel, MenuItem, Button } from '@mui/material';
import { requestMailApi, signupApi, signupMailCheckApi } from 'utils/api';
import Router from 'next/router';
import { useSystemStore } from 'stores';

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
    timerId.current ?? clearTimeout(timerId.current!);
    intervalId.current ?? clearInterval(intervalId.current!);
  };

  useEffect(() => {
    return clearTimer;
  }, []);

  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const [mail, onChangeMail] = useInput<string>('', (e) => {
    setIsMailChecked(false);
    return e.target.value;
  });
  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const [isMailChecked, setIsMailChecked] = useState<boolean>(false);

  const onClickCheck = async () => {
    try {
      await signupMailCheckApi(mail);
      alert('사용가능한 메일입니다');
      setIsMailChecked(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const [code, onChangeCode] = useInput<string>('');
  const [codeButton, setCodeButton] = useState<string>('코드요청');
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClickCode = async () => {
    alert(`메일이 도착하기까지 시간이 걸릴 수 있습니다`);
    try {
      timerId.current = setTimeout(() => {
        clearTimer();
        setCodeButton('코드요청');
      }, 61000);
      setCodeButton('60');
      intervalId.current = setInterval(() => {
        setCodeButton((prev) => String(parseInt(prev) - 1));
      }, 1000);
      await requestMailApi(mail);
    } catch (error) {
      alert(error);
    }
  };

  const [nickname, onChangeNickname] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');
  const [passwordCheck, onChangePasswordCheck] = useInput<string>('');

  const [mbti, onChangeMbti] = useInput<string>('None');
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

  const [sex, onChangeSex] = useInput<string>('secret');
  const sexList: Array<Item> = [
    { value: 'female', display: '여자' },
    { value: 'male', display: '남자' },
    { value: 'secret', display: '비밀' },
  ];

  const now = new Date();
  const currentYear = now.getFullYear();
  const [year, onChangeYear] = useInput<number>(currentYear - 1);
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
            style={{ width: '77%' }}
            helperText="사용가능한 이메일을 입력해주세요"
            label="메일"
            value={mail}
            onChange={onChangeMail}
            error={!regEmail.test(mail)}
            type="email"
            size="small"
            required
            variant="outlined"
            inputProps={{ maxLength: 25 }}
          />
          <Button
            style={{ width: '23%' }}
            variant="contained"
            onClick={onClickCheck}
            disabled={!regEmail.test(mail)}
          >
            중복체크
          </Button>
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
              disabled={!isMailChecked || codeButton === '코드요청'}
              inputProps={{ maxLength: 9 }}
            />
            <Button
              style={{ width: '23%' }}
              variant="contained"
              onClick={onClickCode}
              disabled={
                codeButton !== '코드요청' ||
                !regEmail.test(mail) ||
                !isMailChecked
              }
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
            helperText="패스워드는 8자리 이상이여야합니다"
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
          <SignupButton
            style={{ marginBottom: '1rem' }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={
              !isMailChecked ||
              password !== passwordCheck ||
              password.length < 8 ||
              nickname === '' ||
              code === ''
            }
          >
            회원가입
          </SignupButton>
        </Form>
      </Centering>
    </Background>
  );
};

export default signup;
