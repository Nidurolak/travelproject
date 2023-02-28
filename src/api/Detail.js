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

  const postComment = async(comment) =>{
    const requestJson = {
      comment : comment.comment
    }

    console.log(requestJson)
    await instance.post(`http://sparta-kdh.kro.kr/api/travel/${comment.pam}/comment`, requestJson)
  }
  
  const deleteComment = async(data) =>{
     const res = await instance.delete(`http://sparta-kdh.kro.kr/api/travel/${data.pam}/comment/${data.commentId}`)
     return res;
  }
  
  const deleteDetail = async(pam) =>{
     const res = await instance.delete(`http://sparta-kdh.kro.kr/api/travel/${pam}`)
     return res;
  }
export { getDetail,deleteComment, deleteDetail, postComment};
