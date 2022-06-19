import React, { useState } from 'react';
import { Dialog, ContentBox, PasswordChange, DeleteMember } from 'components';
import styled from 'styled-components';
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const HoverWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SpaceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

interface Props {
  children: React.ReactNode;
  space?: any;
  onClick?: () => void;
}

const VerticalLine = styled.span`
  width: 2px;
  height: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Row = ({ children, space, onClick }: Props) => {
  if (onClick) {
    return (
      <HoverWrapper onClick={onClick}>
        <ContentBox>
          {space && <SpaceWrapper>{children}</SpaceWrapper>}
          {!space && <Wrapper>{children}</Wrapper>}
        </ContentBox>
      </HoverWrapper>
    );
  } else {
    return (
      <ContentBox>
        {space && <SpaceWrapper>{children}</SpaceWrapper>}
        {!space && <Wrapper>{children}</Wrapper>}
      </ContentBox>
    );
  }
};

const setting = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const onPasswordClose = () => {
    setIsPasswordOpen(false);
  };
  const onClickChangePassword = () => {
    setIsPasswordOpen(true);
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const onDeleteClose = () => {
    setIsDeleteOpen(false);
  };
  const onClickDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <Row onClick={onClickChangePassword}>
        <LockResetIcon fontSize="large" />
        <VerticalLine />
        비밀번호 변경
      </Row>
      {isPasswordOpen && (
        <Dialog
          onClose={onPasswordClose}
          width="20rem"
          height="25rem"
          title="비밀번호변경"
        >
          <PasswordChange onClose={onPasswordClose} />
        </Dialog>
      )}
      <Row onClick={onClickDelete}>
        <PersonRemoveIcon fontSize="large" />
        <VerticalLine />
        계정삭제
      </Row>
      {isDeleteOpen && (
        <Dialog
          onClose={onDeleteClose}
          width="20rem"
          height="15rem"
          title="계정삭제"
        >
          <DeleteMember onClose={onDeleteClose} />
        </Dialog>
      )}
    </>
  );
};

export default setting;
