## 사용 기술
`NEXT.js`, `Zustand`, `mui`, `axios`, `styled-components`

## 구동 방법
1. Repository의 파일 다운
2. `yarn` 또는 `npn`을 이용하여 package들을 설치, `yarn install` 또는 `npm install`
3. `.env.local`파일을 package.json과 동일한 디렉토리(최상단 디렉토리)에 생성 후 아래와 같이 작성
```json
  MAP_KEY_API = "여기에 naver map에서 받은 client id를 넣으면 됩니다 ex) 1q2w3e4r"
  BACKEND = '여기에 spring을 사용한 백엔드 서버주소를 넣으면 됩니다, ex) http://localhost:8080'
```
4. `yarn run dev`로 프론트엔드 서버 구동
