import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './statics';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.BACKEND
      : process.env.BACKEND,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //요청 성공 직전 호출
    // if (config.headers === undefined) {
    //   config.headers = {};
    // }
    // const accessToken: string = localStorage.getItem(ACCESS_TOKEN) as string;
    // config.headers.Authorization = 'bearer ' + accessToken;
    return config;
  },
  (error: AxiosError) => {
    //요청 에러 직전 호출
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    //status가 200인 경우 호출
    //.then()으로 이어짐
    return response;
  },
  async (error: AxiosError) => {
    //status가 200이 아닌 경우
    //.catch()으로 이어짐
    // const { config, response } = error;
    // if (response !== undefined) {
    //   if (response.status === 401) {
    //     // AccessToken 만료로 인한 401에러
    //     const originalRequest: AxiosRequestConfig = config;
    //     const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    //     const { data } = await axios.post('/refresh/token', { refreshToken });
    //     const { newAccessToken, newRefreshToken } = data;
    //     localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    //     localStorage.setItem(REFRESH_TOKEN, newRefreshToken);

    //     if (originalRequest.headers === undefined) {
    //       originalRequest.headers = {};
    //     }
    //     //이전 요청의 accessToken을 새로운 accessToken으로 변경
    //     instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
    //     originalRequest.headers.Authorization = 'bearer ' + newAccessToken;

    //     // 401로 실패한 요청을 새로운 accessToken으로 재요청
    //     return instance(originalRequest);
    //   }
    // }

    return Promise.reject(error);
  },
);

export default instance;
