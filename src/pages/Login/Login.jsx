import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import './Login.scss'
import image from '../../assets/images/undraw_access_account_re_8spm 1.svg'

function Login() {
    const navigate = useNavigate();
    const [errAlert, setErrAlert] = useState(false)
    const [loginData, setLoginData] = useState(
        {
            email: '',
            password: ''
        }
    )
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData((prev) => {
            return{...prev, [name]: value}
        })
    }

    const loginHandler = async () => {

        if(loginData.password && loginData.email){
            const {data} = await axios.get('http://localhost:3002/users');
            const user = data.find(u => u.email === loginData.email)
            if(user){
                if(user.password === loginData.password){
                    navigate('/home')
                }
            }
        }else(
                setErrAlert(true)
        )
    }
  return (
    <div className='login'>
        <div className="login__back">
            <h1>Welcome Back!</h1>
            <img src={image} alt="" />
        </div>
        <div className="login__input">
            <div>
                <label htmlFor="">Email</label>
                <input onChange={inputHandler} type="email" name='email' placeholder='user@gmail.com' /></div>
            <div> 
                <label htmlFor="">Password</label>
                <input onChange={inputHandler} type="password" name='password' placeholder='Password' /></div>
            {errAlert && 
            <p className='error'>Something wrong, please try again!</p>}
        </div>
        <div className="login__bottom">
            <button onClick={loginHandler}>Login</button>
            <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span></p>
        </div>
    </div>
  )
}

export default Login