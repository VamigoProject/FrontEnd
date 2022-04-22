import DraftsIcon from '@mui/icons-material/Drafts';
import ContentBox from './ContentBox';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Empty = () => {
  return (
    <ContentBox>
      <Wrapper>
        <div>
          <DraftsIcon sx={{ fontSize: 50 }} />
        </div>
        <strong>표시가능한 리뷰가 없습니다</strong>
      </Wrapper>
    </ContentBox>
  );
};

export default Empty;
