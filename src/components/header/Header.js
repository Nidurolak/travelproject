
import CustomButton from '../Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../api/Getuser'; import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { getDetail, deleteComment, deleteDetail, postComment } from "../../api/Detail";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { async } from 'q';
import { isLogin } from '../../redux/modules/loginSlice';
import { getCookie, removeCookie } from '../../util/cookie';

function HeadBar() {
  const mutate = useMutation(getUser)
  const userNickName = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navi = useNavigate()

  /*const { isLoading, isError, data } = useQuery("user", getUser);
  if(isLoading){
    return<div>로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........로딩중.........</div>
  }
  if(isError){
    return<div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>
  }
 console.log(data)*/
  const CheckUser = async () => {
    try {
      const res = await mutate.mutateAsync("adadad")
      dispatch(isLogin({ username: res.data.data.username, nickname: res.data.data.nickname }))
      //닉네임만 챙겨야한다. 
    }
    catch (error) {
      console.log("afgaagaag")
    }
  }

  useEffect(() => {
    CheckUser()
  }, [])

  function LogOut() {
    removeCookie('wow')
    window.alert("로그아웃 했습니다.")
  }

  return (<>
    <Header>
      <Link to={'/'}>
        <CustomButton size="icon" image="/house.png"></CustomButton>
      </Link>
      {(getCookie('wow') == null) ? (<>
          <div>
      <Link to={'/signup'}>
        <LoginButton >
          <Headertitle textcolor='black' >회원가입하기</Headertitle>
        </LoginButton>
      </Link>
      <Link to={'/login'}>
        <LoginButton >
          <Headertitle textcolor='black' >로그인하기</Headertitle>
        </LoginButton>
      </Link>
          </div>



      </>
      
      
      
      ) : (<>
      <Link to={'/'}>
        <LoginButton onClick={() => LogOut()}>
          <Headertitle textcolor='black'  >로그아웃하기</Headertitle>
        </LoginButton>
      </Link>
      </>) 

      }

    </Header>
  </>)
}

const Header = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
height: 60px;
background-color: white;
border: 9px solid rgb(110, 110, 255, 0.8);
border-radius: 7px;
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
font-size: 15px;
`

const LoginButton = styled.button`
width: 150px;
height: 40px;
border: 3px solid rgb(110, 110, 255, 0.8);
border-radius: 5px;
background-color: white;
`
export default HeadBar