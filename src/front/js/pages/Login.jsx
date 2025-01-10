import React from "react";
import "../../styles/auth.css";
import "../../styles/login.css";
import loginImage from "../../img/login-image.png"; 

export const Login = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-form">
                        <h2>Sign In</h2>
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" />
                            </div>
                            <button type="submit" className="auth-button">Sign In</button>
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
                <div className="auth-right">
                   <img src={loginImage} alt="Login Image" className="login-image" /> 
                </div>
            </div>
        </div>
    );
};
