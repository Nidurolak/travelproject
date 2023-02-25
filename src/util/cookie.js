import { Cookies } from "react-cookie";

const cookies = new Cookies()

//셋쿠키는 3가지 파라미터를 받는다. 키, 밸류, 옵션
//옵션은 path(서버경로, url 의미, "/"로 하면 모든 페이지에서 쿠키 접속 가능)
// expires(만료 시간, Date 객체를 받음)
//httpOnly(JS의 document.cooKie를 이용해서 쿠키에 접속 차단. 보안 조치)
//secure(http로 통신하는 경우에만 쿠키를 서버로 전송한다.)
export const setCookie = (name, value, option) =>{
    return cookies.set(name, value, {...option})
}

//겟쿠키는 심플하다. 쿠키를 가져온다.
export const getCookie = (name) => {
    return cookies.get(name)
}
//리무브쿠키는 셋 쿠키에 저장한 모든 내용을 지워야 하ㅓㄴ다. key와  option을 꼭 받아야한다.
export const removeCookie = (name, option) => {
    return cookies.remove(name, {...option})
}