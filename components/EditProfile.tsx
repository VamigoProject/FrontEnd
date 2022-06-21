import useInput from 'hooks/useInput';
import Resizer from 'react-image-file-resizer';
import { FileUploader } from 'react-drag-drop-files';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import ProfileAvatar from './common/ProfileAvatar';
import useUserStore from 'stores/user';
import useSystemStore from 'stores/system';
import { useState } from 'react';
import { updateProfileApi } from 'utils/api';

const resizeFile = (file: any, setAfterProfile: any) => {
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      128,
      128,
      'png',
      100,
      0,
      (uri) => {
        if (typeof uri === 'string')
          setAfterProfile(uri.replace(/^data:image\/[a-z]+;base64,/, ''));
      },
      'base64',
    );
  });
};

const Wrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const UpdateButton = styled(Button)`
  position: relative;
  left: 100%;
  transform: translate(-100%, 0);
`;

const EditProfile = () => {
  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );
  const { uid, nickname, profile, introduce, updateAction } = useUserStore(
    (state) => state,
  );

  const [afterNickname, onChangeAfterNickname] = useInput(nickname);
  const [afterProfile, setAfterProfile] = useState(profile);
  const [afterIntroduce, onChangeAfterIntroduce] = useInput(introduce);

  const onChangeFile = async (f: any) => {
    await resizeFile(f, setAfterProfile);
  };

  const onClickUpdate = async () => {
    startLoadingAction();
    try {
      await updateProfileApi(uid!, afterNickname, afterProfile, afterIntroduce);
      updateAction(afterNickname, afterProfile, afterIntroduce);
      endLoadingAction();
      alert('성공적으로 업데이트 하였습니다');
      window.location.href = '/member/profile';
    } catch (err) {
      endLoadingAction();
      alert(err);
    }
  };

  return (
    <Wrapper>
      <FileUploader
        handleChange={onChangeFile}
        name="file"
        types={['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']}
        maxSize={20}
      />
      <PreviewWrapper>
        <ProfileAvatar
          nickname={nickname!}
          profile={afterProfile}
          size="small"
        />
        <ProfileAvatar
          nickname={nickname!}
          profile={afterProfile}
          size="medium"
        />
        <ProfileAvatar
          nickname={nickname!}
          profile={afterProfile}
          size="large"
        />
        <ProfileAvatar
          nickname={nickname!}
          profile={afterProfile}
          size="xLarge"
        />
      </PreviewWrapper>
      <TextField
        label="닉네임"
        value={afterNickname}
        onChange={onChangeAfterNickname}
        size="small"
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="자기소개"
        value={afterIntroduce}
        onChange={onChangeAfterIntroduce}
        size="small"
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <UpdateButton variant="contained" onClick={onClickUpdate}>
        업데이트
      </UpdateButton>
    </Wrapper>
  );
};

export default EditProfile;
