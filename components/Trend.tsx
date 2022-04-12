import styled from 'styled-components';

const TrendWrapper = styled.div`
  width: 100%;
  height: 20rem;
  background-color: ${(props) => props.theme.colors.ground()};
`;

const Trend = () => {
  return (
    <TrendWrapper>
      <div>트렌드</div>
    </TrendWrapper>
  );
};

export default Trend;
