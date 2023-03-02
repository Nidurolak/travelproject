import React, { useRef } from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import {  useState } from 'react';
import { makePost } from "../api/Write";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import HeadBar from "../components/header/Header";




function Write() {
  const imageref = useRef();
  const [title, setTitle] = useState("")
  const [images, setImages] = useState()
  const [postImages, setPostImages] = useState()
  const [preview, setPreview] = useState()
  const [content, setContent] = useState("")
  const [budget, setBudget] = useState(1)
  const navi = useNavigate()


  const TitleTextHandler = (event) =>{
    setTitle(event.target.value)
  }
  
  const ContentTextHandler = (event) =>{
    setContent(event.target.value)
  }
  const ImageHandler = (event) => {
    const file = event.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.onloadend = () =>{
      setImages(reader.result)
    }
    reader.readAsDataURL(file)
    setPostImages(file)
    console.log(reader)
    console.log(images)
  }

  const mutate = useMutation(makePost, {onSuccess: (data) =>{
  window.alert("게시글 작성 성공")
  navi(`/detail/${data.data.data.id}`)
  console.log(data)},}
  )
  const submitPost = async (event)=> {
    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('budget', budget)
    formdata.append('images', postImages)

    console.log(formdata)

    console.log("ADsasdasd")
    for (const [key, value] of formdata.entries()) {
      console.log(key, value);
    }
    try{
      const res = await mutate.mutateAsync(formdata)
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
        <DetailContentContainer>
        <DetailContentLeftBox>
        <img src={images ? images :"/defaultInput.png"} alt="이미지를 가져와 주십시오"  style={{ width: "400px", height: "240px" }}/>
        <input type="file" accept="image/jpeg, image/png" onChange={ImageHandler}></input>
        
        <DetailcontentSelectBox>
        <h3>사용한 예산 </h3>
        <select >
          <option value="1">30만원 미만</option>
          <option value="2">30 ~ 50만원</option>
          <option value="3">50~ 70 만원</option>
          <option value="4">70만원 초과</option>
        </select>
        </DetailcontentSelectBox>
        
        </DetailContentLeftBox>

        
        <DetailContentRightBox>
          
        <PutNameInput placeholder="30자 미만으로 적어주세요" maxLength={29}  onChange={TitleTextHandler}></PutNameInput>
        <PutInput placeholder="300자 미만으로 적어주세요" maxLength={299}  onChange={ContentTextHandler}></PutInput>
        <DetailContentButton onClick={submitPost}>작성하기</DetailContentButton>
        </DetailContentRightBox>
        </DetailContentContainer>

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

const DetailContentContainer = styled.div`
display: flex;
  flex: 1;
flex-wrap: wrap;
align-items: center;
justify-content: flex-end;
padding: 10px;
background-color: rgb(210, 210, 210);
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

const DetailContentLeftBox = styled.div`
display: flex;
  flex: 1;
flex-direction: column;
justify-content: center;
align-items: center;
width:550px;
height: 500px;
background-color: rgb(170, 170, 170);
`
const DetailcontentSelectBox = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-left: 10px;
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
height: 500px;
background-color: rgb(170, 170, 170);
> * {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}
`

export default Write;
