import axios from "axios";

const getDetail = async (id) => {
    const response = await axios.get(`http://sparta-kdh.kro.kr/api/travel/${id}`);
    return response.data;
  };
export { getDetail };
