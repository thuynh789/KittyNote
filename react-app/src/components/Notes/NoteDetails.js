import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNote_thunk } from "../../store/notes";
import { useParams } from "react-router-dom";


export default function NoteDetails(){
    const myNotebooks = useSelector(state => state.notebooks.allNotebooks)
    const myNote = useSelector(state => state.notes.singleNote)
    console.log(myNote)
    const dispatch = useDispatch();
    const {noteId} = useParams();


    useEffect(()=>{
        dispatch(getOneNote_thunk(noteId))
    },[dispatch])

    // useEffect(()=>{
    //     dispatch(getNoteThunk(noteId))
    // },[dispatch,noteId])

    // console.log(myNotebook.notes)

    return (
        <div className='notebook-container'>
            <div className='single-notebook-header'>
                <h1>{myNote.title}</h1>
            </div>
            <div classNAme='note-page'>
                <div className="created">
                    Last edited:
                    {myNote.updated_at}
                </div>
                <div className="created">
                    {myNote.content}
                </div>
            </div>
        </div>
    );
}
