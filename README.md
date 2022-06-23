# Vamigo(리뷰 공유 SNS) Frontend 저장소


[BackEnd 저장소](https://github.com/VamigoProject/BackEnd)

## 사용 기술
`NEXT.js`, `Zustand`, `mui`, `axios`, `styled-components`

## 구동 방법
1. Repository의 파일 다운
2. `yarn` 또는 `npn`을 이용하여 package들을 설치, `yarn install` 또는 `npm install`
3. `.env.local`파일을 package.json과 동일한 디렉토리(최상단 디렉토리)에 생성 후 아래와 같이 작성
```JavaScript
  MAP_KEY_API = "여기에 naver map에서 받은 client id를 넣으면 됩니다 ex) 1q2w3e4r"
  BACKEND = '여기에 spring을 사용한 백엔드 서버주소를 넣으면 됩니다, ex) http://localhost:8080'
```
4. `yarn run dev` 또는 `npm run dev` 프론트엔드 서버 구동

현재는 개발서버이며 배포를 위한 서버 구동을 위해서는 별도의 작업 필요

## 구현된 기능
### 로그인 및 회원가입
 - 메일인증을 통한 중복체크
 - 가입한 메일과 패스워드로 로그인
 - 가입한 메일을 통해 비밀번호 찾기
### 리뷰 작성, 수정, 삭제
 - 리뷰를 작성한 작품을 선택
 - 코멘트와 별점 설정
 - 스포일러 존재여부에 따라 스포일러 여부 체크
 - 기존에 작성된 리뷰에 대하여 코멘트, 별점, 스포일러 여부 수정
 - 본인이 작성한 리뷰의 경우 삭제 가능
### 프로필 관리
 - 본인 및 다른 사용자들에게 보여질 프로필 이미지 수정
 - 자기소개 및 닉네임 수정
 - 본인과 관계를 맺고 있는 사용자 보기
 - 본인이 작성한 리뷰 보기
 - 본인이 좋아요를 누른 리뷰 보기
 - 작성한 리뷰에 대한 통계 보기
### 관계 맺기
 - 사용자 닉네임을 기반으로 검색
 - 사용자에 대해 팔로우 및 언팔로우
 - 본인의 프로필과 동일하게 대상의 프로필 열람 가능
### 리뷰에 대한 반응
 - 각각의 리뷰에 대해 댓글 작성 및 삭제
 - 좋아요를 통해 해당 리뷰에 대해 반응
 - 부적절한 리뷰에 대한 항목별 신고
### 트렌드 보기
 - 주간별 작품별 작성된 리뷰의 개수를 집계하여 순위 산출
 - 작품별 리뷰 보기 기능 제공(트렌드가 아닌 작품들은 검색을 통해 가능)
### 통계 보기
 - 사용자가 작성한 리뷰를 종류별로 집계하여 시각화
 - 다른 사용자와의 비교를 위한 통계 제공
