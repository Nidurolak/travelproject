
import CustomButton from '../Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
function HeadBar(){
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