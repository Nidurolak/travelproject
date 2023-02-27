import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "react-query";
import { randomList } from "../api/Main";
const Main = () => {
  const navigate = useNavigate();
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const { isLoading, data } = useQuery("randomlist", randomList);
  console.log(data);
  // const { isLoading: lodingOn, data: dataOn } = useQuery(
  //   "listFliter",
  //   randomList
  // );

  const [visibleItems, setVisibleItems] = useState(items.slice(0, 8));

  const handleRefresh = () => {
    const newItems = items.slice(0, Math.floor(Math.random() * 8) + 2);
    setVisibleItems(newItems);
  };

  return (
    <Wrapper>
      <Box>
        <Button onClick={() => navigate("/write")}>게시물 작성</Button>
      </Box>
      <ButtonsWrapper>
        <button>토글로 예산 범위 정하기</button>
        <button onClick={handleRefresh}>새로고침</button>
        <button>내가 쓴글 보기</button>
      </ButtonsWrapper>
      <ItemsWrapper>
        <TopItems>
          {visibleItems.slice(0, 4).map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </TopItems>
        <BottomItems>
          {visibleItems.slice(4, 8).map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </BottomItems>
      </ItemsWrapper>
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
  justify-content: space-between; /* 간격 조정 */
  margin-top: 20px;
  width: 35%;
`;

const ItemsWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px auto;
  align-items: stretch;
`;

const TopItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const BottomItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Item = styled.div`
  width: 22%;
  height: 150px;
  border: 1px solid black;
  margin: 10px;
`;

export default Main;
