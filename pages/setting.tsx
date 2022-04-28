import React from 'react';
import ContentBox from 'components/ContentBox';
import useColorStore from 'stores/color';
import ColorPicker from 'material-ui-color-picker';
import styled from 'styled-components';
import LockResetIcon from '@mui/icons-material/LockReset';

const HoverWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SpaceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

interface Props {
  children: React.ReactNode;
  space?: any;
  onClick?: () => void;
}

const ColorWrapper = styled.div`
  display: inline-block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
`;

const VerticalLine = styled.span`
  width: 2px;
  height: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Row = ({ children, space, onClick }: Props) => {
  if (onClick) {
    return (
      <HoverWrapper onClick={onClick}>
        <ContentBox>
          {space && <SpaceWrapper>{children}</SpaceWrapper>}
          {!space && <Wrapper>{children}</Wrapper>}
        </ContentBox>
      </HoverWrapper>
    );
  } else {
    return (
      <ContentBox>
        {space && <SpaceWrapper>{children}</SpaceWrapper>}
        {!space && <Wrapper>{children}</Wrapper>}
      </ContentBox>
    );
  }
};

const setting = () => {
  const {
    headerColor,
    bodyColor,
    sideColor,
    setHeaderColor,
    setBodyColor,
    setSideColor,
  } = useColorStore((state) => state);

  const onChangeHeaderColor = (color: string) => {
    setHeaderColor(color);
  };
  const onChangeBodyColor = (color: string) => {
    setBodyColor(color);
  };
  const onChangeSideColor = (color: string) => {
    setSideColor(color);
  };

  const onClickChangePassword = () => {
    alert('비밀번호 변경');
  };

  return (
    <>
      <Row space>
        <ColorWrapper>
          <ColorPicker
            label="Header Color"
            name="body"
            value={headerColor}
            onChange={(e) => onChangeHeaderColor(e)}
          />
        </ColorWrapper>
        <ColorWrapper>
          <ColorPicker
            label="Background Color"
            name="body"
            value={bodyColor}
            onChange={(e) => onChangeBodyColor(e)}
          />
        </ColorWrapper>
        <ColorWrapper>
          <ColorPicker
            label="Side Color"
            name="sidebox"
            value={sideColor}
            onChange={(e) => onChangeSideColor(e)}
          />
        </ColorWrapper>
      </Row>

      <Row onClick={onClickChangePassword}>
        <LockResetIcon fontSize="large" />
        <VerticalLine />
        비밀번호 변경
      </Row>
    </>
  );
};

export default setting;
