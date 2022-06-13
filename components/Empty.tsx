import DraftsIcon from '@mui/icons-material/Drafts';
import { ContentBox } from 'components/common';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

interface EmptyTypes {
  message?: string;
  size?: number;
}

const Empty = ({
  message = '표시가능한 리뷰가 없습니다',
  size = 50,
}: EmptyTypes) => {
  return (
    <ContentBox>
      <Wrapper>
        <div>
          <DraftsIcon sx={{ fontSize: size }} />
        </div>
        <strong>{message}</strong>
      </Wrapper>
    </ContentBox>
  );
};

export default Empty;
