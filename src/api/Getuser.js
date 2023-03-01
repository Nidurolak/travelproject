import axios from "axios";
import { getCookie } from "../util/cookie";

const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api/user",
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

const getUser = async (data) => {
    const res = await instance.post("http://sparta-kdh.kro.kr/api/user", data);
    console.log(res)
    return res;
  };
  
  export { getUser };
  

