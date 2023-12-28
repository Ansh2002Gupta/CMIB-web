import axios from "axios";
import { API_VERSION_NUMBER } from "./constant/apiEndpoints";
// import { StorageService } from './services'

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // *** Just an example *** //
    // const token = StorageService.get('auth')
    // if (token && token.access_token) {
    //   config.headers = {
    //     Authorization: `Bearer ${token.access_token}`
    //   }
    // }
    // ****** //
    config.headers["Content-Type"] = "multipart/form-data";
    config.headers["api-version"] = API_VERSION_NUMBER;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
