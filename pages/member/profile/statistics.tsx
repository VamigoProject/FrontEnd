import { MyProfileLayout } from 'components/layout';
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';
import { ContentBox, Empty } from 'components';
import { myStatisticsApi } from 'utils/api';
import { useUserStore } from 'stores';
import { useState, useEffect } from 'react';

const IndividualStatistics = styled.div`
  width: 100%;
  height: 20rem;
`;

const statistics = () => {
  const { uid } = useUserStore((state) => state);
  const [individual, setIndividual] = useState<Array<IndividualStatistics>>([]);

  const fetch = async () => {
    try {
      const response = await myStatisticsApi(uid!);
      setIndividual(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <MyProfileLayout current={3}>
      {individual.length === 0 && (
        <Empty message="통계를 낼 데이터가 존재하지 않습니다" />
      )}
      {individual.length !== 0 && (
        <IndividualStatistics>
          <ContentBox padding="1rem">
            <h3 style={{ margin: '0' }}>개인 통계</h3>
            <ResponsivePie
              data={individual}
              margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
              sortByValue={true}
              innerRadius={0.05}
              padAngle={1}
              cornerRadius={2}
            />
          </ContentBox>
        </IndividualStatistics>
      )}
    </MyProfileLayout>
  );
};

export default statistics;
