import React, { useState, useEffect } from 'react';
import '../sass/components/_contacts.scss';

const Contacts = ({ contactsData }) => {
    const [contacts, setContacts] = useState(contactsData);

    useEffect(() => {
        
    }, []);

    return (
        <div className='contacts'>
            <div className='scrollable'>
                {contacts.length !== 0 ? (
                    contacts.map((contact) => {
                        return (
                            <div className='contact d-flex justify-content-between align-items-center p-3'>
                                <div className='d-flex flex-column justify-content-between'>
                                    <h5 className='name'>{contact}</h5>
                                </div>
                                <a className='button btn btn-danger text-dark text-center p-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='1.3em'
                                        height='1.3em'
                                        fill='currentColor'
                                        class='bi bi-trash'
                                        viewBox='0 0 16 16'>
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                        <path
                                            fill-rule='evenodd'
                                            d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                        />
                                    </svg>
                                </a>
                            </div>
                        );
                    })
                ) : (
                    <div className='empty h-100 d-flex flex-column justify-content-center align-items-center'>
                        You have no contacts
                    </div>
                )}
            </div>
            <div className='add-button d-flex align-items-stretch px-5 py-3'>
                <button className='btn btn-info h-100 w-100'>New Contact</button>
            </div>
        </div>
    );
};

export default Contacts;
