import React, { useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import DogLogin from '../../img/DogLogin.png'
import { Context } from "../store/appContext";
import '../../styles/MyLogin.css'

export const MyLogin = () => {

 const { store, actions } = useContext(Context);
    const navigate = useNavigate();

/*Login Required----------------------------------*/
    
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const handleLoginChange = e => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    const handleLoginSubmit = e => {
        e.preventDefault();
        if (actions.login(loginFormData)) navigate('/MyFeed');
    };

    return (
        <div className="auth-wrapper-login">
            <div className="auth-container-login">
                <div className="auth-left-login">
                    <div className="auth-form">
                        <h2 className="titulo-login">Sign In</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <label className='label-login'>Email</label>
                                <input
                                className='form-control input_login'
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleLoginChange}
                                name='email'
                                value={loginFormData.email} />
                                </div>
                            <div className="form-group">
                                <label className='label-login'>Password</label>
                                <input
                                className='form-control input_login'
                                type="password"
                                placeholder="Enter your password"
                                onChange={handleLoginChange}
                                name="password"
                                value={loginFormData.password}/>
                            </div>
                            <div className="but-log">
                                <button type="submit" className="button-login">Sign In</button>
                            </div>
                            <div className="link-container">
                                <a href="#" className="forgot-password">Forgot password?</a>
                                    <div className="register-prompt">
                                     <span>New here? </span>
                                    <a href="/register" className="register-link">Register Now</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="auth-right-login">
                    <img src={DogLogin} alt="Login Image" className="login-image" /> 
                </div>
            </div>
        </div>
    );
};