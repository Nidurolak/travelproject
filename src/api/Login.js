import axios from "axios";
import { async } from "q";

const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api",
})

const login = async (data) => {
  const res = await axios.post("http://sparta-kdh.kro.kr/api/user/login", data);
  return res;
};

export { login };
