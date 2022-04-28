import styled from 'styled-components';
import useColorSotre from 'stores/color';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
`;

const Header = () => {
  // const { headerColor } = useColorSotre((state) => state);
  const headerColor = '#4CAF50';

  return <HeaderWrapper color={headerColor}></HeaderWrapper>;
};

export default Header;
