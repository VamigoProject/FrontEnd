import styled from 'styled-components';
import { useRef, useState } from 'react';

const test = [...Array(100)];

interface Props {
  image: Array<string>;
}
const ImageView = ({ image }: Props) => {
  // const swipeRef = useRef<HTMLDivElement>(null);
  // const [currentPosition, setCurrentPosition] =

  return (
    <>
      <div></div>
    </>
    // <SlideWrapper ref={swipeRef}>
    //   <Item>
    //     {test.map((t, index) => (
    //       <Item key={index}>asdasdasd</Item>
    //     ))}
    //   </Item>
    // </SlideWrapper>
  );
};

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Item = styled.span`
  width: 20rem;
  height: 100%;
  background-color: blue;
  margin-right: 2rem;
`;

export default ImageView;
