import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSystemStore } from 'stores';
import { searchWorkApi } from 'utils/api';
import { ContentBox, Empty } from 'components';
import styled from 'styled-components';
import Link from 'next/link';

const Image = ({ src }: { src: string | undefined }) => {
  const [imageSrc, setImageSrc] = useState('');
  const onError = () => {
    setImageSrc('/noImage.png');
  };

  useEffect(() => {
    if (src !== undefined) {
      setImageSrc(src);
    }
  }, []);

  return <img src={imageSrc} onError={onError} width="64" />;
};

const WorkWrapper = styled.div`
  width: 100%;
  height: 104px;
  padding: 8px;

  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  padding: 8px;
`;

const WorkLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const WorkBox = styled(ContentBox)`
  &:hover {
    background-color: rgb(230, 230, 230);
    transition: background-color 0.1s ease-in-out;
  }
  transition: background-color 0.1s ease-in-out;
`;

const work = () => {
  const router = useRouter();
  const [isQueryEmpty, setIsQueryEmpty] = useState<boolean>(false);
  const [workList, setWorkList] = useState<Array<Work>>([]);

  const { startLoadingAction, endLoadingAction } = useSystemStore(
    (state) => state,
  );

  const fetch = async () => {
    startLoadingAction();
    try {
      if (
        Array.isArray(router.query.workName) ||
        router.query.workName === undefined
      ) {
        throw '검색어가 잘못 되었습니다';
      } else {
        const response: Array<Work> = await searchWorkApi(
          router.query.workName!,
        );
        setWorkList(response);
      }
    } catch (error) {
      alert(error);
    }

    endLoadingAction();
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.workName === undefined || router.query.workName === '') {
      setIsQueryEmpty(true);
    } else {
      fetch();
    }
  }, [router.isReady, router.query.workName]);

  return (
    <>
      {isQueryEmpty && <div>검색어가 없습니다, 다시 검색해주세요</div>}
      {!isQueryEmpty &&
        workList.length !== 0 &&
        workList.map((work) => (
          <Link href={`/work/${work.id}`} key={work.id}>
            <WorkLink>
              <WorkBox>
                <WorkWrapper>
                  <LeftSide>
                    <Image src={work.image} />
                  </LeftSide>

                  <RightSide>
                    <h3>{work.name}</h3>
                  </RightSide>
                </WorkWrapper>
              </WorkBox>
            </WorkLink>
          </Link>
        ))}
      {!isQueryEmpty && workList.length === 0 && (
        <Empty message="검색된 작품이 없습니다" />
      )}
    </>
  );
};

export default work;
