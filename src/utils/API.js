import axios from "axios";
import {checkAuth} from "./InterceptorService";

const api = axios.create({
  baseURL: "https://assignment-reactjs-co.herokuapp.com/v1",
  responseType: "json"
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;
    if (status === 401) {
      checkAuth()
    }

    return Promise.reject(error);
  },
);


export {api}