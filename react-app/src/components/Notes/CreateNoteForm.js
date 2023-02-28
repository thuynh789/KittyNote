import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createNote_thunk, getUserNotes_thunk, getOneNote_thunk } from '../../store/notes';
import { getUserNotebooks_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';


export default function CreateNoteForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);
    const notebooks = useSelector(state =>state.notebooks.allNotebooks)
    console.log(notebooks)


    const [title, setTitle] = useState('');
    const enterTitle = (e) => setTitle(e.target.value);
    const [content, setContent]= useState('');
    const enterContent = (e) => setContent(e.target.value);
    const [notebookId, setNotebookId]= useState('');
    const enterNotebookId = (e) => setNotebookId(e.target.value);

    useEffect(() => {
		dispatch(getUserNotebooks_thunk())
	}, [dispatch]);

    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = {
            title,
            content,
            notebookId: parseInt(notebookId)
        }
        console.log(note)
        dispatch(createNote_thunk(note))
            .then(() => dispatch(getUserNotes_thunk()))
            // .then((note) => dispatch(getOneNote_thunk(note.id)))
            // .then((note) => history.push(`/notes/${note.id}`))
            .then(closeModal)

    };

    return (
        <div>
            <div className="form-header">
                <h1>New Note</h1>
            </div>

            <section className='form-container'>
                <ul>{errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}</ul>
                <form className='form-body' onSubmit={handleSubmit}>
                    <label>Name
                        <input className='note-form-input'
                            type="text"
                            required
                            value={title}
                            onChange={enterTitle}
                        />
                    </label>
                    <label>Make a note
                        <input className='note-form-input'
                            type="text"
                            required
                            value={content}
                            onChange={enterContent}
                        />
                    </label>
                    <label className="notebook">Select a notebook:
                        <select value={notebookId} onChange={enterNotebookId}>
                            {/* <option value="">Select a notebook</option> */}
                            {Object.values(notebooks).map((notebook) => (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.title}
                            </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className='button form-button'
                        type="submit"
                    >Submit</button>
                </form>
            </section>
        </div>
    )
}
