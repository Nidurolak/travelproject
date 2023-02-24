import axios from "axios";
import { async } from "q";

const login = async (data) => {
  const res = await axios.post("http://sparta-kdh.kro.kr/api/user/login", data);
  console.log(res.data)
};

export { login };
