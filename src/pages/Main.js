import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { RandomList } from "../api/Main";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mytextlist } from "../api/Main";

const Main = () => {
  // const [myTextList, setMyTextList] = useState(null);
  const items = useQuery('items', RandomList);
  const lists= useQuery('lists', mytextlist);


//   const { data } = useQuery(["lists", token], () =>
//   mytextlist(token)
// );


  // console.log(lists);
  
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
  
  // const handleMyTextList = () => {
  //   if (lists.data) {
  //     setMyTextList(lists.data);
  //   }
  // };
  
  return (

    <Wrapper>
      <Box>
        <Button>게시물 작성</Button>
      </Box>
      <ButtonsWrapper>
        <select>
          <option value="0">--여기서 선택하세요--</option>
          <option value="1">0~10</option>
          <option value="2">10~20</option>
          <option value="3">20~30</option>
          <option value="4">30~40</option>
        </select>
        <button onClick={() => items.refetch()}>새로고침</button>
        <button >내가 쓴글 보기</button>
      </ButtonsWrapper>
      <ItemsWrapper>
        {items.isLoading === false && items?.data?.data?.data?.map((item) => {
          // console.log(item);
          return (
            <Item key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <ItemImage imageUrl={item.images} />
              </Link>
            </Item>
          );
        })}
      </ItemsWrapper>
      {/* {myTextList && ( */}
        <div>
          <h2>내가 쓴 글 목록</h2>
          <ul>
            {/* {myTextList.map((text) => (
              <li key={text.id}>{text.content}</li>
            ))} */}
          </ul>
        </div>
      
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  position: relative;
  width: 80%;
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
  width: 80%;
  margin: 20px auto;
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
`;
export default Main;