import instance from './myAxios';
import { SearchMember } from 'utils/types';

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

  return { uid, nickname, profile, introduce, accessToken, refreshToken };
};

const signupMailCheckApi = async (mail: string) => {
  const body = {
    mail,
  };
  await instance.post('/member/check', body);
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
  category: category;
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

const searchWorkWithImageApi = async (name: string) => {
  const body = { fields: ['name'], searchTerm: name, size: 10 };
  const response = await instance.post('/api/movie/image', body);
  const result: Array<SearchWorkProps> = response.data.map((value: any) =>
    Object.create({
      id: value.id,
      name: value.name,
      image: value.image,
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
  workId: number | null,
  workName: string,
  workCategory: string,
  lat: number | null,
  lng: number | null,
  rating: number,
  spoiler: boolean,
) => {
  if (comment === '' || workId === null || rating === 0) {
    throw '???????????? ????????? ??????????????????';
  }
  const body = {
    uid,
    comment,
    workId,
    workName,
    workCategory,
    lat,
    lng,
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
  comment: string,
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

const myProfileApi = async (uid: number) => {
  const body = { uid };
  const response = await instance.post('/member/profile/myprofile', body);

  return response.data;
};

const myreviewApi = async (uid: number): Promise<Array<Review>> => {
  const body = {
    uid,
  };
  const response = await instance.post('/member/profile/myreview', body);
  if (response.data === 'None') {
    return [];
  } else {
    response.data = response.data.reverse();
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
  response.data.follower.forEach((user: User) => {
    user.profile === 'NoImage' ? null : user.profile;
  });
  response.data.following.forEach((user: User) => {
    user.profile === 'NoImage' ? null : user.profile;
  });

  return response.data;
};

const mylikeApi = async (uid: number) => {
  const body = { uid };
  const response = await instance.post('/member/profile/like', body);
  return response.data.reviews;
};

const myStatisticsApi = async (uid: number) => {
  const body = { uid };
  const response = await instance.post('/member/profile/statistics', body);

  const min = Math.ceil(1);
  const max = Math.ceil(255);

  const pMin = Math.ceil(50);
  const pMax = Math.ceil(100);

  const { statisticsList } = response.data;
  const result = statisticsList.map((s: IndividualStatistics) => {
    return Object.create({
      id: s.id,
      label: s.label,
      value: s.value,
      color: `hsl(${Math.floor(Math.random() * (max - min)) + min}, ${
        Math.floor(Math.random() * (pMax - pMin)) + pMin
      }%, ${Math.floor(Math.random() * (pMax - pMin)) + pMin}%)`,
    });
  });

  return result;
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
  if (response.data === 'None' || response.data === null) {
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

const passwordMailCheckApi = async (mail: string) => {
  const body = { mail };
  await instance.post('/password/check', body);
};

const passwordMailAuthApi = async (mail: string) => {
  const body = { mail };
  await instance.post('/password/mailauth', body);
};

const passwordForgetApi = async (
  mail: string,
  password: string,
  code: string,
) => {
  const body = { mail, password, code };
  await instance.post('/password/forget', body);
};

const trendApi = async (): Promise<Array<Work>> => {
  const response = await instance.get('/trend');
  return response.data;
};

const workReviewApi = async (uid: number, workId: number) => {
  const body = { uid, workId };
  const response = await instance.post('/work/search', body);

  if (response.data.reviews === null) {
    response.data.reviews = [];
  }

  return response.data;
};

const memberProfileApi = async (uid: number, targetId: number) => {
  const body = { uid };
  const response = await instance.post(`/member/${targetId}/profile`, body);

  return response.data;
};

const memberFriendApi = async (uid: number, targetId: number) => {
  const body = { uid };
  const response = await instance.post(`/member/${targetId}/friend`, body);

  return response.data;
};

const memberReviewApi = async (uid: number, targetId: number) => {
  const body = { uid };
  const response = await instance.post(`/member/${targetId}/review`, body);

  return response.data;
};

const memberLikeApi = async (uid: number, targetId: number) => {
  const body = { uid };
  const response = await instance.post(`/member/${targetId}/like`, body);

  return response.data;
};

interface RadarStatistics {
  category: string;
  me: number;
  you: number;
}

const memberStatisticsApi = async (
  uid: number,
  targetId: number,
  myNickname: string,
) => {
  const body = { uid };
  const response = await instance.post(`/member/${targetId}/statistics`, body);

  const { user, statisticsList } = response.data;
  const result = statisticsList.map((s: RadarStatistics) => {
    const tmp: any = {};
    tmp['category'] = s.category;
    tmp[myNickname] = s.me;
    tmp[user.nickname] = s.you;

    return tmp;
  });

  return { user, result };
};

const memberDeleteApi = async (uid: number, password: string) => {
  const body = { uid, password };
  await instance.post('/member/delete', body);
};

const reportReviewApi = async (
  uid: number,
  reviewId: number,
  spoiler: boolean,
  ero: boolean,
  curse: boolean,
  etc: boolean,
) => {
  const body = { uid, reviewId, spoiler, ero, curse, etc };
  await instance.post('/review/report', body);
};

export {
  searchWorkApi,
  createReviewApi,
  deleteReviewApi,
  updateReviewApi,
  createReplyApi,
  deleteReplyApi,
  signinApi,
  signupMailCheckApi,
  signupApi,
  requestMailApi,
  likeApi,
  unlikeApi,
  updateProfileApi,
  myProfileApi,
  myreviewApi,
  myFriendApi,
  mylikeApi,
  myStatisticsApi,
  searchMemberApi,
  searchWorkWithImageApi,
  followApi,
  unfollowApi,
  timelineApi,
  changePasswordApi,
  passwordMailCheckApi,
  passwordMailAuthApi,
  passwordForgetApi,
  trendApi,
  workReviewApi,
  memberProfileApi,
  memberFriendApi,
  memberReviewApi,
  memberLikeApi,
  memberStatisticsApi,
  memberDeleteApi,
  reportReviewApi,
};
