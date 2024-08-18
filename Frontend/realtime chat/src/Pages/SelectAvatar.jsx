import styled from "styled-components";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../Utils/ToastOptions";
import { Buffer } from "buffer";
import { useNavigate } from "react-router";

function SelectAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const [AvatarList, setAvatarList] = useState([]);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const navigate = useNavigate();

  async function fetchAvatar() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
      const result = await image.arrayBuffer();
      const buffer = new Buffer(result);
      data.push(buffer.toString("base64"));
    }
    setAvatarList(data);
  }

  async function setProfilePicture() {
    if (selectedAvatar === undefined) 
        {
            toast.error("Please Select an Avatar", toastOptions);
        } 
    else 
        {
            const loggeduserData = await JSON.parse(localStorage.getItem("chat-app-user"));
            if (Object.keys(loggeduserData).length === 0) {
                toast.error("Login in first", toastOptions);
                setTimeout(()=> navigate("/login", 3000));
            } 
            else {
                let user = await fetch(`http://localhost:3000/api/selectAvatar/${loggeduserData._id}`,{
                 method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                avatar: AvatarList[selectedAvatar],
                }),
                });
                const result = await user.json();
                if (!result.isAvatarSet) {
                    toast.error("Error setting profile picture. Try Again", toastOptions);
                } 
                else 
                {
                    toast.success("Profile Picture set", toastOptions);
                    localStorage.setItem("chat-app-user", JSON.stringify(result));
                    setTimeout(()=> navigate("/"), 2000);
                }
            }
        }
    }

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <div className="p-0 m-0">
      <AvatarContainer>
        <div className="title-container">
          <h1>Select your profile picture</h1>
        </div>
        <div className="avatars">
          {AvatarList.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64, ${avatar}`}
                  alt="avatar blob"
                  onClick={() => {
                    setselectedAvatar(index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture}>Select Avatar</button>
      </AvatarContainer>
      <ToastContainer />
    </div>
  );
}

const AvatarContainer = styled.div`
height : 100vh;
width : 100vw;
display : flex;
flex-direction : column;
background : #35374B;
justify-content : center;
align-items : center;
gap : 3rem;
.title-container {
    color : white;
    display : flex;
    justify-content : center;
    align-items : center;
}
.avatars{
    display : flex;
    gap : 3rem;
    height : 8rem;
    align-items: center;
    justify-content : center;
    .avatar{
        display : flex;
        justify-content : center;
        align-items : center;
        border-radius : 50%;
        
    }
    .selected{
        border : 8px solid #4CCD99;
        transition : 0.5s ease-in-out;
    }
    img{
        height : 6rem;
        width : 6rem;
        &:hover{
            height : 8rem;
            width : 8rem;
            transition : 0.5s ease-in-out;
        }
    }
}
button{
    background :#0B2447;
    height : 2.5rem;
    width : 30%;
    color : white;
    padding : 10px;
    border-radius : 10px;
    &:hover{
        cursor : pointer;
        background : #76ABAE;
        color : white;
}
`;
export default SelectAvatar;
