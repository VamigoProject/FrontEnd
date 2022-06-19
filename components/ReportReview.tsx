import styled from 'styled-components';
import { useInput } from 'hooks';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { reportReviewApi } from 'utils/api';
import { useUserStore } from 'stores';

interface ReportReviewTypes {
  onClose: () => void;
  spoiler: boolean;
  reviewId: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

const ReportReview = ({ onClose, spoiler, reviewId }: ReportReviewTypes) => {
  const { uid } = useUserStore((state) => state);
  const [spoilerChecked, onChangeSpoilerChecked] = useInput<boolean>(
    false,
    (e) => {
      return e.target.checked;
    },
  );
  const [eroChecked, onChangeEroChecked] = useInput<boolean>(false, (e) => {
    return e.target.checked;
  });
  const [curseChecked, onChangeCurseChecked] = useInput<boolean>(false, (e) => {
    return e.target.checked;
  });
  const [etcChecked, onChangeEtcChecked] = useInput<boolean>(false, (e) => {
    return e.target.checked;
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await reportReviewApi(
        uid!,
        reviewId,
        spoilerChecked,
        eroChecked,
        curseChecked,
        etcChecked,
      );
      alert('정삭적으로 신고하였습니다');
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
        <FormGroup>
          <FormControlLabel
            label="스포일러"
            disabled={spoiler}
            control={
              <Checkbox
                checked={spoilerChecked}
                onChange={onChangeSpoilerChecked}
              />
            }
          />
          <FormControlLabel
            label="음란성"
            control={
              <Checkbox checked={eroChecked} onChange={onChangeEroChecked} />
            }
          />
          <FormControlLabel
            label="욕설 및 비방"
            control={
              <Checkbox
                checked={curseChecked}
                onChange={onChangeCurseChecked}
              />
            }
          />
          <FormControlLabel
            label="기타"
            control={
              <Checkbox checked={etcChecked} onChange={onChangeEtcChecked} />
            }
          />
        </FormGroup>
        <ButtonWrapper>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={
              !spoilerChecked && !eroChecked && !curseChecked && !etcChecked
            }
          >
            신고
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Box>
  );
};

export default ReportReview;
