import React from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { makePost } from "../api/Write";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 




function Write() {
  const [title, setTitle] = useState("")
  const [images, setImages] = useState("")
  const [content, setContent] = useState("")
  const [budget, setBudget] = useState(0)


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
  
  <button onClick={submitPost}>와우! 쿠키 넘기기!</button>
  </>)
}

export default Write;
