import ColorPicker from 'material-ui-color-picker';
import useInput from 'hooks/useInput';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
`;

const Header = () => {
  const [color, onChangeColor] = useInput('#4CAF50');

  return (
    <HeaderWrapper color={color}>
      <span>
        <ColorPicker
          label="Header색깔"
          name="color"
          value={color}
          onChange={(e) => onChangeColor(e)}
        />
      </span>
    </HeaderWrapper>
  );
};

export default Header;
