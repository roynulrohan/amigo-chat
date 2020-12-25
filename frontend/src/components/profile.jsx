import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';
import '../sass/components/_profile.scss';
import defaultDP from '../assets/profile.png';

const Profile = () => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [photoURL, setPhotoURL] = useState('');
    const [photoError, setPhotoError] = useState('');

    const photoSubmit = () => {
        setPhotoError('');

        if (!photoURL) {
            setPhotoError('URL cannot be blank.');
        }

        // Post request to backend
        axios({
            method: 'put',
            url: 'http://localhost:4000/user/update',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: user.currentUser.Username,
                photoURL: photoURL,
            }),
            timeout: 10000,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch(setUser(res.data.result));
                } else {
                    setPhotoError(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                setPhotoError(err.toString());
            });
    };

    return (
        <div className='profile p-4'>
            <div className='photo'>
                <img
                    className='pfp'
                    src={
                        user.currentUser.PhotoURL
                            ? user.currentUser.PhotoURL
                            : defaultDP
                    }
                />
            </div>
            <h1 className='app-font mt-4'>{user.currentUser.Username}</h1>
            <div class='input-group mt-4'>
                <input
                    type='text'
                    class='form-control'
                    placeholder='Photo URL'
                    value={photoURL}
                    onChange={(ev) => {
                        setPhotoURL(ev.target.value);
                    }}
                />
                <button
                    className='btn btn-warning'
                    onClick={() => photoSubmit()}>
                    Submit
                </button>
            </div>
            <p className='text-danger mt-2'>{photoError}</p>
        </div>
    );
};

export default Profile;
