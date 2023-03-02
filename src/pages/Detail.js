import React, { useState,useRef } from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { getDetail, deleteComment, deleteDetail, postComment, putCotents, postLike } from "../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import HeadBar from "../components/header/Header";
import { useSelector } from "react-redux";
import { getCookie } from "../util/cookie";
import { useEffect } from "react";


function ShowReples(props) {
  const { userName, userNickName } = useSelector((state) => state.login)
  const [showdelete, setshowdelete] = useState(false);

  const navi = useNavigate()
  //const deleteMutate = useMutation(deleteComment)
  const deleteMutate = useMutation(deleteComment, {
    onSuccess: (data) => {
      window.alert("댓글 삭제 성공")
      window.location.reload()
    }
  })



  const DeleteCommentHandler = (jang) => {
    try {
      const res = deleteMutate.mutateAsync(jang)
      //props.setdataset(res.data?.data)
    }
    catch (error) {
      console.log(error)
    }
  }


  const commenteCase = {
    pam: props.pam,
    commentId: props.commentId
  }
  return (<>
    <DetailRepleBox>
      <RepleReftContainer>
        <RepleComment bg={"gold"} height={"25"} width={"300"} fontsize={"14"}>
          <div>{props.nickname}</div>
          <div>{props.createdAt}</div>
        </RepleComment>
        <RepleComment bg={"gray"} height={"90"} width={"550"} fontsize={"22"}>
          {props.comment}
        </RepleComment>
      </RepleReftContainer>{
        (userNickName === props.nickname) && (
          <RepleDeleteBox onClick={() => DeleteCommentHandler(commenteCase)}>
          </RepleDeleteBox>)}

    </DetailRepleBox>
  </>)
}





