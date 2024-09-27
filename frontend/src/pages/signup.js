import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleSuccess,handleError } from '../utils'

const Signup = () => {
  const [signupInfo,setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    const copyLoginInfo = {...signupInfo};
    copyLoginInfo[name]=value;
    setSignupInfo(copyLoginInfo);
  };
  console.log("logininfo->",signupInfo);
  const handleSignup = async(e)=>{
    e.preventDefault();
    const {name,email,password} = signupInfo;
    if(!name||!email||!password){
      return handleError('name,email, password is required');
    }
    try{
      const url = "http://localhost:5000/auth/signup"
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(signupInfo)

      })
      const result = await response.json();
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')

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
        <h1>SignUp</h1>
        <form onSubmit = {handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input onChange = {handleChange} type = "text" name = "name" autoFocus placeholder='Enter your name here...' value = {signupInfo.name}/>
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange = {handleChange} type = "email" name = "email" placeholder='Enter your email here...' value = {signupInfo.email}/>
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input onChange = {handleChange} type = "password" name = "password" placeholder='Enter your password here...' value={signupInfo.password}/>
            </div>
            <button>Signup</button><br></br>
            <span>Already have an account?
              <Link to = "/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Signup
