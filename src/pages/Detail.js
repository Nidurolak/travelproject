import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { getDetail,deleteComment } from "../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import HeadBar from "../components/header/Header";
import { useSelector } from "react-redux";

function ShowReples(props){

  const deleteMutate = useMutation(deleteComment)
  const DeleteCommentHandler = (props) =>{
    deleteMutate.mutate(props)
  }
  const commenteCase = {
    pam : props.pam,
    commentId : props.commentId
  }
  console.log(commenteCase)
  return(<>
    <DetailRepleBox>
      <RepleReftContainer>
      <RepleComment bg = {"gold"} height = {"25"} width = {"300"} fontsize = {"14"}>
        <div>{props.username}</div>
        <div>{props.createdAt}</div>
      </RepleComment>
      <RepleComment bg = {"gray"} height = {"90"} width = {"550"} fontsize = {"22"}>
        {props.comment}
      </RepleComment>
      </RepleReftContainer>
      <RepleDeleteBox onClick={() => DeleteCommentHandler(commenteCase)}></RepleDeleteBox>
    </DetailRepleBox>
  </>)
}
//console.log(commenteCase){data.pam}/comment/${data.commentId}`)
function Detail() {

  const isLogin = useSelector((state) => state.isLogin)
  const pam = useParams()
  console.log(pam.id)
  const{isLoading, isError, data} = useQuery("getDetail", () => getDetail(pam.id))
  if(isLoading){
    return<div>로딩중.........로딩중.........딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
  console.log(data.data)
  console.log(data.data.comments)
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

      {data.data.comments.map((item) => {
        return (<ShowReples
           key = {item.id}
            id = {item.id}
             username = {item.username}
              comment = {item.comment}
               createdAt = {item.createdAt}
               pam = {pam.id}
               commentId = {item.id} />)})}
    <DetailRepleBox>
      <RepleReftContainer>
      <RepleComment bg = {"gold"} height = {"25"} width = {"300"} fontsize = {"14"}>
        <div>adsasdasdasaag</div>
        <div>qqqqqqqqq</div>
      </RepleComment>
      <RepleComment bg = {"gray"} height = {"90"} width = {"550"} fontsize = {"22"}>
        코카콜라 맛있다 맛있으면 바나나 바나나는 길어 길으면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 기린 기린이었나?
      </RepleComment>
      </RepleReftContainer>
      <RepleDeleteBox></RepleDeleteBox>
    </DetailRepleBox>
    <DetailRepleBox>
      <RepleReftContainer>
      <RepleComment bg = {"gold"} height = {"25"} width = {"300"} fontsize = {"14"}>
        <div>adsasdasdasaag</div>
        <div>qqqqqqqqq</div>
      </RepleComment>
      <RepleComment bg = {"gray"} height = {"90"} width = {"550"} fontsize = {"22"}>
        코카콜라 맛있다 맛있으면 바나나 바나나는 길어 길으면 기차 기차는 빨라 빠르면 비행기 비행기는 높아 높으면 기린 기린이었나?
      </RepleComment>
      </RepleReftContainer>
      <RepleDeleteBox></RepleDeleteBox>
    </DetailRepleBox>
    </Container>
  
  </>);
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 15px;
padding-bottom: 15px;

  & > *:not(:first-child) {
    margin-top: 15px;
  }
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
justify-content: flex-start;
align-items: center;
width:550px;
height: 400px;
background-color: rgb(170, 170, 170);
`

const DetailRepleBox = styled.div`
padding-right: 10px;
width: 650px;
height: 120px;
border: 4px solid black;
border-radius: 7px;
display: flex;
justify-content: space-between;
align-items: center;
`
const RepleReftContainer = styled.div`
width: 570px;
height: 120px;
display: flex;
flex-direction: column;
justify-content: flex-start;
`
const RepleComment = styled.div`
background-color: ${props => props.bg};
padding-left: 10px;
padding-right: 10px;
width: ${props=> props.width}px;
height: ${props=> props.height}px;
font-size: ${props => props.fontsize}px;
overflow: hidden;
white-space: normal;
word-break: break-word;
text-overflow: ellipsis;
display: flex;
justify-content: space-between;
`
const RepleDeleteBox = styled.button`
background-image : url(/delete.png);
border: 3px solid gold;
border-radius: 5px;
width: 50px;
height: 50px;
background-size: cover;
`

export default Detail;
