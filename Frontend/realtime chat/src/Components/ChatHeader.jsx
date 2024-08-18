import styled from "styled-components";
import { useNavigate } from "react-router";
import { LogOut } from 'lucide-react';
import PropTypes from 'prop-types';

 function ChatHeader(props) {
    const navigate = useNavigate();

    function handleClick(){
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Container>
        <div className="Image">
            <img src={`data:image/svg+xml;base64, ${props.image}`}/>
            <h3>{props.username}</h3>
        </div>
        <div className="button" onClick={handleClick}>
            <LogOut className="logout" />
        </div>
    </Container>
  )
}
const Container = styled.div`
display : flex;
background : #0F0F0F;
align-items : center;
justify-content : space-between;
color : white;
padding : 10px;
.Image{
    display :flex;
    align-items : center;
    justify-content : center;
    gap : 15px;

    img{
        height : 4rem;
        width : 4rem; 
    }
    h3{
        font-size : 20px;
    }
}
.button{
    display : flex;
    align-items: center;
    justify-content : center;  
    cursor : pointer; 
    transition : all 1ms ease-in-out;
    .logout{
        height : 2rem;
        width : 2rem;
        
        &:hover{
            height : 2.3rem;
            width : 2.3rem;
            color : red;
        }
    } 
}
`;

ChatHeader.propTypes = {
    image : PropTypes.string,
    username : PropTypes.string,
}

export default ChatHeader;