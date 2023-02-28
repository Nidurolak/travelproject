import React, { useState } from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { getDetail,deleteComment, deleteDetail, postComment } from "../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie'; 
import HeadBar from "../components/header/Header";
import { useSelector } from "react-redux";
import { getCookie } from "../util/cookie";


//{if(props.id != states.NickName){

//}}

function ShowReples(props){
  let states = useSelector((state)=>{
    return state
  })
  
  const navi = useNavigate()
  const deleteMutate = useMutation(deleteComment)
  const DeleteCommentHandler = (props) =>{
    try{
      const res = deleteMutate.mutateAsync(props)
      window.alert("삭제 완료.")
      window.location.reload()
    }
    catch(error){
      window.alert("유효하지 않은 아이디입니다.")
      console.log(error.response.data.message)
    }
  }
  const commenteCase = {
    pam : props.pam,
    commentId : props.commentId
  }
  const showdelete = false;
  console.log(states.isLogin.userName.username)
  console.log(props.username)
  if(states.isLogin.userName.username == props.username){
    showdelete = true
  }
  return(<>
    <DetailRepleBox>
      <RepleReftContainer>
      <RepleComment bg = {"gold"} height = {"25"} width = {"300"} fontsize = {"14"}>
        <div>{props.nickname}</div>
        <div>{props.createdAt}</div>
      </RepleComment>
      <RepleComment bg = {"gray"} height = {"90"} width = {"550"} fontsize = {"22"}>
        {props.comment}
      </RepleComment>
      </RepleReftContainer>{showdelete && (
      <RepleDeleteBox onClick={() => DeleteCommentHandler(commenteCase)}>
      </RepleDeleteBox>)}
      
    </DetailRepleBox>
  </>)
}
//console.log(commenteCase){data.pam}/comment/${data.commentId}`)
function Detail() {
  const navi = useNavigate()
  let states = useSelector((state)=>{
    return state
  })
  
  const deleteMutate = useMutation(deleteDetail)
  const addMutate = useMutation(postComment)
  const pam = useParams()
  const [comment, setComment] = useState("");
  const commentHandler = (event) =>{
    setComment(event.target.value)
  }

  const{isLoading, isError, data} = useQuery("getDetail", () => getDetail(pam.id))
  if(isLoading){
    return<div>로딩중.........로딩중.........딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
  
  const DetailDeleteHandler = (props) => {
    deleteMutate.mutate(pam.id)
    window.location.reload()
  }
  
  const CommentSubmitHandler = (event) => {
    if(getCookie('wow') != null){
      console.log("쿠키 있네?")
      console.log(states.isLogin)
      const data = {
        pam : pam.id,
        comment,
      }
      console.log(data)
        addMutate.mutate(data)
        window.alert("댓글 작성 성공")
        window.location.reload()
    }
    else{
      console.log("쿠키 없네?")
      window.alert("로그인이 필툐한 기능입니다.")
      navi("/login")
    }

  }
  return (<>
  <HeadBar>
  </HeadBar>
    <Container>
      <DetailContainer>
        <DetailContentContainer>
        <DetailContentLeftBox>
          <DetailContentLeftImage imageUrl={data.data.images}/>
          <DetailcontentLeftButtonBox>
            <DetailContentButton>수정하기</DetailContentButton>
            <DetailContentButton onClick={() => DetailDeleteHandler(pam.id)}>삭제하기</DetailContentButton>
            <DetailContentButton>좋아요</DetailContentButton>

          </DetailcontentLeftButtonBox>
          </DetailContentLeftBox>
        <DetailContentRightBox>
    <h2>타이틀 : {data.data.title}</h2>
    <h2>내용 : {data.data.content}</h2>
    <h2>예산 : {data.data.budget}</h2>
    <h2>좋아요 : {data.data.likeCount}</h2>
    <h2>작성일 : {data.data.createdAt}</h2>
    </DetailContentRightBox>
        </DetailContentContainer>
        <CommentInputBox>
        <CommentInput onChange={commentHandler} placeholder="100자 미만으로 적어주세요" maxLength={99}></CommentInput>
        <CommentSubmit onClick={CommentSubmitHandler}></CommentSubmit>
        </CommentInputBox>
      </DetailContainer>

      {data.data.comments.map((item) => {
        return (<ShowReples
           key = {item.id}
            id = {item.id}
             username = {item.username}
              comment = {item.comment}
               createdAt = {item.createdAt}
               pam = {pam.id}
               commentId = {item.id}
               nickname = {item.nickname} />)})}
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
  & > *:not(:first-child) {
    margin-top: 15px;
  }
`

const CommentInputBox = styled.div`
padding-right: 10px;
width: 1150px;
max-width: 80%;
height: 80px;
border: 4px solid black;
border-radius: 7px;
display: flex;
justify-content: space-between;
align-items: center;
`
const CommentInput = styled.textarea`
width: 80%;
height: 75px ;
background-color: wheat;
border-radius: 5px;
margin-left: 3px;
box-sizing: border-box;

text-align: left;
vertical-align: top;
white-space: pre-wrap;
word-wrap: break-word;
resize: none;
`
const CommentSubmit = styled.button`
background-image : url(/check.jpg);
border: 3px solid gold;
border-radius: 5px;
width: 50px;
height: 50px;
background-size: cover;
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
  width: 400px;
  height: 240px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center center;
  `
const DetailcontentLeftButtonBox = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
  background-color: pink;
  `
const DetailContentButton = styled.button`
width: 80px;
height: 40px;
border: 3px solid gold;
border-radius: 5px;
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
