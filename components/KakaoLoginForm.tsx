import styled from 'styled-components';

const Button = styled.img`
  height: ${(props) => props.theme.length.largeComponentHeight};

  &:hover {
    cursor: pointer;
  }
`;

const KakaoLoginForm = () => {
  const CLIENT_ID = process.env.REST_API_KEY;
  const REDIRECT_URL = process.env.REDIRECT_URL;

  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const onClickButton = () => {
    location.href = KAKAO_URL;
  };

  return (
    <>
      <Button src={'/kakao_login_icon.png'} onClick={onClickButton} />
    </>
  );
};

export default KakaoLoginForm;
