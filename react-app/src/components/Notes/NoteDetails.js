import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNote_thunk, updateNote_thunk, getUserNotes_thunk } from "../../store/notes";
import { getUserNotebooks_thunk } from "../../store/notebooks";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../LandingPage/OpenModalButton";
import DeleteNoteForm from "./DeleteNoteForm";
import "./NoteDetails.css"

export default function NoteDetails(){
    const myNotebooks = useSelector(state => state.notebooks.allNotebooks)
    const {noteId} = useParams();
    console.log(noteId)
    const myNote = useSelector(state => state.notes.singleNote)
    const notebooks = useSelector(state =>state.notebooks.allNotebooks)
    // const myNote = useSelector(state => state.notes.allNotes[noteId])
    console.log(myNote)
    // console.log(myNote2)
    const dispatch = useDispatch();
    const history = useHistory();

    const [noteContent, setNoteContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal()
    const [notebookId, setNotebookId]= useState('');
    const changeNotebookId = (e) => setNotebookId(e.target.value);


    useEffect(()=>{
        dispatch(getOneNote_thunk(noteId))
        dispatch(getUserNotebooks_thunk())
    },[dispatch, noteId])

    useEffect(() => {
		setNoteTitle(myNote?.title || "");
		setNoteContent(myNote?.content || "");
        setNotebookId(myNote?.notebookId || "");
      }, [myNote]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const editedNote = {
            title: noteTitle,
            content: noteContent,
            notebookId: parseInt(notebookId)
        }

        dispatch(updateNote_thunk(noteId, editedNote))
            .then(() => dispatch(getOneNote_thunk(noteId)))
            .then(() => dispatch(getUserNotes_thunk()))
            .then(() => history.push(`/notes/${noteId}`))

    };

    return (
        <div className='notebook-container'>
            <div className='note-header'>
                <div>
                    <label className="notebook">Select a notebook:
                        <select value={notebookId} onChange={changeNotebookId}>
                            {/* <option value="">Select a notebook</option> */}
                            {Object.values(notebooks).map((notebook) => (
                            <option key={notebook.id} value={notebook.id}>
                                {notebook.title}
                            </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button onClick={handleEdit}>Save</button>
                <OpenModalButton
                    modalComponent={<DeleteNoteForm noteId={noteId}/>}
                    buttonText='Delete'
                />
            </div>
            <div classNAme='note-page'>
                <div className="note-title">
                    <input
                    className="notes-title"
                    value={noteTitle}
                    placeholder="Title"
                    onChange={(e) => setNoteTitle(e.target.value)}
                    ></input>
                </div>
                <div className="created">
                    Last edited:
                    {' '}
                    {myNote.updated_at}
                </div>
                <div className="note-content">
                    <textarea
                    className="notes-body"
                    value={noteContent}
                    placeholder="Content"
                    onChange={(e) => setNoteContent(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
