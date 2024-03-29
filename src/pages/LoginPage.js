import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    let {loginUser,user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(user){
            navigate('/home');  
        }
    }, [])
    
    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage
