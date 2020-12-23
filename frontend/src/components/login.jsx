import React, { useState, useEffect } from 'react';
import '../sass/components/_login.scss';
import { CSSTransition } from 'react-transition-group';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const formSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames='fade'
            unmountOnExit>
            <div className='login'>
                <div class='background'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <form className='form rounded p-4' onSubmit={formSubmit}>
                    <div className='d-flex flex-column'>
                        <h2 className='title mb-3 unselectable'>Amigo</h2>
                        <div class='form-group mb-3'>
                            <label for='usernameInput' className='mb-2'>
                                Username
                            </label>
                            <input
                                type='name'
                                class='form-control'
                                id='usernameInput'
                                placeholder='Enter username'
                                value={username}
                                onChange={(ev) => {
                                    setUsername(ev.target.value);
                                }}
                            />
                        </div>
                        <div class='form-group'>
                            <label for='passwordInput' className='mb-2'>
                                Password
                            </label>
                            <input
                                type='password'
                                class='form-control'
                                id='passwordInput'
                                placeholder='Enter password'
                                value={password}
                                onChange={(ev) => {
                                    setPassword(ev.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className='d-flex flex-column unselectable'>
                        <small className='mb-5 mx-1 text-danger'>
                            {errorMessage}
                        </small>
                        <p className='mb-4 mx-1'>
                            {isRegistering
                                ? 'Already have an account?'
                                : "Don't have an account?"}{' '}
                            <a
                                onClick={() => {
                                    setIsRegistering(!isRegistering);
                                }}>
                                {isRegistering ? 'Login' : 'Register'}
                            </a>
                        </p>
                        <button type='submit' class='btn'>
                            {isRegistering ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </CSSTransition>
    );
};

export default Login;
