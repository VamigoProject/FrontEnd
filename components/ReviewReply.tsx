import { Reply } from 'utils/types';
import AddReply from 'components/AddReply';
import ReplyView from 'components/ReplyView';
import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  reviewId: number;
  Reply: Array<Reply>;
}

const ReviewPost = ({ reviewId, Reply }: Props) => {
  return (
    <>
      <div>
        <AddReply />
        {Reply.map((reply) => (
          <ReplyView
            key={reviewId + '_' + reply.replyId}
            reviewId={reviewId}
            reply={reply}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewPost;
