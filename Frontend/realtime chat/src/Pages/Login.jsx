import styled from "styled-components";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../Utils/ToastOptions";
import { useNavigate } from "react-router";
import icon from "../assets/react.svg"

function Login() {
  const [loginCredentials, setloginCredentials] = useState({username : "", password : ""});
  const navigate = useNavigate();

  async function handlesubmit(e){
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/login", {
      method :"POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : loginCredentials.username,
        password : loginCredentials.password
      })
    });
    const result = await data.json();
    if(result.status === false){
      toast.error(result.msg, toastOptions);
    }
    else{
        localStorage.setItem("chat-app-user", JSON.stringify(result.user));
        if(result.user.isAvatarSet){
          navigate("/");
        }else{
          navigate("/setAvatar");
        }
        
    }
  }

  function handleChange(e){
      setloginCredentials({...loginCredentials, [e.target.name] : e.target.value});
  }
  return (
    <div>
      <FormContainer>
        <form onSubmit={handlesubmit} className="form">
          <div className="brand">
            <h1>Guftagu</h1>
            <img src={icon} alt="logo" />
          </div>
          <input type="text" placeholder= "enter username" name= "username" onChange={handleChange}/>
          <input type="password" placeholder= "enter password" name="password" onChange={handleChange}/>
          <button type="submit">Login</button>
        </form>
      </FormContainer>
      <ToastContainer/>
    </div>
  )
}


const FormContainer = styled.div`
display : flex;
flex-direction : column;
background : #0B2447;
align-items : center;
padding : 0;
margin : 0;
justify-content : center;
height : 100vh;
width : 100vw;
.form{
    background :#FFF9D0;
    display : flex;
    flex-direction : column;
    padding: 10px;
    box-shadow : 10px 10px black;
    justify-content : center;
    align-items : center;
    border : 2px solid black;
    width : 30%;
    border-radius : 20px;
    gap : 20px;
    }
    .brand{
        display: flex;
        gap : 5px;
        padding:5px;
        height : 70px;
        justify-content : center;
        align-items: center;
        h1{
          font-family: "Zeyada", cursive;
          font-weight: 600;
          font-style: normal;
        }
        img{
            height : 3rem;
            widht : 3rem;
        }
    }
    input{
        width: 70%;
        border-radius : 5px;
        padding : 10px;
        background : #FFEC9E;
        color : black;
        &:focus{
            border : 3px red solid;
            box-shadow : 3px 3px black;
        }
    }
    button {
        background :#0B2447;
        height : 2.5rem;
        width : 50%;
        color : white;
        padding : 10px;
        border-radius : 10px;
        &:hover{
            cursor : pointer;
            background : #76ABAE;
            color : white;
        }
    }
  `; 
export default Login;