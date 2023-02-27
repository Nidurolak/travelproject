import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { getDetail } from "../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import HeadBar from "../components/header/Header";

//받아와야할 정보들
/*
"title": "나의 여행게시물입니다.", 
"username": "test123",
"images": "file:///D:/sparta/%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%E1%84%85%E1%85%B3%E1%84%90%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B5.png",
"content": "ㅎ에헤헤 에헤헤 에헤헤ㅎ",
"budget": 2,
"likeCount": 0,
"createdAt": "2023-02-26T17:32:06.999882",
"comments": " "
Q. 작성글 ID는 안 받아와도 되는가?
A. 메인 페이지 접근 / 작성 페이지로 들어오기 때문에 없어도 무관, 이미 받아옴.
}
*/ 
function Detail() {

  const title = "";
  const images = "";
  const content = "";
  const budget = "";
  const likeCount = "";
  const createdAt = "";

  const mutate = useMutation()
  const pam = useParams()
  const testData = {
     title : "title",
     images : "images",
     content : "content",
     budget : "10~30",
     likeCount : "999",
     createdAt : "1995-01-08"
  }
  console.log(pam.id)
  const{isLoading, isError, data} = useQuery("getDetail", () => getDetail(pam.id))
  if(isLoading){
    return<div>로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
  console.log(data.data)
/*
  function DataAssignment(testData){
    title = testData.title;
    images = testData.images;
    content = testData.content;
    budget = testData.budget;
    likeCount = testData.likeCount;
    createdAt = testData.createdAt;
  }
*/
  return (<>
  <HeadBar>
  </HeadBar>
    <Container>
      <input></input>
    <h2>타이틀 : {data.data.title}</h2>
    <h2>이미지 : {data.data.images}</h2>
    <h2>내용 : {data.data.content}</h2>
    <h2>예산 : {data.data.budget}</h2>
    <h2>좋아요 : {data.data.likeCount}</h2>
    <h2>작성일 : {data.data.createdAt}</h2>
    <DetailRepleBox>adsasdasdas</DetailRepleBox>
    <DetailRepleBox>adsasdasdas</DetailRepleBox>
    <DetailRepleBox>adsasdasdas</DetailRepleBox>
    <DetailRepleBox>adsasdasdas</DetailRepleBox>
    <DetailRepleBox>adsasdasdas</DetailRepleBox>
    </Container>
  
  </>);
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`

const DetailRepleBox = styled.div`
width: 500px;
height: 70px;
border: 2px solid black;
border-radius: 10px;
display: flex;
justify-content: space-between;
align-items: center;
`

export default Detail;
