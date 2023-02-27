import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNote_thunk, updateNote_thunk, getUserNotes_thunk } from "../../store/notes";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import "./NoteDetails.css"

export default function NoteDetails(){
    const myNotebooks = useSelector(state => state.notebooks.allNotebooks)
    const myNote = useSelector(state => state.notes.singleNote)
    console.log(myNote)
    const dispatch = useDispatch();
    const {noteId} = useParams();
    const history = useHistory();

    const [noteContent, setNoteContent] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const {closeModal} = useModal()

    useEffect(()=>{
        dispatch(getOneNote_thunk(noteId))
    },[dispatch])

    useEffect(() => {
		setNoteTitle(myNote?.title || "");
		setNoteContent(myNote?.content || "");
      }, [myNote]);

    const handleEdit = async (e) => {
        e.preventDefault();
        const editedNote = {
            id: myNote.id,
            title: noteTitle,
            content: noteContent,
            notebookId: myNote.notebookId
        }
        dispatch(updateNote_thunk(editedNote))
            .then(() => dispatch(getOneNote_thunk(myNote.id)))
            .then(() => dispatch(getUserNotes_thunk()))
            .then(() => history.push(`/notes/${myNote.id}`))
            .then(closeModal)

    };

    return (
        <div className='notebook-container'>
            <div className='note-header'>
                <button onClick={handleEdit}>Save</button>
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
                    {myNote.updated_at}
                </div>
                <div className="note-content">
                    <textarea
                    className="notes-body"
                    value={noteContent}
                    placeholder="Content"
                    multiline={true}
                    onChange={(e) => setNoteContent(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
