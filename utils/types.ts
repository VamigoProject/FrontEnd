export interface User {
  uid: number; //유저의 id
  nickname: string; //유저의 닉네임
  profile: string | null; //Base64로 인코딩 된 이미지
}

export interface Reply {
  replyId: number;
  time: Date; //댓글 작성한 시간
  user: User; //작성한 유저 정보
  comment: string; //댓글 내용
}

export interface Review {
  reviewId: number;
  time: Date;
  uid: number;
  nickname: string;
  profile: string | null;
  workName: string;
  workCategory: 'animation' | 'book' | 'drama' | 'movie';
  comment: string;
  rating: number;
  image: Array<string>;
  reply: Array<Reply>;
  likes: number;
  isLiked: boolean;
  spoiler: boolean;
}
