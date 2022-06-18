import { MyProfileLayout } from 'components/layout';
import { useEffect } from 'react';
import { useUserStore } from 'stores';
import { myProfileApi } from 'utils/api';

const index = () => {
  const { uid, updateAction } = useUserStore((state) => state);

  const fetch = async () => {
    try {
      const { nickname, profile, introduce } = await myProfileApi(uid!);
      updateAction(nickname, profile, introduce);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return <MyProfileLayout />;
};

export default index;
