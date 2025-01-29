import React, { useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import DogLogin from '../../img/DogLogin.png'
import { Context } from "../store/appContext";
import '../../styles/MyLogin.css'
import AnimalsBackRegister from '../../img/AnimalsRegister.jpg';

export const MyLogin = () => {

 const { store, actions } = useContext(Context);
    const navigate = useNavigate();

/*Login Required----------------------------------*/
    
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
   
    const handleLoginChange = e => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
   
    const handleLoginSubmit = async (e) => { 
        e.preventDefault();
        
        const success = await actions.login(loginFormData);
        if (success) {
            navigate("/MyFeed");
        } else {
            alert("Credenciales Incorrectos, inténtelo de nuevo");
        }
    };

    return (
            <div className="auth-wrapper-login"  style={{ backgroundImage: `url(${AnimalsBackRegister})`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundSize: 'cover', }}>
                <div className="auth-container-login">
                    <div className="auth-left-login">
                        <form onSubmit={handleLoginSubmit} className='form-login'>
                            <h2 className="titulo-login">Iniciar Sesión</h2>
                            <div className="form-group">
                                <label className='label-login'>Email</label>
                                <input
                                className='form-control input_login'
                                type="email"
                                placeholder="Email"
                                onChange={handleLoginChange}
                                name='email'
                                value={loginFormData.email} />
                            </div>
    
                            <div className="form-group">
                                <label className='label-login'>Password</label>
                                <input
                                className='form-control input_login'
                                type="password"
                                placeholder="Contraseña"
                                onChange={handleLoginChange}
                                name="password"
                                value={loginFormData.password} />
                            </div>
    
                            <div className="but-log">
                                <button type="submit" className="button-login">Entrar</button>
                            </div>
    
                            <div className="link-container">
                                <a href="#" className="forgot-password">¿Olvidaste contraseña?</a>
                                <div className="register-prompt">
                                    <span>¿Nuevo por aquí? </span>
                                    <a href="/MyRegister" className="register-link">Regístrate</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="auth-right-login">
                        <img src={DogLogin} className="Dog-Login" alt="Perro Inicio Sesión" />
                    </div>
                </div>
            </div>
    
    );
};