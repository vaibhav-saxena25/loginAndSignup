import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleSuccess,handleError } from '../utils'

const Login = () => {
  const [loginInfo,setLoginInfo]=useState({
   
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name]=value;
    setLoginInfo(copyLoginInfo);
  };
 
  const handleLogin = async(e)=>{
    e.preventDefault();
    const {email,password} = loginInfo;
    if(!email||!password){
      return handleError('email, password is required');
    }
    try{
      const url = "http://localhost:5000/auth/login"
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(loginInfo)

      })
      const result = await response.json();
      const {success,message,jwtToken,name,error} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/home')

        },1000)
      }else if(error){
        const details = error.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    }catch(err){
      handleError(err);
    }
  }
  
 
  return (
    <div>
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit = {handleLogin}>
            
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange = {handleChange} type = "email" name = "email" placeholder='Enter your email here...' value = {loginInfo.email}/>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input onChange = {handleChange} type = "password" name = "password" placeholder='Enter your password here...' value={loginInfo.password}/>
            </div>
            <button>Log In</button><br></br>
            <span>Don't have an account?
              <Link to = "/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Login
