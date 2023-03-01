
import CustomButton from '../Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../api/Getuser';import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { getDetail, deleteComment, deleteDetail, postComment } from "../../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { async } from 'q';
import { isLogin } from '../../redux/modules/loginSlice';

function HeadBar(){
  const mutate = useMutation(getUser)
  const userNickName = useSelector((state) =>state.login)
  const dispatch = useDispatch()

  /*const { isLoading, isError, data } = useQuery("user", getUser);
  if(isLoading){
    return<div>로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
 console.log(data)*/
  const CheckUser = async () =>{
    try{
      const res = await mutate.mutateAsync("adadad")
      console.log(res.data.data.nickname)
      console.log(")))))))))))))")
    dispatch(isLogin({username : res.data.data.username, nickname: res.data.data.nickname}))
      //닉네임만 챙겨야한다. 
    }
    catch(error){
        console.log("afgaagaag")
    }
  }

  useEffect(() => {
    console.log(userNickName)
    CheckUser()
    console.log("김재우 멋쟁이")
  }, [])

    return(<>
        <Header>
          <Link to={'/'}>
        <CustomButton size = "icon" image = "/house.png"></CustomButton>
          </Link>
          <Headertitle textcolor = 'gold'>로그인 상태 어쩌구저쩌구</Headertitle>
        </Header>
    </>)
}

const Header = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
height: 60px;
background-color: rgb(80, 45, 0);
border: 2px solid gold;
border-radius: 3px;
line-height: 15px;
padding: 10px;
`

const Headertitle = styled.div`
max-width: 450px;
height: 25px;
color: ${props => props.textcolor};
text-align: center;
margin-left: 10px;
margin-right: 10px;
font-size: 25px;
`
export default HeadBar