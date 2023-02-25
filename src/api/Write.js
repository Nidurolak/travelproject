import axios from "axios";

const makePost = async (data) => {
    const res = await axios.post("http://sparta-kdh.kro.kr/api/travel", data);
    return res;
  };
  
  export { makePost };
  

