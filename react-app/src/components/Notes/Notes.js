import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotes_thunk, getOneNote_thunk} from "../../store/notes";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenModalButton from "../LandingPage/OpenModalButton";
import CreateNoteForm from "./CreateNoteForm";
import "./Notes.css"


export default function Notes() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const notes = useSelector((state) =>state.notes.allNotes);
    console.log(notes)

    useEffect(() => {
        dispatch(getUserNotes_thunk());
      }, [dispatch]);

    const handleSubmit = async (noteId) => {
      await dispatch(getOneNote_thunk(noteId))
      history.push(`/notes/${noteId}`)
    }

    return (
      <div className="note-container">
        <div className="header">
            <h1>Notes</h1>
            <div className="create-nb">
              <OpenModalButton
              className = 'button-in'
              buttonText="New Note"
              modalComponent={<CreateNoteForm />}
              />
            </div>
        </div>

        {Object.keys(notes).length === 0 ? (
             <div className="no-notes-message">STEP 2: Create a note! ⬆️ </div>
         ) : (
        <div className="notes-list">
            {Object.values(notes).map((note) => (
              <div className='note-card' key={note.id}
                onClick={() => { handleSubmit(note.id) }}
                style={{ cursor: 'pointer'}}
              >
                <div>
                    <h3>{note.title}</h3>
                </div>
                <div>
                    <span>{note.updated_at}</span>
                </div>
              </div>
            ))}
        </div>
         )}
      </div>
    )
}
