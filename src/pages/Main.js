import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { RandomList,mytextlist, listfilter } from "../api/Main";
import { getCookie } from "../util/cookie";
import HeadBar from "../components/header/Header";


const Main = () => {
  const items = useQuery('items', RandomList);
  const lists = useQuery('lists', mytextlist);
  const [myItems, setMyItems] = useState([]);
  const [showMyItems, setShowMyItems] = useState(false);
  const token = getCookie("wow");
  const navi = useNavigate()
  

  useEffect(() => {
    if (lists.data) {
      setMyItems(lists.data.data.data);
    }
  }, [lists.data]);

  // const [selectedValue, setSelectedValue] = useState("0");
  const filterItems =  useMutation((selectedValue) => listfilter(selectedValue));

  const handleSelectChange = (e) => {
    const data = {budgetFilter: e.target.value}
    filterItems.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        setMyItems(data.data.data);
        setShowMyItems(true);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };
  
 
  const handleMyItems = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navi("/login")
      return;
      }
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

  return (
    <>
      <HeadBar/>
      <Wrapper>
        <Box>   
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
                <Link to={`/detail/${item.id}`}>
                  <ItemImage imageUrl={item.images} />
                </Link>
              </Item>
            ))
          ) : (
            items.data?.data?.data?.map((item) => (
              <Item key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <ItemImage imageUrl={item.images} >
                  <div>💗:{item.likeCount}</div>
                    </ItemImage>
                </Link>
                <div>{item.title}</div>
                
              </Item>
            ))
          )}
        </ItemsWrapper>
      </Wrapper>
    </>
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
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