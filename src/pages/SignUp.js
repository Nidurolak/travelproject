import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "react-query";
import { signup } from "../api/SignUp";
import { useNavigate } from "react-router-dom";
import HeadBar from "../components/header/Header";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setuserpassword] = useState("");
  const [nickname, setnickname] = useState("");
  const [errorText, setErrorText] = useState("");
  const navi = useNavigate();

  // 아이디 입력 시 이벤트
  const userIDChange = (event) => {
    setusername(event.target.value);
  };

  // 비밀번호 입력 시 이벤트
  const userPassWordChange = (event) => {
    console.log(event);
    setuserpassword(event.target.value);
  };

  // 닉네임 입력 시 이벤트
  const nicknameChange = (event) => {
    setnickname(event.target.value);
  };
  const errorHandler = (event) => {
    setErrorText(event);
  };


  // 회원가입 요청 처리 함수
  const mutate = useMutation(signup, {
    onError: (error) => {
      if (error.response.status === 409) {
        window.alert("중복된 아이디나 닉네임이 있습니다.");
      } else {
        window.alert("회원가입 실패");
        console.log(error);
      }
    },
  });

  const CheckSignUp = async (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      nickname,
    };

    console.log(data);

    try {
      const res = await mutate.mutateAsync(data);
      console.log(res);
      const { status, message } = res.data;
      console.log(status);
      console.log(message);
      if (status === true) {
        window.alert("회원가입 성공!");
        navi("/");
      } else {
        window.alert(message);
      }
    } catch (error) {
      errorHandler(error.response.data.message);
      console.log(error);
    }
  };

  return (<>
  <HeadBar></HeadBar>
    <SignupContainer>
      <form onSubmit={CheckSignUp}>
        <SignupForm>
          <SignupTitle>회원가입</SignupTitle>
          <Input
            type="text"
            placeholder="회원가입 ID"
            onChange={userIDChange}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            onChange={userPassWordChange}
          />
          <Input type="text" placeholder="닉네임" onChange={nicknameChange} />
          <p>{errorText}</p>
          <SignupButton>가입하기</SignupButton>
        </SignupForm>
      </form>
    </SignupContainer>
  </>
  );
}
export default Signup;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(110, 100, 255);
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
