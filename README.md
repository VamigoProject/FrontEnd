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
![175320120-763d2346-780c-47f2-96a7-feef8ab243ca](https://user-images.githubusercontent.com/61939201/175322871-12f6b1cc-2344-4af5-8b91-abe4e0769bdd.png)
![175321850-7b4d1711-a743-48af-8f15-88cd8fdd78c1](https://user-images.githubusercontent.com/61939201/175323045-542d1f7e-1675-4b17-912f-bfc3839d8078.png)
![175322264-315a0b66-88a5-4a78-91c9-17b7ff63bf6f](https://user-images.githubusercontent.com/61939201/175323054-88d2cd94-b101-427d-9262-109ad7192df9.png)
![175322299-9a4f618e-7e19-469b-af71-75ad50ee919a](https://user-images.githubusercontent.com/61939201/175323068-58e15b7e-ecce-42e6-8b2e-0c7fe03e5383.png)
![175320216-a9108909-a9f9-495e-bc5b-5a98cb981823](https://user-images.githubusercontent.com/61939201/175322880-1d3ead88-1caa-4eed-bf6d-8fdeede590f6.png)
![175320393-238c1ab1-158a-4344-904e-a2c59480658f](https://user-images.githubusercontent.com/61939201/175322895-5acd26f2-0ddc-4c1c-9770-54b05d67ea28.png)
![175320474-6c913ca0-dcb2-42f1-9f00-5b680d9d8551](https://user-images.githubusercontent.com/61939201/175322911-e15fba46-1630-407a-9f35-317a82b78b8c.png)
![175320547-28a48b1d-a170-4b62-82fe-68ef1be661dc](https://user-images.githubusercontent.com/61939201/175322918-cbcd76ba-6681-4591-b3d7-cfe42c2b6404.png)
![175320608-a8e6503a-95bf-49e7-bc90-9ed76d9c511b](https://user-images.githubusercontent.com/61939201/175322921-27a7cec8-29a6-4b23-835d-91f6066c2ea7.png)
![175320977-ce0b4a69-4986-48a4-a069-bfbaead2e93c](https://user-images.githubusercontent.com/61939201/175322931-d599f0c3-893a-492b-a10a-ae461e112019.png)
![175321115-ecea9af3-6fe7-4cf5-80bb-768f9fbb7cd1](https://user-images.githubusercontent.com/61939201/175322943-29003f4a-36a5-4d32-8b9b-0cb5108bc2ed.png)
![175321469-0bcea6be-00a7-43de-aa86-3d02e263bf9f](https://user-images.githubusercontent.com/61939201/175322953-56504dd2-735c-48e6-8983-e6635db0d11b.png)
![175321540-2ba55911-ca41-4daa-b68a-67e2c746a836](https://user-images.githubusercontent.com/61939201/175322967-0ca29d26-fc84-4d14-b7bd-86a05bc3f251.png)
![175321596-34425f86-58dc-4ac1-8f4b-e57b95b6d998](https://user-images.githubusercontent.com/61939201/175322980-0b938498-90ab-46ed-a0d6-36e561fd7401.png)