function Detail() {
  const queryclient = useQueryClient();
  const navi = useNavigate()
  const { userName, userNickName } = useSelector((state) => state.login)
  const [putContentText, SetPutContentText] = useState()
  const [putTitleText, SetputTitleText] = useState()
  const [putBudget, SetputBudget] = useState()
  const [putImage, setPutImage] = useState(null)
  const [preview, setPreview] = useState("");
  const [selectValue, setSelectValue] = useState(1)
  let prevImageRef = useRef()
  const PutContentTextHandler = (event) => {
    SetPutContentText(event.target.value)
  }
  const PutTitleTextHandler = (event) => {
    SetputTitleText(event.target.value)
  }
  const PutBudgetHandler = (event) => {
    SetputBudget(event.target.value)
  }

  const deleteMutate = useMutation(deleteDetail, {
    onSuccess: () => {
      queryclient.invalidateQueries("getDetail");
    }
  })
  const addMutate = useMutation(postComment, {
    onSuccess: (data) => {
      window.alert("댓글 작성 성공")
      window.location.reload()
    },
  })
  const putMutate = useMutation(putCotents, {
    onSuccess: (data) => {
      window.alert("게시글 수정 성공")
      window.location.reload()
    },
  })

  const likeMutate = useMutation(postLike, {
    onSuccess: (data) => {
      window.alert("좋아요!")
      window.location.reload()
    },
  })

  const pam = useParams()
  const [comment, setComment] = useState("");
  const commentHandler = (event) => {
    setComment(event.target.value)
  }
  const [phase, setphase] = useState(true)
  const [dataset, setdataset] = useState([]);

  const { isLoading, isError, data, refetch } = useQuery("getDetail", () => getDetail(pam.id), {
    onSuccess: (res) => {

      if (res.data.comments.length > 0) {
        //console.log(res.data)
        setdataset(res.data.comments)
        SetPutContentText(res.data.content)
        SetputTitleText(res.data.title)
        SetputBudget(res.data.budget)
        //setPutImage(res.data.images)
        console.log(dataset)
      }
      prevImageRef.current = res.data.images;
    }
  })
  
  
  if (isLoading) {
    return <div>로딩중.........로딩중.........딩중.........로딩중.........</div>
  }
  if (isError) {
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
/*
  console.log(putContentText)
  console.log(putTitleText)
  console.log(putBudget)
  console.log(putImage)
*/
  const DetailDeleteHandler = (props) => {
    deleteMutate.mutate(pam.id)
    queryclient.invalidateQueries();
  }
  const CommentSubmitHandler = () => {
    if (getCookie('wow') != null) {
      console.log("쿠키 있네?")
      const data = {
        pam: pam.id,
        comment,
      }
      addMutate.mutate(data)
      //window.alert("댓글 작성 성공")
      //window.location.reload()
    }
    else {
      console.log("쿠키 없네?")
      window.alert("로그인이 필툐한 기능입니다.")
      navi("/login")
    }
  }
  

  const PutImageHandler = (event) =>{
    const selectedFile = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () =>{
      setPreview(reader.result)
      console.log(reader.result)
      console.log(reader)
    }
    console.log(event.target.files[0].name)

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      }
      else{
      setPreview(prevImageRef.current);
      }
    setPutImage(selectedFile)
    console.log(putImage)
  }

  function handelPrevImageLoad(){
    if(preview != null){
      console.log("tqtqtqtqtqqttqtqtq")
      prevImageRef.current = preview
    }
  }

  const SelectHandler = (event) =>{
    console.log(event.target.value)
      setSelectValue(event.target.value)
  }

  const PutHandler = () => {
    const data = new FormData()
    data.append('title', putTitleText)
    data.append('content', putContentText)
    data.append('budget', selectValue)
    if(putImage != null){
      data.append('images', putImage)
    }

    console.log(putImage)
    data.append('budget', 1)
    const box = {
      formdata : data,
      pam : pam.id
    }
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
    console.log(putTitleText)
    console.log(putContentText)
    putMutate.mutate(box)
  }

  const phasebutton = true
  let budgetCase = ""

  switch (data.data.budget) {
    case 1:
      budgetCase = "30 만원 이하"
      break;
    case 2:
      budgetCase = "30 ~ 50 만원"
      break;
    case 3:
      budgetCase = "50 ~ 70 만원"
      break;
    case 4:
      budgetCase = "70 만원 이상"
      break;
    default:
      break;
  }
  return (<>
    <HeadBar></HeadBar>
    <Container>
      <DetailContainer>
        {phase && (
          <DetailContentContainer>
            <DetailContentLeftBox>
              <DetailContentLeftImage imageUrl={data.data.images} />
              <DetailcontentLeftButtonBox>
                {(getCookie('wow') != null) && (userNickName === data.data.nickname) && (<>
                  <DetailContentButton onClick={() => setphase(false)}>수정하기</DetailContentButton>
                  <DetailContentButton onClick={() => DetailDeleteHandler(pam.id)}>삭제하기</DetailContentButton>
                </>
                )}
                <DetailContentButton onClick={() => likeMutate.mutate(pam.id)}>좋아요</DetailContentButton>
              </DetailcontentLeftButtonBox>
            </DetailContentLeftBox>
            <DetailContentRightBox>
              <h2>타이틀 : {data.data.title}</h2>
              <NicknameAndDateBox>
                <h3>작성자 : {data.data.nickname}</h3>
                <h4>작성일 : {data.data.createdAt}</h4>
              </NicknameAndDateBox>
              <DetailContentBox>
                <h3>내용 : {data.data.content}</h3>
              </DetailContentBox>
              <h4>예산 : {budgetCase}</h4>
              <h2>좋아요 : {data.data.likeCount}</h2>
            </DetailContentRightBox>
          </DetailContentContainer>

        )}
        {!phase && (
          <DetailPutContainer>
            <InputContentLeftBox>
            {!preview &&(
              <img
              src = {prevImageRef.current}
              alt="Previous Image"
              style={{ width: "400px", height: "240px" }}
              />
            )}
            {preview && preview !== prevImageRef.current && (
              <img
              src = {preview}
              alt="Preview"
              style={{ width: "400px", height: "240px" }}/>
            )}
              
              <InputcontentLeftButtonBox>
                <form onSubmit={PutHandler}></form>
                
                <input type="file" accept="image/jpeg, image/png" onChange={PutImageHandler}></input>

                <DetailContentButton onClick={ PutHandler}>수정완료</DetailContentButton>
                <DetailContentButton onClick={() => setphase(true)}>취소하기</DetailContentButton>
        <select onChange={SelectHandler}>
          <option value="1">30만원 미만</option>
          <option value="2">30 ~ 50만원</option>
          <option value="3">50~ 70 만원</option>
          <option value="4">70만원 초과</option>
        </select>
              </InputcontentLeftButtonBox>
              
            </InputContentLeftBox>
            <DetailContentRightBox>

              <PutNameInput placeholder="30자 미만으로 적어주세요" maxLength={29} defaultValue={data.data.title} onChange={PutTitleTextHandler}></PutNameInput>
              <PutInput placeholder="300자 미만으로 적어주세요" maxLength={299} defaultValue={data.data.content} onChange={PutContentTextHandler}></PutInput>

            </DetailContentRightBox>

          </DetailPutContainer>
        )}
        <CommentInputBox>
          <CommentInput onChange={commentHandler} placeholder="100자 미만으로 적어주세요" maxLength={99}></CommentInput>
          <CommentSubmit onClick={CommentSubmitHandler}></CommentSubmit>
        </CommentInputBox>
      </DetailContainer>

      {data.data.comments.map((item) => {
        return (<ShowReples
          key={item.id}
          id={item.id}
          username={item.username}
          comment={item.comment}
          createdAt={item.createdAt}
          pam={pam.id}
          commentId={item.id}
          nickname={item.nickname}
          setdataset={setdataset} />)
      })}
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
align-items: flex-start;
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

export default Detail;
