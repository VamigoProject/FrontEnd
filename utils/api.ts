import axios from 'axios';

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development'
//     ? process.env.BACKEND
//     : process.env.BACKEND;

interface LoginData {
  accessToken: string;
  refreshToken: string;
}

const loginApi = async (code: string) => {
  const accessToken = `Test Access Token : ${code}`;
  const refreshToken = 'Test Refresh Token';

  return { accessToken, refreshToken };
  // try {
  //   const response = await axios.get<LoginData>(`/oauth/kakao?code=${code}`);
  //   return response.data;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     throw error;
  //   } else {
  //     throw 'Somethig Error';
  //   }
  // }
};

export { loginApi };
