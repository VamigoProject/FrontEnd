import { AddReply } from 'components';
import DraftsIcon from '@mui/icons-material/Drafts';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-item: center;
`;

interface Props {
  reviewId: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  store: Function;
}

const EmptyReply = ({ reviewId, store }: Props) => {
  return (
    <div>
      <AddReply reviewId={reviewId} store={store} />
      <Row>
        <DraftsIcon sx={{ fontSize: 25 }} />
        <span>댓글이 존재하지 않습니다</span>
      </Row>
    </div>
  );
};

export default EmptyReply;
