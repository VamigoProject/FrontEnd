import { MY_REVIEW_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Reply, Review, User } from 'utils/types';
import produce from 'immer';

interface ReviewStore {
  reviewData: Array<Review>;
  setReviewAction: (reviews: Array<Review>) => void;
  resetReviewAction: () => void;
  createReviewAction: (
    reviewId: number,
    uid: number,
    nickname: string,
    profile: string | null,
    workName: string,
    workCategory: string,
    comment: string,
    rating: number,
    image: Array<string>,
    spoiler: boolean,
  ) => void;
  deleteReviewAction: (reviewId: number) => void;
  updateReviewAction: (
    reviewId: number,
    rating: number,
    comment: string,
    image: Array<string>,
    spoiler: boolean,
  ) => void;
  likeAction: (reviewId: number) => void;
  unLikeAction: (reviewId: number) => void;
  createReplyAction: (
    reviewId: number,
    replyId: number,
    user: User,
    comment: string,
  ) => void;
  deleteReplyAction: (reviewId: number, replyId: number) => void;
}

import { kleeImage, testImage } from 'utils/statics';

const user1: User = { uid: 1, nickname: 'Parkjun', profile: null };
const user2: User = { uid: 2, nickname: 'DongHo Ryu', profile: null };
const user3: User = { uid: 3, nickname: 'GyeungHwan Lee', profile: testImage };
const user4: User = { uid: 4, nickname: 'UCheol Lee', profile: null };

const dummy: Array<Review> = [
  {
    reviewId: 1,
    uid: 2,
    nickname: 'Parkjun',
    profile: null,
    time: new Date(2022, 4, 24, 10, 40, 0),
    workName: '인터스텔라',
    workCategory: 'movie',
    comment:
      '인터스텔라는 ㄹㅇ 신이다. 내가 알던 그 영화가 맞냐? 가슴이 웅장해진다',
    rating: 5,
    image: [],
    reply: [
      {
        replyId: 1,
        time: new Date(2022, 4, 25, 10, 40, 0),
        user: user2,
        comment: '인정합니다',
      },
      {
        replyId: 2,
        time: new Date(2022, 4, 25, 10, 40, 0),
        user: user3,
        comment: '솔직히 노인정',
      },
    ],
    likes: 34500,
    isLiked: true,
    spoiler: false,
  },
  {
    reviewId: 2,
    uid: 2,
    nickname: 'Parkjun',
    profile: null,
    time: new Date(2022, 4, 24, 10, 40, 0),
    workName: '잉태',
    workCategory: 'movie',
    comment: '잉태잉태',
    rating: 5,
    image: [],
    reply: [
      {
        replyId: 1,
        time: new Date(2022, 4, 25, 10, 40, 0),
        user: user2,
        comment: '잉태입니다',
      },
      {
        replyId: 2,
        time: new Date(2022, 4, 25, 10, 40, 0),
        user: user3,
        comment: '잉태인듯',
      },
    ],
    likes: 34500,
    isLiked: true,
    spoiler: false,
  },
];

const useReviewStore = create<ReviewStore>(
  persist(
    (set, get) => ({
      reviewData: dummy,
      setReviewAction: (reviews) => {
        set(
          produce((draft) => {
            draft.reviewData = reviews;
          }),
        );
      },
      resetReviewAction: () => {
        set(
          produce((draft) => {
            draft.reviewData = dummy;
          }),
        );
      },
      createReviewAction: (
        reviewId,
        uid,
        nickname,
        profile,
        workName,
        workCategory,
        comment,
        rating: number,
        image: Array<string>,
        spoiler: boolean,
      ) => {
        set(
          produce((draft) => {
            const review = {
              reviewId: reviewId,
              time: new Date(),
              uid: uid,
              nickname: nickname,
              profile: profile,
              workName: workName,
              workCategory: workCategory,
              comment: comment,
              rating: rating,
              image: image,
              reply: [],
              likes: 0,
              isLiked: false,
              spoiler,
            };
            draft.reviewData.unshift(review);
          }),
        );
      },

      updateReviewAction: (reviewId, rating, comment, image, spoiler) => {
        set(
          produce((draft) => {
            const selectedReview: Review = draft.reviewData.find(
              (review: Review) => review.reviewId === reviewId,
            );
            selectedReview.rating = rating;
            selectedReview.comment = comment;
            selectedReview.image = image;
            selectedReview.spoiler = spoiler;
          }),
        );
      },
      deleteReviewAction: (reviewId) => {
        set(
          produce((draft) => {
            draft.reviewData = draft.reviewData.filter(
              (review: Review) => review.reviewId !== reviewId,
            );
          }),
        );
      },
      likeAction: (reviewId) => {
        set(
          produce((draft) => {
            const selectedReview: Review = draft.reviewData.find(
              (review: Review) => review.reviewId === reviewId,
            );
            selectedReview.isLiked = true;
            selectedReview.likes += 1;
          }),
        );
      },
      unLikeAction: (reviewId) => {
        set(
          produce((draft) => {
            const selectedReview: Review = draft.reviewData.find(
              (review: Review) => review.reviewId === reviewId,
            );
            selectedReview.isLiked = false;
            selectedReview.likes -= 1;
          }),
        );
      },
      createReplyAction: (reviewId, replyId, user, comment) => {
        console.log(reviewId, replyId, user, comment);
        set(
          produce((draft) => {
            const selectedReview: Review = draft.reviewData.find(
              (review: Review) => review.reviewId === reviewId,
            );
            if (
              selectedReview.reply === null ||
              selectedReview.reply.length === 0
            ) {
              selectedReview.reply = [
                {
                  replyId: replyId,
                  time: new Date(),
                  user: user,
                  comment: comment,
                },
              ];
            } else {
              selectedReview.reply.unshift({
                replyId: replyId,
                time: new Date(),
                user: user,
                comment: comment,
              });
            }
          }),
        );
      },
      deleteReplyAction: (reviewId, replyId) => {
        set(
          produce((draft) => {
            const selectedReview: Review = draft.reviewData.find(
              (review: Review) => review.reviewId === reviewId,
            );
            selectedReview.reply = selectedReview.reply.filter(
              (reply: Reply) => reply.replyId !== replyId,
            );
          }),
        );
      },
    }),
    {
      name: MY_REVIEW_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useReviewStore;
