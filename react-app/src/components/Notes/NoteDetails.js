import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNote_thunk, updateNote_thunk, getUserNotes_thunk } from "../../store/notes";
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
    // const myNote = useSelector(state => state.notes.allNotes[noteId])
    console.log(myNote)
    // console.log(myNote2)
    const dispatch = useDispatch();
    const history = useHistory();

    const [noteContent, setNoteContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal()

    useEffect(()=>{
        dispatch(getOneNote_thunk(noteId))
    },[dispatch, noteId])

    useEffect(() => {
		setNoteTitle(myNote?.title || "");
		setNoteContent(myNote?.content || "");
      }, [myNote]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const editedNote = {
            title: noteTitle,
            content: noteContent,
            notebookId: myNote.notebookId
        }

        dispatch(updateNote_thunk(noteId, editedNote))
            .then(() => dispatch(getOneNote_thunk(noteId)))
            .then(() => dispatch(getUserNotes_thunk()))
            .then(() => history.push(`/notes/${noteId}`))

    };

    return (
        <div className='notebook-container'>
            <div className='note-header'>
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
