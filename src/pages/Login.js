import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 

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

  const mutate = useMutation(login)

  const CheckLogin = async (event) => {

    console.log("adasasd")
    event.preventDefault();
    console.log("zzzzzzz")
    const data = {
      username,
      password
    }
    console.log(data)
    console.log("hjhhhhghfgh")
    
    try{
      const res = await mutate.mutateAsync(data)
      console.log(res)
      const {status, message} = res.data
      console.log(status)
      console.log(message)
      if(status == true){
        console.log(res.data.data.token)
        window.alert('로그인 성공!')
        
        console.log(res)
        setCookie("wow", res.data.data.token, {path: "/", sameSite:"strict"})
        navi("/")
      }
    }
    catch(error){
      window.alert(error.response.data.message)
      console.log(error)
    }
    console.log("jjjjjjjjjjjjjjjj") 
  }

  return (
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
