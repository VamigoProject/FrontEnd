type category = 'animation' | 'book' | 'drama' | 'movie' | 'game';

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
  workId: string;
  workName: string;
  workCategory: category;
  comment: string;
  lat?: number | null;
  lng?: number | null;
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
  category: category; //작품의 카테고리
  image?: string; //작품의 이미지
}

interface SearchMember {
  uid: number;
  nickname: string;
  profile: string | null;
  isFollower: boolean;
  isFollowing: boolean;
}

interface IndividualStatistics {
  id: string;
  label: string;
  value: number;
  color?: string;
}
