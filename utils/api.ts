import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.BACKEND
    : process.env.BACKEND;

interface LoginData {
  accessToken: string;
  refreshToken: string;
}

const loginApi = async (code: string) => {
  // const accessToken = `Test Access Token : ${code}`;
  // const refreshToken = 'Test Refresh Token';

  // return { accessToken, refreshToken };
  try {
    const response = await axios.get<string>(`/oauth/kakao?code=${code}`);
    console.log(response);
    console.log(`data : ${response.data}`);

    const accessToken = `Test Access Token : ${code}`;
    const refreshToken = 'Test Refresh Token';
    // return response.data;
    return { accessToken, refreshToken };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw 'Somethig Error';
    }
  }
};

export { loginApi };
