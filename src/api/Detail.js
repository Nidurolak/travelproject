import axios from "axios";
import { getCookie } from "../util/cookie";

const getDetail = async (id) => {
    const response = await axios.get(`http://sparta-kdh.kro.kr/api/travel/${id}`);
    return response.data;
  };



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
      return Promise.reject(error);
    }
  );
  
  const deleteComment = async(data) =>{
     await instance.delete(`http://sparta-kdh.kro.kr/api/travel/${data.pam}/comment/${data.commentId}`)
  }
export { getDetail,deleteComment};
