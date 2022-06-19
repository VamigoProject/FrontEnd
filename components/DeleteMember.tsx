import { useInput } from 'hooks';
import { useUserStore } from 'stores';
import { Box, Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { memberDeleteApi } from 'utils/api';

interface DeleteMemberTypes {
  onClose: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
`;

const DeleteMember = ({ onClose }: DeleteMemberTypes) => {
  const router = useRouter();
  const { uid, logoutAction } = useUserStore((state) => state);
  const [password, onChangePassword] = useInput<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await memberDeleteApi(uid!, password);
      logoutAction();
      alert('정삭적으로 탈퇴되었습니다');
      router.push('/');
      onClose();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
    >
      <Wrapper>
        <TextField
          id="password"
          value={password}
          label="비밀번호"
          type="password"
          onChange={onChangePassword}
          size="medium"
          required
        />
      </Wrapper>
      <ButtonWrapper>
        <Button type="submit" variant="contained" color="error">
          삭제
        </Button>
      </ButtonWrapper>
    </Box>
  );
};

export default DeleteMember;
