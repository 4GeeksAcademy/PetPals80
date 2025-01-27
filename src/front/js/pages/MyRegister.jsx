import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import CatRegister from '../../img/CatRegister.png';
import "../../styles/MyRegister.css"
import AnimalsBackRegister from '../../img/AnimalsRegister.jpg';

export const MyRegister = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

/*Register Required----------------------------------*/

    const [registerFormData, setRegisterFormData] = useState({ username: '', email: '', password: '' });
    const handleRegisterChange = e => setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (actions.register(registerFormData)) navigate('/MyFeed');
    };

    return (
        <div className="auth-wrapper" style={{ backgroundImage: `url(${AnimalsBackRegister})`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundSize: 'cover', }}>
            <div className="auth-container">
                <div className="auth-left">
                    <img src={CatRegister} alt="Register Image" className="register-image" />
                </div>
                    <div className="auth-right">
                        <div className="auth-form">
                            <h2 className='titulo_register'>Registro</h2>
                                <form onSubmit={handleRegisterSubmit} className='form-control form-register'>
                                    <div className="form-group">
                                        <label className='label_register'>Nombre</label>
                                        <input 
                                            type='text'
                                            className='form-control input_register'
                                            onChange={handleRegisterChange}
                                            name='username'
                                            value={registerFormData.username}
                                            placeholder='¿Cómo quieres llamarte?'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='label_register'>Email</label>
                                        <input 
                                            type='text'
                                            className='form-control input_register'
                                            onChange={handleRegisterChange}
                                            name='email'
                                            value={registerFormData.email}
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className='label_register'>Contraseña</label>
                                        <input
                                            type='password'
                                            className='form-control input_register'
                                            onChange={handleRegisterChange}
                                            name='password'
                                            value={registerFormData.password}
                                            placeholder='Contraseña'
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" id="terms" />
                                        <label className='label_register' htmlFor="terms">He leído y acepto la Política de Privacidad</label>
                                    </div>
                                    <div className="Button_register">
                                        <button className='registerButton' type='submit' value="register" disabled={localStorage.getItem('token') ? true : false}>Register</button>
                                    </div>
                                    <div className="link-container">
                                        <div className="login-prompt">
                                            <span className='span_register'>¿Ya eres miembro? </span>
                                            <a href="/MyLogin" className="register-link">Entrar</a>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
            </div>
        </div>
    );
};