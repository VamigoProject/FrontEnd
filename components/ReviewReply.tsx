import { Reply } from 'utils/types';
import AddReply from 'components/AddReply';
import ReplyView from 'components/ReplyView';
import { useEffect } from 'react';

interface Props {
  reviewId: number;
  reply: Array<Reply>;
}

const ReviewReply = ({ reviewId, reply }: Props) => {
  return (
    <>
      <div>
        <AddReply reviewId={reviewId} />
        {reply.map((r) => (
          <ReplyView key={r.replyId} reviewId={reviewId} reply={r} />
        ))}
      </div>
    </>
  );
};

export default ReviewReply;
