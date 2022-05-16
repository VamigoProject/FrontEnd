import useInput from 'hooks/useInput';
import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { changePasswordApi } from 'utils/api';
import useUserStore from 'stores/user';

interface PasswordChangeTypes {
  onClose: () => void;
}

const PasswordChange = ({ onClose }: PasswordChangeTypes) => {
  const { uid } = useUserStore((state) => state);
  const [beforePassword, onChangeBeforePassword] = useInput('');
  const [afterPassword, onChangeAfterPassword] = useInput('');
  const [afterPasswordCheck, onChangeAfterPassowordCheck] = useInput('');

  const onChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (afterPassword !== afterPasswordCheck) {
        throw '비밀번호 체크가 잘못되었습니다';
      }
      await changePasswordApi(uid!, beforePassword, afterPassword);
      alert('비밀번호가 성공적으로 변경되었습니다');
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onChangePassword(e)}
    >
      <Wrapper>
        <TextField
          id="before"
          value={beforePassword}
          label="현재 비밀번호"
          type="password"
          onChange={onChangeBeforePassword}
          size="small"
          required
        />
        <TextField
          id="after"
          value={afterPassword}
          label="변경할 비밀번호"
          type="password"
          onChange={onChangeAfterPassword}
          size="small"
          required
        />
        <div>
          <TextField
            id="afterCheck"
            value={afterPasswordCheck}
            label="변경할 비밀번호 체크"
            type="password"
            onChange={onChangeAfterPassowordCheck}
            size="small"
            required
          />
          {afterPassword !== afterPasswordCheck && (
            <CheckWrapper>비밀번호가 다릅니다</CheckWrapper>
          )}
        </div>
        <Button type="submit" variant="contained">
          변경
        </Button>
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CheckWrapper = styled.div`
  font-size: 0.5rem;
  color: red;
`;

export default PasswordChange;
