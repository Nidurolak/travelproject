import axios from "axios";
import { getCookie } from "../util/cookie";

const RandomList = async () => {
  try {
    const res = await axios.get("http://sparta-kdh.kro.kr/api/travel");
    return res;
  } catch (e) {
    console.log("RandomList", e);
  }
};
// const landomList=async()=>{
//   const response=await axios.get()
// }


const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api/travel/mylist",
})
instance.interceptors.request.use(
  (config) => {
    // 요청 헤더를 수정합니다.
    const token = getCookie('wow')
    console.log(token)
    console.log('affaafa')
    config.headers["Authorization"] = token;
    console.log("ppppppppppppp")
    return config;
  },
  (error) => {
    console.log("qqqqqqqqqqqqqqq")
    return Promise.reject(error);
  }
);

const mytextlist = async () => {
 try{ const res = await axios.get(
    "http://sparta-kdh.kro.kr/api/travel/mylist"
  );
  return res;
 } catch(error){
  console.log('mytextlist',error);
 }
};

// try {
//   const response = await axios.post("http://sparta-kdh.kro.kr/api/travel/mylist", data, {
//   headers: {
//   Authorization: token,
//   "Content-Type": "multipart/form-data",
//   },
//   });
//   alert(
//   response
//   );
//   } catch (e) {
//   console.log("postStore", e);
//   }


export { RandomList,mytextlist };