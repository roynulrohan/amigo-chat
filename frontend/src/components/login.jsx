import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { setInStorage, getFromStorage } from '../utils/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';
import axios from 'axios';
import '../sass/components/_login.scss';
import loadingSVG from '../assets/loading_spin.svg';
import doneIcon from '../assets/checked.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const formSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        // Post request to backend

        axios({
            method: 'post',
            url: isRegistering
                ? 'http://localhost:4000/user/register'
                : 'http://localhost:4000/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => {
            if (res.data.success) {
                // write token to storage
                setInStorage('amigo-chat_roynulrohan', {
                    token: res.data.token,
                });
                setLoading(false);
                // dispatch user to redux and redirect
                dispatch(setUser(res.data.user));
                setTimeout(() => {
                    history.push('/');
                }, 1700);
            } else {
                setErrorMessage(res.data.message);
            }
            setLoading(false);
        });
    };

    const formContainer = () => {
        return (
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
        );
    };

    const loadingContainer = () => {
        return (
            <div className='form d-flex flex-column justify-content-center align-items-center'>
                <img className='loading-img' src={loadingSVG}></img>
            </div>
        );
    };

    const successContainer = () => {
        return (
            <div className='form d-flex flex-column justify-content-center align-items-center'>
                <img className='success-img' src={doneIcon}></img>
            </div>
        );
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
                
                {loading
                    ? loadingContainer()
                    : user.currentUser
                    ? successContainer()
                    : formContainer()}
            </div>
        </CSSTransition>
    );
};

export default Login;
