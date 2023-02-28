import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/modules/loginSlice";

function Login() {
  const [username, setusername] = useState("")
  const [password, setuserpassword] = useState("")
  const [cookie, setCookie] = useCookies(['wow'])
  const navi =useNavigate();

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
    console.log(data)
    
    try{
      const res = await mutate.mutateAsync(data)
      const {status, message} = res.data
      if(status == true){
        window.alert('로그인 성공!')
        //토큰값 바뀌면 바꿔써야해.
        setCookie("wow", res.data.data, {path: "/", sameSite:"strict"})
        dispatch(isLogin({username}))
        console.log(states.isLogin.userName.username, " asaassas")
        navi("/write")
      }
    }
    catch(error){
      window.alert(error.response.data.message)
      console.log(error)
    }
    console.log("jjjjjjjjjjjjjjjj") 
  }

  let states = useSelector((state)=>{
    return state
  })

  return (
    <LoginContainer>
      <form onSubmit={CheckLogin}>
        <LoginForm>
          <LoginTitle>로그인ID</LoginTitle>
          <Input type="text" placeholder="ID" onChange={userIDChange} maxLength={10}/>
          <LoginTitle>비밀번호</LoginTitle>
          <Input type="password" placeholder="Password" onChange={userPassWordChange}/>
          <>비밀번호 혹은 ID가 일치하지 않습니다</>
          <LoginButton onClick={console.log("aaaaaa")}>로그인하기</LoginButton>
        </LoginForm>
      </form>
    </LoginContainer>
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
  border: 1px solid #ddd;
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
