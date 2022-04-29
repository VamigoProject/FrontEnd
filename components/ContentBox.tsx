import styled from 'styled-components';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(250, 250, 250);
  border-radius: 0.15rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 4px 6px rgb(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
`;

const ContentBox = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default ContentBox;
