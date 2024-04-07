import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

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
            }else(

                    setErrAlert(true)
            )
        }
    }
  return (
    <div className='login'>
        <div className="login__back">

        </div>
        <div className="login__input">
            <div><input onChange={inputHandler} type="text" name='email' /></div>
            <div> <input onChange={inputHandler} type="password" name='password' /></div>
            {errAlert && 
            <p>Error</p>}
        </div>
        <div className="login__bottom">
            <button onClick={loginHandler}>Login</button>
            <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span></p>
        </div>
    </div>
  )
}

export default Login