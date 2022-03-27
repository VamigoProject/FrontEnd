import MyButton from 'components/commonComponents/MyButton';
import type { NextPage } from 'next';

const signup: NextPage = () => {
  return (
    <div>
      <div>회원가입예정</div>
      <MyButton size="large">큰크기</MyButton>
      <MyButton size="medium">중간크기</MyButton>
      <MyButton size="small">작은크기</MyButton>
    </div>
  );
};

export default signup;
