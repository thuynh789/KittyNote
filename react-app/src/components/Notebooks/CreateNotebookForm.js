import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNotebook_thunk, getUserNotebooks_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';


export default function CreateNotebookForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);


    const [title, setTitle] = useState('');
    const enterTitle = (e) => setTitle(e.target.value);

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
            title
        }
        dispatch(createNotebook_thunk(notebook))
            .then(() => dispatch(getUserNotebooks_thunk()))
            .then(() => history.push(`/notebooks`))
            .then(closeModal)

    };

    return (
        <div>
            <div className="form-header">
                <h1>New Notebook</h1>
            </div>

            <section className='form-container'>
                <ul>{errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}</ul>
                <form className='form-body' onSubmit={handleSubmit}>
                    <label>Name
                        <input className='notebook-form-input'
                            type="name"
                            required
                            value={title}
                            minLength= '1'
                            maxLength= '100'
                            placeholder='name'
                            onChange={enterTitle}
                        />
                    </label>
                    <button
                        className='form-button'
                        type="submit"
                    >Submit</button>
                </form>
            </section>
        </div>
    )
}
