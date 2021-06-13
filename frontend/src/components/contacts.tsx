import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';
import '../sass/components/_contacts.scss';
import ContactCard from './contact-card';
import { RootState } from '../types';

const Contacts = () => {
    const user = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch();
    const [contacts, setContacts] = useState<Array<string>>([]);

    const [addModalShow, setAddModalShow] = useState(false);
    const toggleAddModal = () => {
        setAddModalShow(!addModalShow);
    };

    const [formUsername, setformUsername] = useState('');
    const [formError, setformError] = useState('');

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const toggleDeleteModal = () => {
        setDeleteModalShow(!deleteModalShow);
    };

    const [toDelete, setToDelete] = useState('');

    useEffect(() => {
        if (user.currentUser) {
            setContacts(user.currentUser.Contacts);
        }
    }, [user]);

    const deleteCallback = (username: string) => {
        setToDelete(username);
        toggleDeleteModal();
    };

    const deleteContact = (username: string) => {
        // Post request to backend
        axios({
            method: 'put',
            url: '/user/update',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: user.currentUser.Username,
                deleteContact: username,
            }),
        }).then((res) => {
            if (res.data.success) {
                dispatch(setUser(res.data.result));
                setContacts(res.data.result.Contacts);
                setToDelete('');
                toggleDeleteModal();
            }
        });
    };

    const addContact = () => {
        if (!formUsername) {
            setformError('Please enter a username.');
            return;
        }

        if (user.currentUser.Contacts.includes(formUsername)) {
            setformError('User already added.');
            return;
        }
        // Post request to backend
        axios({
            method: 'put',
            url: '/user/update',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: user.currentUser.Username,
                addContact: formUsername,
            }),
            timeout: 10000,
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch(setUser(res.data.result));
                    setContacts(res.data.result.Contacts);
                    setformError('');
                    setformUsername('');
                    toggleAddModal();
                } else {
                    setformError(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                setformError(err.toString());
            });
    };

    const addModal = () => {
        return (
            <Modal show={addModalShow} onClose={toggleAddModal} className='text-dark'>
                <Modal.Header>
                    <Modal.Title>New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setformError('');
                            addContact();
                        }}
                    >
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter contact&#39;s username'
                                value={formUsername}
                                onChange={(ev) => {
                                    setformUsername(ev.target.value);
                                }}
                            />
                        </Form.Group>
                    </Form>
                    <p className='text-danger mt-3'>{formError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='submit'
                        variant='warning'
                        onClick={() => {
                            setformError('');
                            addContact();
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setformUsername('');
                            setformError('');
                            toggleAddModal();
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const deleteModal = () => {
        return (
            <Modal show={deleteModalShow} onClose={toggleDeleteModal} className='text-dark'>
                <Modal.Header>
                    <Modal.Title>Deleting Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete {toDelete} ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={() => {
                            deleteContact(toDelete);
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            toggleDeleteModal();
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className='contacts'>
            <div className='add-button d-flex align-items-stretch px-5 py-3'>
                <button title='New Contact' className='btn h-100 w-100' onClick={() => toggleAddModal()}>
                    New Contact
                </button>
            </div>
            <div className='list'>
                {contacts.map((contact) => {
                    return <ContactCard username={contact} toDeleteCallback={deleteCallback} />;
                })}
            </div>

            {addModal()}
            {deleteModal()}
        </div>
    );
};

export default Contacts;
