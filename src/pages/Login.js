import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/modules/loginSlice";
import HeadBar from "../components/header/Header";
import moment from "moment/moment";

function Login() {
  const [username, setusername] = useState("")
  const [password, setuserpassword] = useState("")
  const [cookie, setCookie] = useCookies(['wow'])
  const navi =useNavigate();
  const {userName, userNickName} = useSelector((state) =>state.login)

  const userIDChange = (event) => {
    setusername(event.target.value);
  };
  const userPassWordChange = (event) => {
    setuserpassword(event.target.value);
  };
  const dispatch = useDispatch();

  const mutate = useMutation(login)

  const CheckLogin = async (event) => {
    event.preventDefault();
    const data = {
      username,
      password
    }
    
    //리덕스는 새로고침하면 사라진다.
    //다른 곳에도 글로벌하게 쓰려면 어떻게 관리해야하는가?
    //2가지 방법이 있다. 토큰을 쿠키에 저장하고 있다. 이것처럼 이 둘도 쿠키에 저장을 한다?
    //여기서 좀 더 나가면 개인정보기에 넣기는 좀 그시기한데.....
    //그래서 나온 2번째 작업이 있는데 유저 정보만 받아올 수 있는 API가 필요하다? 많은 페이지에 쓰일 수 있기에
    //공용적으로 쓸 수 있는 컴포넌트에서 쓴다. app.js에서 겟 요청을 하면 가져올 것이기 때문에 페이지를 가져와도 하기 때문에
    //아 그러면 APp.js에다 저 디스패치를 쓰나요
    //근데 공용 장소에서 그걸 쓰긴 좀... 다른 방법은
    //매 페이지에서 호출을 하는 컴포넌트에 저 디스패치를 꽂아라
    //그러면 매 페이지에서 get 요청으로 챙겨와야 한다. 

    try{
      const res = await mutate.mutateAsync(data)
      const {status, message} = res.data
      console.log(res.data.data.token)
      if(status == true){
        console.log(res.data.data.token)
        window.alert('로그인 성공!')
        const expires =  moment().add('60','m').toDate()
        setCookie("wow", res.data.data.token, {expires, path: "/", sameSite:"strict"})
        navi("/")

      }
    }
    catch(error){
      window.alert(error.response.data.message)
      console.log(error)
    }
    console.log("요기 너머에 유저네임 와야함 ",userName)
  }
  return (<>
    <HeadBar></HeadBar>
    <LoginContainer>
      <form onSubmit={CheckLogin}>
        <LoginForm>
          <LoginTitle>로그인ID</LoginTitle>
          <Input type="text" placeholder="ID" onChange={userIDChange} maxLength={10}/>
          <LoginTitle>비밀번호</LoginTitle>
          <Input type="password" placeholder="Password" onChange={userPassWordChange}/>
          <>비밀번호 혹은 ID가 일치하지 않습니다</>
          <LoginButton>로그인하기</LoginButton>
        </LoginForm>
      </form>
    </LoginContainer>
  </>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(110, 100, 255);
  border-radius: 10px;
  padding: 30px;
  /* margin-left: 900px; */
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const LoginButton = styled.button`
  width: 70%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  margin-top: 30px;
`;
