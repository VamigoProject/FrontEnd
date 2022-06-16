import styled, { keyframes } from 'styled-components';
import useTrendStore from 'stores/trend';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';
import Link from 'next/link';

const PopUp = keyframes`
  from{
    opacity: 0%;
    transform: translate(0, 75%);
  }
  to{
    opacity: 100%;
    transform: translate(0, 0);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
`;

const TrendWrapper = styled.div<{ animation: ReturnType<typeof keyframes> }>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 0.5rem;
  color: rgb(50, 50, 50);

  white-space: nowrap;
  text-overflow: ellipsis;

  transition: background-color 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    transition: backgroud-color 0.25s ease-in-out;
  }

  animation: ${(props) => props.animation} 0.75s ease-in-out 0s 1 normal;
`;

const Rating = styled.span`
  font-size: 1.25rem;
  width: 1.5rem;
  color: #4caf50;
`;

const TextBox = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.25rem;
  color: rgb(92, 92, 92);
`;

const Trend = () => {
  const { trendData } = useTrendStore((state) => state);
  return (
    <Wrapper>
      {trendData.map((trend: Work | undefined, index) => {
        if (!trend) {
          return <></>;
        } else {
          return (
            <Link href={`/work/${trend.id}`} key={trend.id}>
              <a>
                <TrendWrapper animation={PopUp}>
                  <Rating>
                    <strong>{index + 1}</strong>
                  </Rating>
                  {trend.category === 'book' && <MenuBookIcon />}
                  {trend.category === 'movie' && <LocalMoviesIcon />}
                  {trend.category === 'drama' && <LiveTvIcon />}
                  {trend.category === 'animation' && <AnimationIcon />}
                  <TextBox>{trend.name}</TextBox>
                </TrendWrapper>
              </a>
            </Link>
          );
        }
      })}
    </Wrapper>
  );
};

export default Trend;
