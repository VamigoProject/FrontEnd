import styled from 'styled-components';
import React from 'react';

interface Props {
  opacity?: number;
  padding?: string;
  children?: React.ReactNode;
}

const Box = styled.div<Props>`
  width: 100%;
  height: 100%;
  background-color: rgb(250, 250, 250);
  border-radius: 0.15rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, ${(props) => props.opacity}),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    0 4px 6px rgb(0, 0, 0, ${(props) => props.opacity! / 2});
  margin-bottom: 0.5rem;
  padding: ${(props) => props.padding};
`;

const ContentBox = ({ opacity = 0.1, padding = '0', children }: Props) => {
  return (
    <Box opacity={opacity!} padding={padding}>
      {children}
    </Box>
  );
};

export default ContentBox;
