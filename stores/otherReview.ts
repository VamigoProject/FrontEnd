/* eslint-disable @typescript-eslint/no-unused-vars */
import { OTHER_REVIEW_STORE } from 'utils/statics';
import create from 'zustand';
import { persist } from 'zustand/middleware';
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
    lat: number | null,
    lng: number | null,
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

const useOtherReviewStore = create<ReviewStore>(
  persist(
    (set, get) => ({
      reviewData: [],
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
            draft.reviewData = [];
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
        lat,
        lng,
        rating,
        image,
        spoiler,
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
              lat: lat,
              lng: lng,
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
              selectedReview.reply.push({
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
      name: OTHER_REVIEW_STORE,
      getStorage: () => localStorage,
    },
  ),
);

export default useOtherReviewStore;
