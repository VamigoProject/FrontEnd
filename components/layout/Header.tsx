import styled from 'styled-components';
import Router from 'next/router';
import SearchBar from 'components/SearchBar';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  const goHome = () => {
    Router.push('/home');
  };

  return (
    <HeaderWrapper>
      <Logo onClick={goHome}>Vamigo</Logo>
      <SearchBar />
    </HeaderWrapper>
  );
};

export default Header;
