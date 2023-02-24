import React from "react";
import styled from "styled-components";

function Signup() {
  return (
    <SignupContainer>
      <SignupForm>
        <SignupTitle>회원가입</SignupTitle>
        <Input type="text" placeholder="회원가입 ID" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="text" placeholder="닉네임" />
        <>ID는 6~14글자 사이여야 합니다</>
        <SignupButton>가입하기</SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 30px;
`;

const SignupTitle = styled.h2`
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

const SignupButton = styled.button`
  width: 70%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  margin-top: 30px;
`;
