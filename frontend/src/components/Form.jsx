import {useState} from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'

function Form({route, method}) {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    {/* if the method is login, text will display Login. Else, display register */}
    const name = method ==="login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault() //will remove default behavior so we dont reload page

        try{
            const res = await api.post(route, {username, password})
            if(method === "login") { //if the user attempted to login, we set their access and refresh tokens
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            }else{ //else if they tried to register, redirect to login page so that we can get their tokens
                navigate("/login")
            }
        }catch(err){
            alert(err)
        }finally{ //whether it works or not, we still want to turn the loading indicator off
            setLoading(false)
        }
    }

    return ( <div>
    <form className = "form-container" onSubmit={handleSubmit}>
        <h1>{name}</h1> 
        <input 
            className="form-input" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username">
        </input>
        <input 
            className="form-input" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password">
        </input>
        <button className='form-button' type='submit'>{name}</button>
    </form>
    {/* prompt the user to go to register page if they dont have an account yet */}
    {method === 'login' && (
        <div className='reg-box'>
            <p className='redirect-register'>Don't have an account? Click here to register!</p>
            <button className='register-button' onClick={() => navigate('/register')}>Register</button>
        </div>
    )}
    </div>
    );
}

export default Form