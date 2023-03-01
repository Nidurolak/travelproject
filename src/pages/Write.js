import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { makePost } from "../api/Write";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import HeadBar from "../components/header/Header";




function Write() {
  const [title, setTitle] = useState("")
  const [images, setImages] = useState("")
  const [content, setContent] = useState("")
  const [budget, setBudget] = useState(0)

  const TitleTextHandler = (event) =>{
    setTitle(event.target.value)
  }
  
  const ContentTextHandler = (event) =>{
    setContent(event.target.value)
  }

  const mutate = useMutation(makePost)
  const submitPost = async (event)=> {
    console.log("ADsasdasd")
    const data ={
      title,
      images,
      content,
      budget
    }
    try{
      const res = await mutate.mutateAsync(data)
      console.log(res)
      const {message} = res.data

      console.log(message)

    }
    catch(error){
        console.log("afgaagaag")
    }
  }


  return (<>
  <HeadBar></HeadBar>
    <Container>
      <DetailContainer>
        <DetailContentLeftBox>

        </DetailContentLeftBox>

        
        <DetailContentRightBox>
          
        <PutNameInput placeholder="30자 미만으로 적어주세요" maxLength={29}  onChange={TitleTextHandler}></PutNameInput>
        <PutInput placeholder="300자 미만으로 적어주세요" maxLength={299}  onChange={ContentTextHandler}></PutInput>
        <DetailContentButton >작성하기</DetailContentButton>
        </DetailContentRightBox>

      </DetailContainer>


    </Container>

  </>)
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
const NicknameAndDateBox = styled.div`
  width: 520px;
  height: 40px;
  display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-left: 10px;
padding-right: 10px;
`
const DetailContentBox = styled.div`
height: 180px;
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
const PutInput = styled.textarea`
width: 530px;
height: 400px ;
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
const PutNameInput = styled.textarea`
width: 530px;
height: 70px ;
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

const DetailPutContainer = styled.div`
display: flex;
  flex: 1;
flex-wrap: wrap;
align-items: center;
justify-content: flex-end;
padding: 10px;
background-color: rgb(210, 210, 210);
`
const InputContentLeftBox = styled.div`
display: flex;
  flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
width:550px;
height: 400px;
background-color: rgb(170, 170, 170);
`
const InputContentLeftImage = styled.div`
background-image: url(${props => props.imageUrl});
  width: 400px;
  height: 240px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center center;
  `
const putContentLeftImage = styled.div`
image{
  width: 400px;
  height: 240px;
}
  `
const InputcontentLeftButtonBox = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
  background-color: pink;
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
width: 550px;
height: 400px;
background-color: rgb(170, 170, 170);
> * {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}
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
width: ${props => props.width}px;
height: ${props => props.height}px;
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


export default Write;
