import React from 'react';
import styled from 'styled-components';

// interface RequiredProps {
//   size: 'large' | 'medium' | 'small';
// }

interface OptionalProps {
  children: React.ReactNode;
  size: 'large' | 'medium' | 'small';
  primary: boolean;
  onClick: () => void;
}

// interface Props extends RequiredProps, OptionalProps {}

type Props = OptionalProps;

const defaultProps: OptionalProps = {
  children: '',
  size: 'medium',
  primary: false,
  onClick: () => {
    return;
  },
};

interface ButtonProps {
  size: string;
  primary: boolean;
}

const CustomButton = styled.button<ButtonProps>`
  height: ${(props) => props.theme.length.componentHeight(props.size)};
  background-color: ${(props) => props.theme.colors.getColor(props.primary)};
  border-radius: 5%;
  border: 0px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  border: 1px ${(props) => props.theme.colors.primary} solid;
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-size: small;

  transition: border 0.5s, opacity 0.5s, background-color 0.5s, color 0.5s;

  &:hover {
    cursor: pointer;
    border: 1px ${(props) => props.theme.colors.primary} solid;
    color: ${(props) => (props.primary ? 'white' : props.theme.colors.primary)};
    opacity: 0.8;
  }
`;

const MyButton = ({ children, size, primary, onClick }: Props) => {
  return (
    <>
      <CustomButton size={size} primary={primary} onClick={onClick}>
        {children}
      </CustomButton>
    </>
  );
};

MyButton.defaultProps = defaultProps;

export default MyButton;
