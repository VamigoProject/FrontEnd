import { Reply } from 'utils/types';
import ProfileWithNickname from 'components/ProfileWithNickname';
import ContentBox from 'components/ContentBox';
import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  reviewId: number;
  reply: Reply;
}

const GlobalStyle = createGlobalStyle`
  @keyframes replyAppear{
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
  animation: replyAppear 0.5s;
  animation-timing-function: ease-in-out;
`;

const Padder = styled.div`
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

const ReplyView = ({ reviewId, reply }: Props) => {
  const { replyId, time, User, comment } = reply;
  const { nickname, profile } = User;
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContentBox opacity={0.3}>
          <Padder>
            <ProfileWithNickname
              nickname={nickname}
              profile={profile}
              size="small"
            />
            {reply.comment}
          </Padder>
        </ContentBox>
      </Wrapper>
    </>
  );
};

export default ReplyView;
