import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserNotebooks_thunk, deleteNotebook_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';


export default function DeleteNotebookForm({notebookId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);
    const {closeModal} = useModal()
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteNotebook_thunk(notebookId))
            .then(() => dispatch(getUserNotebooks_thunk()))
            .then(() => history.push(`/notebooks`))
            .then(closeModal)

    };

    return (
        <div className='newnote'>
            <div className="form-header">
                <h1>Delete notebook?</h1>
                <p>(This is permanent and cannot be undone.)</p>
            </div>
            <form onSubmit={handleSubmit}>
              <button className="delete-button" type="submit">Confirm Delete</button>
            </form>
{/*
                <form className='form-body' onSubmit={handleSubmit}>
                    <label>Name </label>
                    <input className='notebook-form-input'
                        type="name"
                        required
                        value={title}
                        onChange={enterTitle}
                    />
                    <button
                        className='button form-button'
                        type="submit"
                    >Submit</button>
                </form> */}

        </div>
    )
}
