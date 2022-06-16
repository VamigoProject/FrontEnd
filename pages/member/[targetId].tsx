import { useUserStore } from 'stores';
import { useRouter } from 'next/router';

const member = () => {
  const { uid } = useUserStore((state) => state);
  const router = useRouter();
  const { targetId } = router.query;

  return (
    <div>
      <div>{targetId}</div>
    </div>
  );
};

export default member;
