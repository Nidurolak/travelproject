import axios from "axios";

const randomList = async () => {
  try {
    const response = await axios.get("http://sparta-kdh.kro.kr/api/travel");
    return response;
  } catch (e) {
    console.log("showStore", e);
  }
};
export { randomList };
