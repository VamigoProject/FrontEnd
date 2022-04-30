import styled from 'styled-components';
import ScrollHorizontal from 'react-scroll-horizontal';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Item = styled.span`
  width: 20rem;
  height: 2rem;
  background-color: blue;
  margin-right: 2rem;
`;

const test = [...Array(100)];

interface Props {
  image: Array<string>;
}
const ImageView = ({ image }: Props) => {
  return (
    <Wrapper>
      <ScrollHorizontal>
        {test.map((t, index) => (
          <Item key={index}>asdasdasd</Item>
        ))}
      </ScrollHorizontal>
    </Wrapper>
  );
};

export default ImageView;
