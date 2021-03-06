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

interface RootState {
    userReducer: User;
}

interface User {
    currentUser: CurrentUser;
}

interface CurrentUser {
    Username: string;
    PhotoURL: string;
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (isRegistering) {
            document.title = 'Amigo | Register';
        } else {
            document.title = 'Amigo | Login';
        }
    }, [isRegistering]);

    const validUsername = () => {
        if (username.length >= 6 && username.length <= 14) {
            return <small className='text-success'>6-14 characters</small>;
        } else {
            return <small className='text-danger'>6-14 characters</small>;
        }
    };

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        // Post request to backend

        axios({
            method: 'post',
            url: isRegistering ? '/user/register' : '/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: username,
                password: password,
            }),
            timeout: 10000,
        })
            .then((res) => {
                if (res.data.success) {
                    setTimeout(() => {
                        // write token to storage
                        setInStorage('amigo-chat_roynulrohan', {
                            token: res.data.token,
                        });

                        // dispatch user to redux and redirect
                        dispatch(setUser(res.data.user));
                        setLoading(false);

                        setTimeout(() => {
                            history.push('/');
                        }, 1250);
                    }, 1000);
                } else {
                    setErrorMessage(res.data.message);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setErrorMessage(err.toString());
                setLoading(false);
            });
    };

    const formContainer = () => {
        return (
            <form className='form rounded p-4' onSubmit={formSubmit}>
                <div className='d-flex flex-column'>
                    <h2 className='app-title mb-3 unselectable'>Amigo</h2>
                    <div className='form-group mb-3'>
                        <label htmlFor='usernameInput' className='mb-2 d-flex justify-content-between align-items-center'>
                            Username
                            {isRegistering && validUsername()}
                        </label>
                        <input
                            type='name'
                            className='form-control'
                            id='usernameInput'
                            placeholder='Enter username'
                            value={username}
                            onChange={(ev) => {
                                setUsername(ev.target.value);
                            }}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='passwordInput' className='mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='form-control'
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
                    <small className='mb-5 mx-1 text-danger'>{errorMessage}</small>
                    <p className='mb-4 mx-1'>
                        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <a
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                            }}
                        >
                            {isRegistering ? 'Login' : 'Register'}
                        </a>
                    </p>
                    <button type='submit' className='btn'>
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
            <div className='form d-flex flex-column justify-content-center align-items-center text-center'>
                <div className='app-font mb-5'>
                    <h5>Logged in as</h5>
                    <h2 className='app-title mt-3'>{user.currentUser.Username}</h2>
                </div>
                <img className='success-img' src={doneIcon}></img>
                <button
                    className='btn btn-info mt-5'
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    Continue
                </button>
            </div>
        );
    };

    return (
        <CSSTransition in={true} appear={true} timeout={400} classNames='fade' unmountOnExit>
            <div className='login'>
                <div className='background'>
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

                {loading ? loadingContainer() : user.currentUser ? successContainer() : formContainer()}
            </div>
        </CSSTransition>
    );
};

export default Login;
