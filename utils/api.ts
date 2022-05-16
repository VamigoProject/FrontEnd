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
};

const requestMailApi = async (mail: string) => {
  const body = { mail };
  await instance.post('/member/mailauth', body);
};

interface SearchWorkProps {
  id: number;
  name: string;
  category: string;
}
const searchWorkApi = async (name: string) => {
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
};

const createReviewApi = async (
  uid: number,
  comment: string,
  workName: string,
  workCategory: string,
  rating: number,
  spoiler: boolean,
) => {
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
};

const deleteReviewApi = async (uid: number, reviewId: number) => {
  const body = { uid, reviewId };
  await instance.post('/review/delete', body);
};

const updateReviewApi = async (
  uid: number,
  reviewId: number,
  rating: number,
  comment: number,
  image: Array<string>,
  spoiler: boolean,
) => {
  const body = { uid, reviewId, rating, comment, image, spoiler };
  await instance.post('/review/update', body);
};

const createReplyApi = async (
  reviewId: number,
  uid: number,
  comment: string,
) => {
  const body = { reviewId, uid, comment };
  const response = await instance.post('/review/reply/create', body);
  return response.data;
};

const deleteReplyApi = async (
  reviewId: number,
  uid: number,
  replyId: number,
) => {
  const body = { reviewId, uid, replyId };
  await instance.post('/review/reply/delete', body);
};

const likeApi = async (reviewId: number, uid: number) => {
  const body = {
    reviewId,
    uid,
  };
  console.log('like Api:', body);
  await instance.post('/review/like', body);
};

const unlikeApi = async (reviewId: number, uid: number) => {
  const body = {
    reviewId,
    uid,
  };
  await instance.post('/review/unlike', body);
};

const updateProfileApi = async (
  uid: number,
  nickname: string,
  profile: string | null,
  introduce: string,
) => {
  const body = {
    uid,
    nickname,
    profile,
    introduce,
  };
  await instance.post('/member/profile/update', body);
};

const myreviewApi = async (uid: number): Promise<Array<Review>> => {
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
};

const myFriendApi = async (
  uid: number,
): Promise<{ follower: Array<User>; following: Array<User> }> => {
  const body = {
    uid,
  };
  const response = await instance.post('/member/profile/myfriend', body);
  return response.data;
};

const searchMemberApi = async (
  uid: number,
  nickname: string,
): Promise<Array<SearchMember>> => {
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
};

const followApi = async (myUid: number, targetUid: number) => {
  const body = {
    myUid,
    targetUid,
  };

  await instance.post('/member/follow', body);
};

const unfollowApi = async (myUid: number, targetUid: number) => {
  const body = {
    myUid,
    targetUid,
  };

  await instance.post('/member/unfollow', body);
};

const timelineApi = async (uid: number): Promise<Array<Review>> => {
  const body = {
    uid,
  };

  const response = await instance.post('/home', body);
  if (response.data === 'None') {
    return [];
  } else {
    return response.data;
  }
};

const changePasswordApi = async (
  uid: number,
  beforePassword: string,
  afterPassword: string,
) => {
  const body = {
    uid,
    beforePassword,
    afterPassword,
  };
  await instance.post('/password/update', body);
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
  changePasswordApi,
};
