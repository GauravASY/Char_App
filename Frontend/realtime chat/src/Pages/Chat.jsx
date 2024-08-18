import styled from "styled-components";
import ChatCard from "../Components/ChatCard";
import { useState, useEffect, useRef } from "react";
import icon from "../assets/react.svg"
import ChatHeader from "../Components/ChatHeader";
import MessageArea from "../Components/MessageArea";
import MessageInput from "../Components/MessageInput";
import { useNavigate } from "react-router";
import {io} from 'socket.io-client';

function Chat() {
  const socket = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [selected, setSelected] = useState(undefined);
  const[currentChatImage, setCurrentChatImage] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [texts, setTexts] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  

  useEffect(()=>{
    fetchCurrentUser();
  },[])


  useEffect(()=>{
    if(currentUserId){
      socket.current = io("http://localhost:3000", {
        withCredentials : true
      }) 
      socket.current.emit("add-user", {
        id : currentUserId,
        name : currentUserName
      });
      fetchUserData();
    }
  },[currentUserId])

 
  useEffect(() => {
    if (selected !== undefined) {
      const user = usersData[selected];
      setCurrentChatImage(user.avatar);
      setCurrentChatName(user.username);
    }
  }, [selected, usersData]);

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-received", (msg)=>{
        console.log(msg);
        setArrivalMsg({sender : "none", text : msg});
      })
      return () => {
        socket.current.off("msg-received");
      };
    }
  },[socket.current])

  useEffect(()=>{
    arrivalMsg && setTexts((prev)=> [...prev, arrivalMsg]);
  },[arrivalMsg])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour : "smooth"});
  }, [texts]);
  
  async function fetchCurrentUser(){
    const loggedData = await JSON.parse(localStorage.getItem("chat-app-user"));
    if(!loggedData){
      navigate("/login");
    }
    else{
    setCurrentUserName(loggedData.username);
    setCurrentUserAvatar(loggedData.avatar);
    setCurrentUserId(loggedData._id);
    }
  }

  async function fetchUserData() {
    const response = await fetch(`http://localhost:3000/api/allUser/${currentUserId}`, {
      method : 'GET',
      headers: {
        "Content-Type": "application/json",
    },
    });
    const UserList = await response.json();
    setUsersData(UserList);
  }

  async function handleSendChat(msg){
    let response = await fetch("http://localhost:3000/api/msg/putMsg", {
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          text : msg,
          users : [currentUserId, usersData[selected]._id],
          sender : currentUserId,
      })
  })
    response = await response.json();
    socket.current.emit("send-msg", {
      from : currentUserId,
      to : usersData[selected]._id,
      msg : msg
  });
    const msgs = [...texts];
    msgs.push({sender : currentUserId, text : msg});
    setTexts(msgs);

    console.log(response);
  }

  return (
    <div>
      <ChatContainer>
        <div className="left_column">
          <div className="Brand">
            <img src={icon} alt="" />
            <h1>Guftagu</h1>
          </div>
          <div className="All_contacts">
            {
            usersData.map((user, index) => {
              return (
              <ChatCard 
                key={user._id}
                myindex = {index}
                myselected = {selected}
                image = {user.avatar}
                username= {user.username}
                clicked = {()=> {
                  setSelected(index);
                }}
              />
              )
            })}
          </div>
          <div className="current">
            <img src={`data:image/svg+xml;base64, ${currentUserAvatar}`} alt="profile pic" />
            <h2>{currentUserName}</h2>
          </div>
        </div>
        <div className="right_column">
          {
            selected !== undefined ? 
            
               (
                <div className="main">
                  <ChatHeader image={currentChatImage} username={currentChatName}/>
                  <MessageArea className="textArea" currentChat={usersData[selected]._id} currentUser={currentUserId} socket={socket} texts={texts} setTexts={setTexts} scrollRef={scrollRef}/>
                  <MessageInput  handleSendChat={handleSendChat}/>
                </div>
              )
               :
               (
                <h1>Welcome to the chat!</h1>
              )
          }   
        </div>
      </ChatContainer>
    </div>
  );
}

const ChatContainer = styled.div`
    background : darkgrey;
    height : 100vh;
    width : 100vw;
    display : flex;

    .left_column{
      width : 25%;
      display : flex;
      flex-direction : column;
      justify-content: space-between;
      background : #0F0F0F;

      .Brand{
        background : #005B41;
        display: flex;
        justify-content : center;
        align-items :center;
        color : white;
        text-transform : uppercase;
        padding : 8px;
        gap : 16px;
        img{
          height : 4rem;
          width: 4rem;
          padding : 2px;
          object-fit: fill;
        }
        h1{
          font-family: "Zeyada", cursive;
          font-weight: 600;
          font-style: normal;
          
        }
      }

      .All_contacts{
        display :flex;
        flex-direction : column;
        flex-grow : 5;
        gap : 5px;
        margin : 5px;
        overflow-y : auto;
        background :#0F0F0F;
        &::-webkit-scrollbar{
          width : 0.2rem;
          height : 0.4rem;
          &-thumb{
            background-color : grey;
            width : 0.2rem;
          }
        }
      }

      .current{
        display : flex;
        gap : 16px;
        justify-content : center;
        align-items : center;
        background :  #005B41;
        color : white;
        padding :8px;
        img{
          height : 4rem;
          width : 4rem;

        }
      }

    }
    .right_column{
        width : 75%;
        .main{
          display : flex;
          flex-direction : column;
          justify-content : space-between;
          height : 100%;
        }
       
    }

`;

export default Chat;
