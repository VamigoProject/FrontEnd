import { Spin } from 'antd';
import styled from 'styled-components';

const FullSize = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.ground(0.5)};
  z-index: 9999;
`;

const Centering = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Loading = () => {
  return (
    <FullSize>
      <Centering>
        <Spin size="large" />
      </Centering>
    </FullSize>
  );
};

export default Loading;
