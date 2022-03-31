const kakao = () => {
  let code;
  if (typeof window !== 'undefined') {
    code = new URL(window.location.href).searchParams.get('code');
  }

  return (
    <div>
      <div>kakao 확인용</div>
      <div>{`code : ${code}`}</div>
    </div>
  );
};
export default kakao;
