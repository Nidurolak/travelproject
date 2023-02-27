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
  const pam = useParams()
  console.log(pam.id)
  const{isLoading, isError, data} = useQuery("getDetail", () => getDetail(pam.id))
  if(isLoading){
    return<div>로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
  console.log(data.data)
  return (<>
  <HeadBar>
  </HeadBar>
    <Container>
      <DetailContainer>
        <DetailContentContainer>
        <DetailContentLeftBox>
          <DetailContentLeftImage imageUrl={data.data.images}/>
          </DetailContentLeftBox>
        <DetailContentRightBox>
    <h2>타이틀 : {data.data.title}</h2>
    <h2>내용 : {data.data.content}</h2>
    <h2>예산 : {data.data.budget}</h2>
    <h2>좋아요 : {data.data.likeCount}</h2>
    <h2>작성일 : {data.data.createdAt}</h2>
    </DetailContentRightBox>
        </DetailContentContainer>
      </DetailContainer>
    <DetailRepleBox>
      <RepleComment>
        asdasdasdasdasdasdsda
      </RepleComment>
      <RepleComment>
        asdasdasdasdasdasdsda
      </RepleComment>
      <RepleComment>
        asdasdasdasdasdasdsda
      </RepleComment>
    </DetailRepleBox>
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
padding-top: 15px;
`

const DetailContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-end;
width: 1200px;
max-width: 80%;
height: 600px;
background-color: rgb(230, 230, 230);
`

const DetailContentContainer = styled.div`
display: flex;
  flex: 1;
flex-wrap: wrap;
align-items: center;
justify-content: flex-end;
padding: 10px;
background-color: rgb(210, 210, 210);
`
const DetailContentLeftBox = styled.div`
display: flex;
  flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
width:550px;
height: 400px;
background-color: rgb(170, 170, 170);
`

const DetailContentLeftImage = styled.div`
background-image: url(${props => props.imageUrl});
  width: 300px;
  height: 240px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center center;
  `

const DetailContentLeftButtonBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  flex: 1;
width:550px;
height: 400px;
background-color: rgb(190, 190, 190);
`
const DetailContentRightBox = styled.div`
display: flex;
  flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
width:550px;
height: 400px;
background-color: rgb(170, 170, 170);
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
const RepleComment = styled.div`
width: 500px;
height: 90px;
font-size: 14px;
overflow: hidden;
word-break: break-word;
text-overflow: ellipsis;
display: flex;
justify-content: center;
align-items: center;
`
const Replename = styled.div``
const RepleDate = styled.div``

export default Detail;
