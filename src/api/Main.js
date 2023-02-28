import axios from "axios";

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

export { RandomList };
