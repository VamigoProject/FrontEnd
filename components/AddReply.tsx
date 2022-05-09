import { TextField, Box, Button } from '@mui/material';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import ProfileWithNickname from 'components/ProfileWithNickname';
import useUserStore from 'stores/user';
import { createReplyApi } from 'utils/api';
import { User } from 'utils/types';
import useReviewStore from 'stores/review';
import { useState } from 'react';

const Wrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ReplyField = styled(TextField)`
  width: calc(100% - 5rem);
`;

interface Props {
  reviewId: number;
}

const AddReply = ({ reviewId }: Props) => {
  const createReplyAction = useReviewStore((state) => state.createReplyAction);

  const { profile, nickname } = useUserStore((state) => state);
  const myId = useUserStore((state) => state.uid);

  const [comment, setComment] = useState<string>('');
  const onChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const replyId: number = await createReplyApi(reviewId, myId!, comment);
      createReplyAction(
        reviewId,
        replyId,
        { uid: myId!, nickname: nickname!, profile: profile },
        comment,
      );
      setComment('');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      <ProfileWithNickname
        size="small"
        nickname={nickname!}
        profile={profile}
      />
      <Box
        // component="form"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        // onSubmit={onSubmit}
      >
        <ReplyField
          variant="outlined"
          value={comment}
          placeholder="댓글"
          onChange={onChangeComment}
          size="small"
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
          }}
          spellCheck={false}
        />
        <Button variant="contained" onClick={onSubmit}>
          입력
        </Button>
      </Box>
    </Wrapper>
  );
};

export default AddReply;
