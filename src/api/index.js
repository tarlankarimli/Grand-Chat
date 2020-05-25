import axios from 'axios';
import apiConfig from '../config/apiConfig'
import appConfig from '../config/appConfig'

const instance = axios.create({
    baseURL: apiConfig.url,
    headers: {'Content-type': 'application/json'}
  });

  instance.interceptors.request.use(function (config) {
    let token = (window.localStorage.getItem(appConfig.Localtoken));
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  export default instance;