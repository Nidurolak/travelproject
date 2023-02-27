import axios from "axios";

const getDetail = async (id) => {
    const response = await axios.get(`http://sparta-kdh.kro.kr/api/travel/${id}`);
    return response.data;
  };

  const deleteComment = async(data) =>{
     await axios.delete(`http://sparta-kdh.kro.kr/api/travel/${data.pam}/comment/${data.commentId}`)
  }
export { getDetail,deleteComment};
