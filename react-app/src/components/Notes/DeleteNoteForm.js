import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserNotes_thunk, deleteNote_thunk } from '../../store/notes';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';


export default function DeleteNoteForm({noteId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);
    const {closeModal} = useModal()
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(deleteNote_thunk(noteId))
            .then(() => dispatch(getUserNotes_thunk()))
            .then(() => history.push(`/notes`))
            .then(closeModal)

    };

    return (
        <div className='newnote'>
            <div className="form-header">
                <h1>Delete note?</h1>
                <p style={{color:'red'}}>(This is permanent and cannot be undone.)</p>
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
