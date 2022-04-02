import instance from './myAxios';
import Axios from 'axios';

interface LoginData {
  nickname: string;
  accessToken: string;
  refreshToken: string;
}

const loginApi = async (code: string) => {
  try {
    const response = await instance.get<string>(
      `/api/oauth/kakao?code=${code}`,
    );
    alert(`response : ${response.data}`);
    // return response.data;

    /* Test용 코드 */
    const nickname = `My Nickname`;
    const accessToken = `${code.slice(0, 8)}`;
    const refreshToken = `${code.slice(8)}`;

    return { nickname, accessToken, refreshToken };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      throw error;
    } else {
      throw 'Somethig Error';
    }
  }
};

export { loginApi };
