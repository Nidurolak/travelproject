import axios from "axios";
import { getCookie } from "../util/cookie";

const RandomList = async () => {
  try {
    const res = await axios.get("http://sparta-kdh.kro.kr/api/travel");
    console.log("get방식입니다")
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
const token=getCookie('wow')


const mytextlist = async () => {
 try{ const res = await axios.get(
    "http://sparta-kdh.kro.kr/api/travel/mylist",{headers:{Authorization:token} }
  );
  return res;
 } catch(error){
  console.log('mytextlist',error);
 }
};
const listfilter = async (data) => {
  console.log(data);
  const res = await instance.post("http://sparta-kdh.kro.kr/api/travel", data);
  console.log("post방식입니다")
  return res;
};




export { RandomList,mytextlist, listfilter };
