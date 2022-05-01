import instance from './myAxios';
import Axios, { AxiosError } from 'axios';
import { kleeImage } from 'utils/statics';

interface LoginData {
  uid: number;
  nickname: string;
  profile: string;
  introduce: string;
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
    const body = {
      mail,
      password,
    };
    const response = await instance.post<LoginData>('/member/signin', body);
    const { uid, nickname, profile, introduce, accessToken, refreshToken } =
      response.data;

    // /* Test용 코드 */
    // const nickname = `클레`;
    // const profile = kleeImage;
    // const accessToken = `accessToken`;
    // const refreshToken = `refreshToken`;
    // await wait(1000);

    return { uid, nickname, profile, introduce, accessToken, refreshToken };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw `${err.response?.data}`;
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
  year: number,
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
      throw `${err.response?.data}`;
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

const createReviewApi = async (
  uid: number,
  comment: string,
  workName: string,
  workCategory: string,
  rating: number,
) => {
  try {
    const body = {
      uid,
      comment,
      workName,
      workCategory,
      rating,
    };
    await instance.post('/review/create', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const updateProfileApi = async (
  uid: number,
  nickname: string,
  profile: string | null,
  introduce: string,
) => {
  try {
    const body = {
      uid,
      nickname,
      profile,
      introduce,
    };
    await instance.post('/member/profile/update', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

export {
  createReviewApi,
  signinApi,
  signupApi,
  requestMailApi,
  updateProfileApi,
};
