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

## 구현 화면
![image](https://user-images.githubusercontent.com/61939201/175320120-763d2346-780c-47f2-96a7-feef8ab243ca.png)
로그인 창
![image](https://user-images.githubusercontent.com/61939201/175320216-a9108909-a9f9-495e-bc5b-5a98cb981823.png)
회원가입
![image](https://user-images.githubusercontent.com/61939201/175321850-7b4d1711-a743-48af-8f15-88cd8fdd78c1.png)
PC에서의 전체적인 레이아웃
![모바일 메인화면](https://user-images.githubusercontent.com/61939201/175322264-315a0b66-88a5-4a78-91c9-17b7ff63bf6f.png)
모바일 레이아웃
![모바일 네비게이션](https://user-images.githubusercontent.com/61939201/175322299-9a4f618e-7e19-469b-af71-75ad50ee919a.png)
모바일 네비게이션
![image](https://user-images.githubusercontent.com/61939201/175320393-238c1ab1-158a-4344-904e-a2c59480658f.png)
리뷰작성
![image](https://user-images.githubusercontent.com/61939201/175320474-6c913ca0-dcb2-42f1-9f00-5b680d9d8551.png)
리뷰보기

![image](https://user-images.githubusercontent.com/61939201/175320547-28a48b1d-a170-4b62-82fe-68ef1be661dc.png)
프로필 수정
![image](https://user-images.githubusercontent.com/61939201/175320608-a8e6503a-95bf-49e7-bc90-9ed76d9c511b.png)
개인통계
![image](https://user-images.githubusercontent.com/61939201/175320977-ce0b4a69-4986-48a4-a069-bfbaead2e93c.png)
작품별 리뷰
![image](https://user-images.githubusercontent.com/61939201/175321115-ecea9af3-6fe7-4cf5-80bb-768f9fbb7cd1.png)
리뷰에 대한 반응
![image](https://user-images.githubusercontent.com/61939201/175321469-0bcea6be-00a7-43de-aa86-3d02e263bf9f.png)
트렌드 표시
![image](https://user-images.githubusercontent.com/61939201/175321540-2ba55911-ca41-4daa-b68a-67e2c746a836.png)
사용자 검색
![image](https://user-images.githubusercontent.com/61939201/175321596-34425f86-58dc-4ac1-8f4b-e57b95b6d998.png)
작품검색

