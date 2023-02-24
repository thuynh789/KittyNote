import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotebook_thunk, getUserNotebooks_thunk, getOneNotebook_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';


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
            .then(() => dispatch(getUserNotebooks_thunk()))
            .then(() => dispatch(getOneNotebook_thunk(myNotebook.id)))
            .then(() => history.push(`/notebooks`))
            .then(closeModal)

    };

    return (
        <>
            <div className='edit-form'>
                <h1>Rename your notebook</h1>
            </div>
            <section className='edit-container'>
                <div className='edit-errors'>
                    <ul> {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>

                <form className='edit-form-body' onSubmit={(e) => handleSubmit(e,myNotebook?.id)}>
                    <textarea className='edit-form-input'
                        type="text"
                        placeholder={myNotebook?.title}
                        required
                        value={title}
                        onChange={updateTitle}
                    />
                    <button className='edit-form-button' type="submit">Save</button>
                </form>
            </section>
        </>
    )
}
