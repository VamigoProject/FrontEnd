import instance from './myAxios';
import Axios, { AxiosError } from 'axios';
import { Review } from 'utils/types';

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

const searchWorkApi = async (name: string) => {
  try {
    const body = { fileds: ['name'], searchTerm: name, size: 10 };
    const response = await instance.post('/api/movie/search', body);
    console.log(response.data);
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
  spoiler: boolean,
) => {
  try {
    const body = {
      uid,
      comment,
      workName,
      workCategory,
      rating,
      spoiler,
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

const deleteReviewApi = async (uid: number, reviewId: number) => {
  try {
    const body = { uid, reviewId };
    await instance.post('/review/delete', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const updateReviewApi = async (
  uid: number,
  reviewId: number,
  rating: number,
  comment: number,
  image: Array<string>,
  spoiler: boolean,
) => {
  try {
    const body = { uid, reviewId, rating, comment, image, spoiler };
    await instance.post('/review/update', body);
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

const myreviewApi = async (uid: number): Promise<Array<Review>> => {
  try {
    const body = {
      uid,
    };
    const response = await instance.post('/member/profile/myreview', body);
    if (response.data === 'None') {
      return [];
    } else {
      return response.data;
    }
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
  searchWorkApi,
  createReviewApi,
  deleteReviewApi,
  updateReviewApi,
  signinApi,
  signupApi,
  requestMailApi,
  updateProfileApi,
  myreviewApi,
};
