import instance from './myAxios';
import Axios, { AxiosError } from 'axios';

interface LoginData {
  nickname: string;
  profile: string;
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

    const nickname = `My Nickname`;
    const profile = 'None';
    const accessToken = `accessToken`;
    const refreshToken = `refreshToken`;
    await wait(1000);

    return { nickname, profile, accessToken, refreshToken };
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
  code: string,
  nickname: string,
  password: string,
  mbti: string,
  sex: string,
  year: string,
  category: Array<string>,
  genre: Array<string>,
) => {
  try {
    const body = {
      mail,
      code,
      nickname,
      password,
      mbti,
      sex,
      year,
      category,
      genre,
    };
    await instance.post('/member/signup', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw `${error.response?.data}`;
    } else {
      throw 'Something Error';
    }
  }
};

const requestMailApi = async (mail: string) => {
  try {
    const body = { mail };
    await instance.post('/member/mailauth', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw `${err.response?.data}`;
    } else {
      throw 'Something Error';
    }
  }
};

export { signinApi, signupApi, requestMailApi };
