import axios from "axios";

const login = (userid, password) => {
  return axios.post("http://localhost:4000/login", { userid, password });
};

export { login };
