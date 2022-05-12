import styled from 'styled-components';
import useTrendStore from 'stores/trend';
import { Work } from 'utils/types';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AnimationIcon from '@mui/icons-material/Animation';

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
`;

const TrendWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  color: rgb(50, 50, 50);

  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TextBox = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.25rem;
  font-size: 1.2rem;
`;

const Trend = () => {
  const { trendData } = useTrendStore((state) => state);

  return (
    <Wrapper>
      {trendData.map((trend: Work, index) => (
        <TrendWrapper key={trend.id + '_' + index}>
          {trend.category === 'book' && <MenuBookIcon />}
          {trend.category === 'movie' && <LocalMoviesIcon />}
          {trend.category === 'drama' && <LiveTvIcon />}
          {trend.category === 'animation' && <AnimationIcon />}
          <TextBox>{trend.name}</TextBox>
        </TrendWrapper>
      ))}
    </Wrapper>
  );
};

export default Trend;
