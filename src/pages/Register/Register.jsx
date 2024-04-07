import { useState } from "react"
import axios from "axios"
import './Register.scss'
import {useNavigate} from "react-router-dom"


function Register() {
    const navigate = useNavigate()
    const [errorModal, setErrorModal] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: ''
    })
    
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser((prev) => {
            return{...prev, [name]: value}
        })
    }

    const submitHandler = async () => {
        if(user.name && user.email && user.password === user.rePassword){
            const response =  await axios.post('http://localhost:3002/users', user);
            setErrorModal(false)
            navigate('/home')
        }else{
            setErrorModal(true)
        }


        
    }

    console.log(user);

  return (
    <div className="register">
        {errorModal && 
        <div className="register__errorModal">
                <h1>Error</h1>
        </div>}
        <div className="reigster__topTitle">
            <h1>Welcome Onboard</h1>
            <p>Lets help you in comleting your tasks</p>
        </div>
        <div className="register__input">
            <div>
                <label htmlFor="">Full Name</label>
                <input onChange={inputHandler} name="name" type="text" placeholder="Shokhruz" />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input onChange={inputHandler} name="email" type="text" placeholder="sh7@gmail.com" />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input onChange={inputHandler} name="password" type="password" placeholder="Password" />
            </div>
            <div>
                <label htmlFor="">Confirm Password</label>
                <input onChange={inputHandler} name="rePassword" type="password" placeholder="Re-password" />
            </div>
            <div className="register__bottom">
                <button onClick={submitHandler} className="submit">Register</button>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span></p>
            </div>
        </div>
    </div>
  )
}

export default Register