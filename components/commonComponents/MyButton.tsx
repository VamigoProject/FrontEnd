import * as antd from 'antd';
import React from 'react';
import styled from 'styled-components';

// interface RequiredProps {
//   size: 'large' | 'medium' | 'small';
// }

interface OptionalProps {
  size: 'large' | 'medium' | 'small';
  type: 'normal' | 'primary';
  children: React.ReactNode;
}

// interface Props extends RequiredProps, OptionalProps {}

type Props = OptionalProps;

const defaultProps: OptionalProps = {
  size: 'medium',
  type: 'normal',
  children: '',
};

interface ButtonProps {
  height: string;
}

const CustomButton = styled(antd.Button)<ButtonProps>`
  height: ${(props) => props.theme.length.componentHeight(props.height)};
  background-color: ${(props) => props.theme.colors.primary};
`;

const MyButton = ({ size, children, type }: Props) => {
  return (
    <>
      <CustomButton height={size}>{children}</CustomButton>
    </>
  );
};

MyButton.defaultProps = defaultProps;

export default MyButton;
