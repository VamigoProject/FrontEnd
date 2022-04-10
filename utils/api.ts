import instance from './myAxios';
import Axios from 'axios';

interface LoginData {
  uid: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
}

const loginApi = async (mail: string, password: string): Promise<LoginData> => {
  try {
    // const response = await instance.get<string>(
    //   `/oauth/kakao?code=${code}`,
    // );
    // alert(`response : ${response.data}`);
    // return response.data;

    /* Test용 코드 */

    const uid = 98;
    const nickname = `My Nickname`;
    const accessToken = `accessToken`;
    const refreshToken = `refreshToken`;

    return { uid, nickname, accessToken, refreshToken };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      throw error;
    } else {
      throw 'Somethig Error';
    }
  }
};

const signupApi = async (
  mail: string,
  nickname: string,
  password: string,
  mbti: string,
  sex: string,
  year: string,
  work: Array<string>,
  genre: Array<string>,
) => {
  try {
    const body = {
      mail,
      nickname,
      password,
      mbti,
      sex,
      year,
      work,
      genre,
    };
    await instance.post('/member/signup', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      throw error;
    } else {
      throw 'Something Error';
    }
  }
};

export { loginApi, signupApi };
