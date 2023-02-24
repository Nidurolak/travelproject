import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>로그인ID</LoginTitle>
        <Input type="text" placeholder="ID" />
        <LoginTitle>비밀번호</LoginTitle>
        <Input type="password" placeholder="Password" />
        <>비밀번호 혹은 ID가 일치하지 않습니다</>
        <LoginButton>로그인하기</LoginButton>
      </LoginForm>
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

const LoginForm = styled.form`
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
