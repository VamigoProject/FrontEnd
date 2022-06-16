import { Reply } from 'utils/types';
import AddReply from 'components/AddReply';
import ReplyView from 'components/ReplyView';
import { useEffect } from 'react';

interface Props {
  reviewId: number;
  reply: Array<Reply>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  store: Function;
}

const ReviewReply = ({ reviewId, reply, store }: Props) => {
  return (
    <>
      <div>
        <AddReply reviewId={reviewId} store={store} />
        {reply.map((r) => (
          <ReplyView
            key={r.replyId}
            reviewId={reviewId}
            reply={r}
            store={store}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewReply;
