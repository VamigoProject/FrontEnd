import { TextField, Box, Button } from '@mui/material';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import ProfileWithNickname from 'components/ProfileWithNickname';
import useUserStore from 'stores/user';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Form = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const ReplyField = styled(TextField)`
  width: calc(100% - 5rem);
`;

const AddReply = () => {
  const { profile, nickname } = useUserStore((state) => state);
  const [reply, onChangeReply] = useInput('');

  return (
    <Wrapper>
      <ProfileWithNickname
        size="medium"
        nickname={nickname!}
        profile={profile}
      />
      <Form component="form">
        <ReplyField
          variant="outlined"
          value={reply}
          placeholder="댓글"
          onChange={onChangeReply}
          size="small"
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
          }}
          spellCheck={false}
        />
        <Button variant="contained">입력</Button>
      </Form>
    </Wrapper>
  );
};

export default AddReply;
