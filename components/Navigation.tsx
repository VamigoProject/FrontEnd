import styled from 'styled-components';

const NavigationWrapper = styled.div`
  width: 100%;
  height: 20rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.ground()};
`;

const Navigation = () => {
  return (
    <NavigationWrapper>
      <div>네비게이션</div>
    </NavigationWrapper>
  );
};

export default Navigation;
