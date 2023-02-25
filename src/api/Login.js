import axios from "axios";

const login = async (data) => {
  const res = await axios.post("http://sparta-kdh.kro.kr/api/user/login", data);
  return res;
};

export { login };
