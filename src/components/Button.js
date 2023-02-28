import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

function CustomButton(props){
    return(<>
    {/*버튼 스타일드 컴포넌트에 props.bg 전달*/}
    <Button bg={props.bg} size = {props.size} image = {props.image}> {props.children}</Button>
    </>)
}
export default CustomButton;

const Button = styled.button`
${props => {
        let width, height, image, justfy;
        switch (props.size) {
            case 'big':
                width = '1300px';
                height = '200px';
                justfy = 'space-between'
                break;
            case 'middle':
                width = '200px';
                height = '200px';
                justfy = 'center'
                break;
            case 'small':
                width = '150px';
                height = '60px';
                justfy = 'center'
                break;

            case 'icon':
                width = '50px';
                height = '50px';
                image = `url(${props.image})`;
                break;

            default:
                width = '150px';
                height = '150px';
                break;
        }
        return css`
    width: ${width};
    height: ${height};
    background-image: ${image};
    background-size: cover;
    justify-content: ${justfy};
  `}}`