export interface User {
  nickname: string; //유저의 닉네임
  profile: string | null; //Base64로 인코딩 된 이미지
}

export interface Reply {
  replyId: number;
  time: Date; //댓글 작성한 시간
  User: User; //작성한 유저 정보
  comment: string; //댓글 내용
}

export interface Review {
  reviewId: number; //리뷰의 id
  time: Date; //리뷰를 작성한 시간
  User: User; //리뷰를 작성한 유저의 정보
  workName: string; //작품 제목
  workCategory: string; //작품의 종류(book, animation, movie, drama ...)
  comment: string; //리뷰의 코멘트
  rate: number; //별점
  Reply: Array<Reply>; //댓글
  like: number; //좋아요 횟수
  isLiked: boolean; //사용자가 좋아요 누른 게시물 인지 아닌지
}
