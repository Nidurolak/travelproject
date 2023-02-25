import axios from "axios";

const signup = async (data) => {
  console.log(data);
  const res = await axios.post(
    "http://sparta-kdh.kro.kr/api/user/signup",
    data
  );
  return res;
};

export { signup };
