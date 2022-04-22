export interface User {
  nickname: string;
  profile: string;
}

export interface Reply {
  time: Date; //댓글 작성한 시간
  User: User; //작성한 유저 정보
  comment: string; //댓글 내용
}

export interface Review {
  time: Date; //리뷰를 작성한 시간
  User: User; //리뷰를 작성한 유저의 정보
  workName: string; //작품 제목
  workCategory: string; //작품의 종류(book, animation, movie, drama ...)
  comment: string; //리뷰의 코멘트
  rate: number; //별점
  Reply: string; //댓글
  like: number; //좋아요 횟수
}
