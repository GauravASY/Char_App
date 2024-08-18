import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';

function MessageArea({currentChat, currentUser, texts, setTexts, scrollRef}) {

  useEffect(()=>{
    if(currentChat !== undefined){
        fetchChat();
    }
  },[currentChat]);

  async function fetchChat(){
    const chatData = await fetch("http://localhost:3000/api/msg/getAllMsg", {
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      }, 
      body : JSON.stringify({
        from : currentUser,
        to : currentChat
      })
    })
    const chatArray = await chatData.json();
    setTexts(chatArray);
  }
  return (
    <TextArea >
        {
          texts.map((msg)=>{
            return (
              <div ref ={scrollRef} key ={uuidv4()} className={`content ${msg.sender === currentUser ? "sent" : "received"}`}>
                <div key ={uuidv4()} className={`msgBlock`}>{msg.text}</div>
              </div>
            )
          })
        }
    </TextArea>
  )
}
const TextArea = styled.div`
    background : #0F0F0F;
    display : flex;
    flex-direction : column;
    flex-grow : 2;
    gap : 10px;
    overflow : auto;
    padding : 15px;
    &::-webkit-scrollbar{
      width : 0.2rem;
      height : 0.4rem;
      &-thumb{
        background-color : grey;
        width : 0.2rem;
      }
    }

    .sent{
      display: flex;
      align-items :center;
      justify-content : flex-end;
    }
    .received{
      display: flex;
      align-items :center;
      justify-content : flex-start;
    }
    
    .msgBlock{
      background : #008170;
      max-width : 40%;
      overflow-wrap : break-word;
      display : flex;
      padding : 8px;
      align-items : center;
      border-radius : 15px;
      color : white;
    }
    
`;

MessageArea.propTypes = {
  currentChat : PropTypes.string,
  currentUser : PropTypes.string,
  texts : PropTypes.array,
  setTexts : PropTypes.func,
  scrollRef : PropTypes.object,
}

export default MessageArea;