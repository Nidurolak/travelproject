import axios from "axios";

// axios.create의 입력값으로 들어가는 객체는 configuration 객체에요.
// https://axios-http.com/docs/req_config
// 위 주소를 참고해주세요!
const instance = axios.create({
	baseURL: "http://sparta-kdh.kro.kr/api/",
});

//배포는 AWS S3로 해야한다.
export default instance;