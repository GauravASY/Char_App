
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../Utils/ToastOptions';


function Register() {
    const [credentials, setCredentials] = useState({username : "", email : "", password : "", confirmPassword : ""});

   async function handlesubmit(e){
        e.preventDefault();
        if(credentials.password !== credentials.confirmPassword){
            toast.error("Passwords don't match. Re-enter", toastOptions);
        }
        else{
        const data = await fetch("http://localhost:3000/api/newUser", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : credentials.username,
                password : credentials.password,
                email : credentials.email,
            })
        });
        const result = await data.json();
        if(result.status === false){
            toast.error(result.msg, toastOptions);
        }
        else{
            toast.success("User Registered", toastOptions);
        }
    }
    }
    function handlechange(e){
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
  return (
    <div>
        <FormContainer>
            <form onSubmit={handlesubmit} className='form'>
                <div className="brand">
                    <h1>Guftagu</h1>
                    <img src="" alt="logo" />
                </div>
                <input type="text" placeholder='enter username' name='username' onChange={handlechange} />
                <input type="email" placeholder='enter email' name='email' onChange={handlechange} />
                <input type="password" placeholder='enter password' name='password' onChange={handlechange} />
                <input type="password" placeholder='confirm password' name='confirmPassword' onChange={handlechange} />
                <button type='submit'>Create User</button>
                <span>Already have an Acoount? <NavLink to="/login">Login</NavLink></span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </div>
  );
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
            justify-content : center;
            align-items: center;
            img{
                height : 5rem;
                widht : 5rem;
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

export default Register