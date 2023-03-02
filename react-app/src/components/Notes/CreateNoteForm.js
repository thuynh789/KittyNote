import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createNote_thunk, getUserNotes_thunk, getOneNote_thunk } from '../../store/notes';
import { getUserNotebooks_thunk } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './NewNoteForm.css'


export default function CreateNoteForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector((state) => state.session.user);
    const notebooks = useSelector(state =>state.notebooks.allNotebooks)
    const notes  = useSelector(state => state.notes.allNotes)
    // const noteId = Object.values(notes)
    // const pee = (noteId.pop().id) + 1
    // console.log(pee)
    // console.log(noteId)

    const [title, setTitle] = useState('');
    const enterTitle = (e) => setTitle(e.target.value);
    const [content, setContent]= useState('');
    const enterContent = (e) => setContent(e.target.value);
    const [notebookId, setNotebookId]= useState(1);
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
            notebookId: notebookId
        }
        console.log(note)
        dispatch(createNote_thunk(note))
            .then(() => dispatch(getUserNotes_thunk()))
            // .then(() => dispatch(getOneNote_thunk(pee)))
            // .then(() => history.push(`/notes/${pee}`))
            .then(closeModal)

    };

    return (
        <div className='newnote'>
            <div className="form-header">
                <h1>New Note</h1>
            </div>

            <div className='form-container'>
                <ul>{errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}</ul>
                <form className='form-body' onSubmit={handleSubmit}>
                    <label>Name
                        <input className='inp1'
                            type="text"
                            required
                            value={title}
                            minLength='3'
                            maxLength='50'
                            placeholder='name'
                            onChange={enterTitle}
                        />
                    </label>
                    <label className='inp2'>Make a note
                        <textarea className='input2'
                            type="text"
                            required
                            value={content}
                            maxLength='1000'
                            placeholder=''
                            onChange={enterContent}
                        />
                    </label>
                    <label className="inp3">Select a notebook:
                        <select className='newselect' value={notebookId} onChange={enterNotebookId}>
                            {/* <option value="">Select a notebook</option> */}
                            {Object.values(notebooks).map((notebook) => (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.title}
                            </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className='form-button'
                        type="submit"
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}
