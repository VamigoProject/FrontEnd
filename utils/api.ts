import instance from './myAxios';
import Axios from 'axios';

interface LoginData {
  uid: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
}

const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const signinApi = async (
  mail: string,
  password: string,
): Promise<LoginData> => {
  try {
    // const body = {
    //   mail,
    //   password
    // }
    // const response = await instance.post<LoginData>("/member/signin", body)

    /* Test용 코드 */

    const uid = 98;
    const nickname = `My Nickname`;
    const accessToken = `accessToken`;
    const refreshToken = `refreshToken`;
    await wait(1000);

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

export { signinApi, signupApi };
