import styled from "styled-components"
import { useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';


function MessageInput({handleSendChat}) {
    const [message, setMessage] = useState("");
    const[showPicker, setShowPicker] = useState(false);


    function handlePicker(){
        setShowPicker(!showPicker);
    }

    function handleEmojiClick(event){
        let msg = message;
        msg += event.emoji;
        setMessage(msg);
    }

    function handleChange(e){
        setMessage(e.target.value);
    }
   async function handleSubmit(e){
        e.preventDefault();
        if(message.length > 0){
            handleSendChat(message);
            setMessage("");
        }
    }

  return (
    <InputContainer>
    <div  className="smile">
        <Smile className="svg" size={35} color ="yellow" onClick={handlePicker}/>      
        {
            showPicker && <EmojiPicker className="emojiPicker" onEmojiClick={handleEmojiClick} theme ="dark"/>         
        }
    </div>
    <form >
        <input type="text" placeholder="enter message" value={message} onChange={handleChange}/>
        <div className="send"> 
            <Send onClick={(e)=>handleSubmit(e)} color="black"/>
        </div>
    </form>
    </InputContainer>
  )
}

const InputContainer = styled.div`
background : #0F0F0F;
height : 4rem;
display : flex;
align-items : center;
padding : 10px;
.smile{
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    width : 5%;
    height : 70%;
    padding : 4px;
    cursor : pointer;
    position : relative;

    .emojiPicker{
    position : absolute;
    top:-470px;
    }
}
   
form{
    display : flex;
    align-items : center;
    padding : 4px;
    gap : 8px;
    height : 70%;
    width : 90%;
    input{
        height : 90%;
        border-radius : 50px;
        width : 90%;
        padding-left : 20px;
        &:focus{
            border : 2px black solid;
        }
    }
    .send{
        background : white;
        border-radius : 50%;
        height : 100%;
        width : 6%;
        display :flex;
        align-items : center;
        justify-content : center;
        cursor : pointer;
        &:hover{
            box-shadow : 3px 3px  grey;
        }
        }
    }
}
`;

MessageInput.propTypes = {
    handleSendChat :PropTypes.func,
}

export default MessageInput;