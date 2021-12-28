import { message } from "ant-design-vue";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiMessageModel } from "../services/model/httpModel";

const instance = axios.create();

const VITE_API_URL = import.meta.env.VITE_API_URL;

if (VITE_API_URL) {
  instance.defaults.baseURL = VITE_API_URL as string;
}

instance.defaults.timeout = 10000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const data = response.data;
    if (!data || !data.code || data.code != 200) {
      message.error(data.message);
      return Promise.reject(response.data);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const get = (url: string, config: AxiosRequestConfig): Promise<any> => {
  return request(url, { ...config, method: "GET" });
};

const post = (url: string, config: AxiosRequestConfig): Promise<any> => {
  return request(url, { ...config, method: "POST" });
};

const put = (url: string, config: AxiosRequestConfig): Promise<any> => {
  return request(url, { ...config, method: "PUT" });
};

const request = (url: string, config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    instance
      .request<any, AxiosResponse<ApiMessageModel>>({
        ...config,
        url: instance.defaults.baseURL + url,
      })
      .then((res: AxiosResponse<ApiMessageModel>) => {
        resolve(res.data.data);
      })
      .catch((e: Error | AxiosError) => {
        if (axios.isAxiosError(e)) {
          // rewrite error message from axios in here
        }
        reject(e);
      });
  });
};

export { instance as axios, get, post, put, request };
