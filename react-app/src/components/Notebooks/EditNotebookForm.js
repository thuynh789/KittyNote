import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotebook_thunk, getUserNotebooks_thunk, getOneNotebook_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import "../Notes/NewNoteForm.css"


export default function EditNotebookForm({myNotebook}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);


    const [title, setTitle] = useState(myNotebook?.title);
    const updateTitle = (e) => setTitle(e.target.value);

    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal()

    useEffect(() => {
        const errors = [];
        if (title.length < 1) errors.push('Name must be at least 1 character');
        setErrors(errors);
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notebook = {
            id: myNotebook.id,
            title
        }
        dispatch(updateNotebook_thunk(notebook))
            .then(() => dispatch(getOneNotebook_thunk(myNotebook.id)))
            .then(() => dispatch(getUserNotebooks_thunk()))
            .then(() => history.push(`/notebooks`))
            .then(closeModal)

    };

    return (
        <>
            <div className='form-header'>
                <h1>Rename your notebook</h1>
            </div>
            <section className='form-container'>
                <div className='edit-errors'>
                    <ul> {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>

                <form className='form-body' onSubmit={(e) => handleSubmit(e,myNotebook?.id)}>
                    <label>Name
                        <input className='edit-notebook-input'
                            type="text"
                            placeholder={myNotebook?.title}
                            required
                            minLength= '1'
                            maxLength= '100'
                            value={title}
                            onChange={updateTitle}
                        />
                    </label>
                    <button className='form-button' type="submit">Save</button>
                </form>
            </section>
        </>
    )
}
