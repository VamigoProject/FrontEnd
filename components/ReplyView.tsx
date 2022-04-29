import { Reply } from 'utils/types';
import ProfileWithNickname from 'components/ProfileWithNickname';
import ContentBox from 'components/ContentBox';
import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  reviewId: number;
  reply: Reply;
}

const GlobalStyle = createGlobalStyle`
  @keyframes smoothAppear{
    from{
      opacity: 0;
      transform: translateY(25%);
    }
    to{
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Wrapper = styled.div`
  animation: smoothAppear 0.5s;
  animation-timing-function: ease-in-out;
`;

const ReplyView = ({ reviewId, reply }: Props) => {
  const { replyId, time, User, comment } = reply;
  const { nickname, profile } = User;
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContentBox>
          <ProfileWithNickname
            nickname={nickname}
            profile={profile}
            size="small"
          />
          {reply.comment}
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default ReplyView;
