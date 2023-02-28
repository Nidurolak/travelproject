import axios from "axios";
import { getCookie } from "../util/cookie";

const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api/travel",
})
instance.interceptors.request.use(
  (config) => {
    // 요청 헤더를 수정합니다.
    const token = getCookie('wow')
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    console.log("qqqqqqqqqqqqqqq")
    return Promise.reject(error);
  }
);

const makePost = async (data) => {
    const res = await instance.post("http://sparta-kdh.kro.kr/api/travel", data);
    return res;
  };
  
  export { makePost };
  

