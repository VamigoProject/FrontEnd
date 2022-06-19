import { Trend } from 'components/layout';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f1f8e9;
`;

const trend = () => {
  return (
    <Wrapper>
      <Trend />
    </Wrapper>
  );
};

export default trend;
