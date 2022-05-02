import styled from 'styled-components';
import Router from 'next/router';
import SearchBar from 'components/SearchBar';
import useColorSotre from 'stores/color';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Logo = styled.h2`
  margin: 0;
  &:hover {
    color: rgb(70, 70, 70);
    cursor: pointer;
  }
`;

const Header = () => {
  // const { headerColor } = useColorSotre((state) => state);
  const headerColor = '#4CAF50';

  const goHome = () => {
    Router.push('/home');
  };

  return (
    <HeaderWrapper color={headerColor}>
      <Logo onClick={goHome}>Vamigo</Logo>
      <SearchBar />
    </HeaderWrapper>
  );
};

export default Header;
