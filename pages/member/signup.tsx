import type { NextPage } from 'next';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { Button, Form, Input, Radio, Select } from 'antd';
import { signupApi } from 'utils/api';
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
  background-color: rgb(230, 230, 230);
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

const FormWrapper = styled(Form)`
  width: 100%;
  height: 100%;
`;

const CustomLabel = styled.label`
  font-weight: bold;
`;

const CustomInput = styled(Input)`
  height: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CustomRadio = styled(Radio.Button)`
  margin-bottom: 1.5rem;
  margin-right: 0.25rem;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled(Button)`
  position: relative;
  left: 100%;
  transform: translate(-100%, 0);
  margin-bottom: 2rem;
`;

interface Item {
  value: string;
  display: string;
}

const { Option } = Select;

const signup: NextPage = () => {
  const { setMailAction } = useAuthStore((state) => state);
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const [mail, onChangeMail] = useInput('test@test.com');
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

  const [work, onChangeWork] = useInput([]);
  const workList: Array<Item> = [
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
  const onSubmit = async () => {
    try {
      await startLoadingAction();
      await signupApi(mail, nickname, password, mbti, sex, year, work, genre);

      setMailAction(mail);
      endLoadingAction();
      Router.push('/member/mailauth');
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
        <FormWrapper onFinish={onSubmit}>
          <CustomLabel htmlFor="mail">이메일</CustomLabel>
          <CustomInput
            name="mail"
            placeholder="vamigo@vamigo.com"
            value={mail}
            onChange={onChangeMail}
            maxLength={25}
            type="mail"
            required
          />
          <CustomLabel htmlFor="nickname">닉네임</CustomLabel>
          <CustomInput
            name="nickname"
            placeholder="nickname"
            value={nickname}
            onChange={onChangeNickname}
            maxLength={15}
            required
          />
          <CustomLabel htmlFor="password">패스워드</CustomLabel>
          <CustomInput
            name="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            maxLength={20}
            type="password"
            required
          />
          <CustomLabel htmlFor="passwordCheck">패스워드 확인</CustomLabel>
          <CustomInput
            name="passwordCheck"
            placeholder="password check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            maxLength={20}
            type="password"
            required
          />
          <CustomLabel>MBTI</CustomLabel>
          <br />
          <CustomSelect defaultValue={'None'} onChange={onChangeMbti}>
            {mbtiList.map((mbti) => (
              <Option key={mbti} value={mbti}>
                {mbti}
              </Option>
            ))}
          </CustomSelect>
          <br />
          <CustomLabel htmlFor="sex">성별</CustomLabel>
          <br />
          <Radio.Group
            name="sex"
            value={sex}
            onChange={onChangeSex}
            buttonStyle="solid"
            defaultValue="secret"
          >
            {sexList.map((sex) => (
              <CustomRadio key={sex.value} value={sex.value}>
                {sex.display}
              </CustomRadio>
            ))}
          </Radio.Group>
          <br />
          <CustomLabel>출생년도</CustomLabel>
          <br />
          <CustomSelect defaultValue={currentYear - 1} onChange={onChangeYear}>
            {yearList.map((year) => (
              <Option key={year} value={year}>
                {year}년
              </Option>
            ))}
          </CustomSelect>
          <br />
          <CustomLabel>선호작품</CustomLabel>
          <br />
          <CustomSelect onChange={onChangeWork} mode="multiple">
            {workList.map((work) => (
              <Option key={work.value} value={work.value}>
                {work.display}
              </Option>
            ))}
          </CustomSelect>
          <br />
          <CustomLabel>선호장르</CustomLabel>
          <br />
          <CustomSelect onChange={onChangeGenre} mode="multiple">
            {genreList.map((genre) => (
              <Option key={genre.value} value={genre.value}>
                {genre.display}
              </Option>
            ))}
          </CustomSelect>
          <br />
          <SubmitButton type="primary" htmlType="submit">
            회원가입
          </SubmitButton>
        </FormWrapper>
      </Centering>
    </Background>
  );
};

export default signup;
