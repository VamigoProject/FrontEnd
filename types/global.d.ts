interface User {
  uid: number; //유저의 id
  nickname: string; //유저의 닉네임
  profile: string | null; //Base64로 인코딩 된 이미지
}

interface Reply {
  replyId: number;
  time: Date; //댓글 작성한 시간
  user: User; //작성한 유저 정보
  comment: string; //댓글 내용
}

interface Review {
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

interface Work {
  id: number; //작품의 id
  name: string; //작품의 이름
  category: 'animation' | 'book' | 'drama' | 'movie'; //작품의 종류
}

interface SearchMember {
  uid: number;
  nickname: string;
  profile: string | null;
  isFollower: boolean;
  isFollowing: boolean;
}
