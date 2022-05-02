import { Reply } from 'utils/types';
import AddReply from 'components/AddReply';
import ReplyView from 'components/ReplyView';

interface Props {
  reviewId: number;
  reply: Array<Reply>;
}

const ReviewPost = ({ reviewId, reply }: Props) => {
  return (
    <>
      <div>
        <AddReply />
        {reply.map((r) => (
          <ReplyView
            key={reviewId + '_' + r.replyId}
            reviewId={reviewId}
            reply={r}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewPost;
