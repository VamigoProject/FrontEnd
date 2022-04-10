import { useCallback, useState } from 'react';

const useInput = (initialValue: any = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    if (e.target !== undefined) setValue(e.target.value);
    else setValue(e);
  }, []);
  return [value, handler];
};

export default useInput;
