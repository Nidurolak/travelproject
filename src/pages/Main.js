import React, { useEffect, useState } from "react";
import styled from "styled-components";
<<<<<<< HEAD
import { useQuery } from "react-query";
import { RandomList } from "../api/Main";
import { Link, useNavigate } from "react-router-dom";
import { mytextlist } from "../api/Main";
import { getCookie } from "../util/cookie";
import HeadBar from "../components/header/Header";
=======
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { RandomList,mytextlist, listfilter } from "../api/Main";
import { getCookie } from "../util/cookie";
import HeadBar from "../components/header/Header";

>>>>>>> CSS작업본

const Main = () => {
  const items = useQuery('items', RandomList);
  const lists = useQuery('lists', mytextlist);
  const [myItems, setMyItems] = useState([]);
  const [showMyItems, setShowMyItems] = useState(false);
  const token = getCookie("wow");
  const navi = useNavigate()
<<<<<<< HEAD
=======
  const imageUrl="https://www.gousa.or.kr/sites/default/files/styles/hero_l/public/2016-10/San%20Diego%2C%20California%20road.jpg?itok=5fqyXPma";
  
>>>>>>> CSS작업본

  useEffect(() => {
    if (lists.data) {
      setMyItems(lists.data.data.data);
    }
  }, [lists.data]);

  // const [selectedValue, setSelectedValue] = useState("0");
  const filterItems = useMutation((selectedValue) => listfilter(selectedValue), {
    mutationFn: (data) => {
      return listfilter(data, { method: "POST" });
    },
  });

  const handleSelectChange = (e) => {
    const budgetFilter = e.target.value;
    // console.log(budgetFilter);
    if (showMyItems) {
      const data = { budgetFilter };
      filterItems.mutate(data, {
        onSuccess: (data) => {
          console.log(data);
          setMyItems(data.data.data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } else {
      const data = { budgetFilter };
      items.refetch({ data });
    }
  };
  
 
  const handleMyItems = () => {
    if (!token) {
<<<<<<< HEAD
    alert("로그인이 필요합니다.");
    navi("/login")
  }
=======
      alert("로그인이 필요합니다.");
      navi("/login")
      return;
      }
>>>>>>> CSS작업본
    setShowMyItems(true);
    lists.refetch();
  };

  // console.log(myItems);

  if (items.isLoading || lists.isLoading) {
    return (
      <div>
        로딩중...
      </div>
    );
  } else if (items.isError || lists.isError) {
    return (
      <div>
        에러가 발생했습니다.
      </div>
    );
  }

<<<<<<< HEAD
  const changeHandler = (event) => {
    console.log("adada")
    console.log(event.value)
  }
  return (<>
    <HeadBar></HeadBar>
    <Wrapper>
      <Box>
      <Link to="/write">
  <Button>게시물 작성</Button>
  </Link>
      </Box>
      <ButtonsWrapper>
        <select onChange={() => changeHandler()}>
          <option value="0">--여기서 선택하세요--</option>
          <option value="1">0~10</option>
          <option value="2">10~20</option>
          <option value="3">20~30</option>
          <option value="4">30~40</option>
        </select>
        <button onClick={() => items.refetch()}>새로고침</button>
        <button onClick={handleMyItems}>내가 쓴글 보기</button>
      </ButtonsWrapper>
      <ItemsWrapper>
        {showMyItems && myItems.length > 0 ? (
          myItems.map((item) => (
            <Item key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <ItemImage imageUrl={item.images} />
              </Link>
            </Item>
          ))
        ) : (
          items.data?.data?.data?.map((item) => (
            <Item key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <ItemImage imageUrl={item.images} />
              </Link>
            </Item>
          ))
        )}
      </ItemsWrapper>
    </Wrapper>
  </>
=======
  return (
    <>
      <HeadBar/>
      <Wrapper>
        <Box>
          <img src={imageUrl} alt=""/>
          <Link to="/write">
            <Button>게시물 작성</Button>
          </Link>
        </Box>
        <ButtonsWrapper>
          <select onChange={handleSelectChange}>
            <option value="0">--여기서 선택하세요--</option>
            <option value="1">0~10</option>
            <option value="2">10~20</option>
            <option value="3">20~30</option>
            <option value="4">30~40</option>
          </select>
          <button onClick={() => items.refetch()}>새로고침</button>
          <button onClick={handleMyItems}>내가 쓴글 보기</button>
        </ButtonsWrapper>
        <ItemsWrapper>
          {showMyItems && myItems.length > 0 ? (
            myItems.map((item) => (
              <Item key={item.id}>
                <Link to={`/detail/${item.id}`} style={{ textDecoration: "none" }} >
                  <ItemImage imageUrl={item.images} >
                  <div>💗:{item.likeCount}</div>
                    </ItemImage>
                    <div>{item.title}</div>
                </Link>
              </Item>
            ))
          ) : (
            items.data?.data?.data?.map((item) => (
             <Item key={item.id}>
                <Link to={`/detail/${item.id}`} style={{ textDecoration: "none" }} >
                  <ItemImage imageUrl={item.images} >
                  <div>💗:{item.likeCount}</div>
                    </ItemImage>
                    <div>{item.title}</div>
                </Link>
              </Item>
            ))
          )}
        </ItemsWrapper>
      </Wrapper>
    </>
>>>>>>> CSS작업본
  );
            };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  position: relative;
  width: 90%;
  height: 200px;
  margin: 0 auto;
  margin-top: 80px;
  border: 1px solid black;
  display: inline-block;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
`;

const Button = styled.button`
position: absolute;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 35%;
`;

const ItemsWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 20px auto;
  padding: 50px;
`;

const Item = styled.div`
  width: 22%;
  height: 150px;
  border: 1px solid black;
  margin: 10px;
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export default Main;