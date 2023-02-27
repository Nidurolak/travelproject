import axios from "axios";

const instance = axios.create({
  baseURL: "http://sparta-kdh.kro.kr/api",
})

const login = async (data) => {
  const res = await axios.post("http://sparta-kdh.kro.kr/api/user/login", data);
  return res;
};

export { login };


//const userToken = response.headers.authorization;