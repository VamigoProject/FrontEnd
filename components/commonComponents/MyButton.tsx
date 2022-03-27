import * as antd from 'antd';
import React from 'react';
import styled from 'styled-components';

interface RequiredProps {
  size: 'large' | 'medium' | 'small';
}

interface OptionalProps {
  type: 'normal' | 'primary';
  children: React.ReactNode;
}

interface Props extends RequiredProps, OptionalProps {}

const defaultProps: OptionalProps = {
  type: 'normal',
  children: '',
};

interface ButtonProps {
  height: string;
}

const CustomButton = styled(antd.Button)<ButtonProps>`
  height: ${(props) => props.height};
  background-color: ${(props) => props.theme.colors.primary};
`;

const MyButton = ({ size, children, type }: Props) => {
  let height = '';
  if (size === 'large') height = '2.4rem';
  else if (size === 'medium') height = '2.1rem';
  else if (size === 'small') height = '1.6rem';

  return (
    <>
      <CustomButton height={height}>{children}</CustomButton>
    </>
  );
};

MyButton.defaultProps = defaultProps;

export default MyButton;
