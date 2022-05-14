import instance from './myAxios';
import Axios, { AxiosError } from 'axios';
import { Reply, Review, SearchMember, User } from 'utils/types';
import { kleeImage, testImage } from 'utils/statics';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

interface LoginData {
  uid: number;
  nickname: string;
  profile: string;
  introduce: string;
  accessToken: string;
  refreshToken: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

interface SearchWorkProps {
  id: number;
  name: string;
  category: string;
}
const searchWorkApi = async (name: string) => {
  try {
    const body = { fields: ['name'], searchTerm: name, size: 10 };
    const response = await instance.post('/api/movie/search', body);
    const result: Array<SearchWorkProps> = response.data.map((value: any) =>
      Object.create({
        id: value.id,
        name: value.name,
        category: value.category,
      }),
    );

    const filteredResult = result.filter((element, index) => {
      return index === result.findIndex((v) => v.id === element.id);
    });
    return filteredResult;
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
    const response = await instance.post('/review/create', body);
    return response.data;
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

const createReplyApi = async (
  reviewId: number,
  uid: number,
  comment: string,
) => {
  try {
    const body = { reviewId, uid, comment };
    const response = await instance.post('/review/reply/create', body);
    return response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const deleteReplyApi = async (
  reviewId: number,
  uid: number,
  replyId: number,
) => {
  try {
    const body = { reviewId, uid, replyId };
    await instance.post('/review/reply/delete', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const likeApi = async (reviewId: number, uid: number) => {
  try {
    const body = {
      reviewId,
      uid,
    };
    console.log('like Api:', body);
    await instance.post('/review/like', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const unlikeApi = async (reviewId: number, uid: number) => {
  try {
    const body = {
      reviewId,
      uid,
    };
    await instance.post('/review/unlike', body);
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
      response.data.forEach((review: Review) => {
        review.reply.forEach((reply: Reply) => {
          if (reply.user.profile === 'NoImage') {
            reply.user.profile = null;
          }
        });
      });

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

const user10: User = { uid: 10, nickname: '10번유저', profile: kleeImage };
const user11: User = { uid: 11, nickname: '유저11', profile: testImage };
const user12: User = { uid: 12, nickname: '12번유저', profile: kleeImage };
const user13: User = { uid: 13, nickname: '13번유저', profile: testImage };
const user14: User = { uid: 14, nickname: '유저 넘버14', profile: null };
const user15: User = {
  uid: 15,
  nickname: '유저인데 15번임',
  profile: kleeImage,
};

const dummyFollower = [
  user10,
  user11,
  user13,
  user15,
  user10,
  user11,
  user13,
  user15,
  user10,
  user11,
  user13,
  user15,
  user14,
  user10,
  user11,
  user14,
  user10,
  user11,
  user14,
  user10,
  user11,
  user14,
  user10,
  user11,
];
const dummyFollowing = [
  user10,
  user11,
  user12,
  user14,
  user10,
  user11,
  user13,
  user15,
  user11,
  user13,
];

const myFriendApi = async (
  uid: number,
): Promise<{ follower: Array<User>; following: Array<User> }> => {
  try {
    const body = {
      uid,
    };
    const response = await instance.post('/member/profile/myfriend', body);
    return response.data;

    // return { follower: dummyFollower, following: dummyFollowing };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const searchMemberApi = async (
  uid: number,
  nickname: string,
): Promise<Array<SearchMember>> => {
  try {
    const body = {
      uid,
      nickname,
    };
    const response = await instance.post('/member/search', body);
    if (response.data.length !== 0) {
      response.data.forEach((member: SearchMember) => {
        if (member.profile === 'NoImage') {
          member.profile = null;
        }
      });
    }
    return response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const followApi = async (myUid: number, targetUid: number) => {
  try {
    const body = {
      myUid,
      targetUid,
    };

    await instance.post('/member/follow', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const unfollowApi = async (myUid: number, targetUid: number) => {
  try {
    const body = {
      myUid,
      targetUid,
    };

    await instance.post('/member/unfollow', body);
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const err = error as AxiosError;
      throw err.response?.data;
    } else {
      throw 'Something Error';
    }
  }
};

const timelineApi = async (uid: number): Promise<Array<Review>> => {
  try {
    const body = {
      uid,
    };

    const response = await instance.post('/home', body);
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
  createReplyApi,
  deleteReplyApi,
  signinApi,
  signupApi,
  requestMailApi,
  likeApi,
  unlikeApi,
  updateProfileApi,
  myreviewApi,
  myFriendApi,
  searchMemberApi,
  followApi,
  unfollowApi,
  timelineApi,
};
