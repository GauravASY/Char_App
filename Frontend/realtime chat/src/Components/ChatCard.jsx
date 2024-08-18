import styled from "styled-components";
import PropTypes from 'prop-types';

function ChatCard(props) {
  return (
    <CardContainer className={props.myselected === props.myindex? "selected" : ""} onClick={props.clicked}>
        <img src={`data:image/svg+xml;base64, ${props.image}`}  />
        <h2>{props.username}</h2>
    </CardContainer>
  )
}
const CardContainer = styled.div`
    display : inline-flex;
    gap : 10px;
    height : 4rem;
    padding : 8px;
    align-items : center;
    background :#183D3D;
    border-radius: 20px;
    transition : 1ms ease-in-out;
    &.selected{
        background : #064663;
        
    }
    
    &:hover{
        border : 2px #0B2447 solid;
    }

    img{
        height : 4rem;
        width : 4rem;
    }
    h2{
        color : white;
    }
`;

ChatCard.propTypes = {
    image: PropTypes.string,
    username: PropTypes.string,
    myindex : PropTypes.number,
    myselected : PropTypes.number,
    clicked : PropTypes.func,
  };
export default ChatCard