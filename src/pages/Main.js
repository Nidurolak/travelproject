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
  const imageUrl="https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  

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
    alert("로그인이 필요합니다.");
    navi("/login")
  }
    setShowMyItems(true);
    lists.refetch();
  };

  // console.log(myItems);

  const handleWriteClick = () => {
    if (token==null) {
      alert("로그인이 필요합니다.");
      navi("/login");
    } else {
      navi("/write");
    }
  };

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
          <img src={imageUrl} alt=""/>
          <Button onClick={handleWriteClick}>게시물 작성</Button>
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
                    <ItemText>{item.title}</ItemText>
                </Link>
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
  display: inline-block;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  border: 1px solid rgb(110, 100, 255);
  
  
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  select {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    color: #555;

    option {
      font-size: 16px;
      color: #555;
    }
  }

  button {
    margin-right: 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: rgb(110, 100, 255);
    font-size: 16px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
`;

const ItemsWrapper = styled.div`
border-radius: 20px;
  border: 10px solid skyblue;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 20px auto;
  padding: 50px;
`;

const Item = styled.div`

  width: 22%;
  height: 150px;
  border: 10px solid rgb(110, 100, 255);
  margin-top: 20px;
  margin-right: 10px;
  margin-left:3px;
  border-radius: 10px;

`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ItemText = styled.div`
text-align: center;
background-color: white;
width:250px;
border:3px solid skyblue;
border-radius: 5px;
`

export default Main;