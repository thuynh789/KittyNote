import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNotebook_thunk } from "../../store/notebooks";
import { useParams } from "react-router-dom";
import "./Notebooks.css"

export default function NotebookDetails(){
    const myNotebook = useSelector(state => state.notebooks.singleNotebook)
    const myNotes = useSelector(state => state.notebooks.singleNotebook.notes)
    console.log(myNotebook)
    console.log(myNotes)
    const dispatch = useDispatch();
    const {notebookId} = useParams();


    useEffect(()=>{
        dispatch(getOneNotebook_thunk(notebookId))
    },[dispatch])

    // useEffect(()=>{
    //     dispatch(getNoteThunk(noteId))
    // },[dispatch,noteId])

    console.log(myNotebook.notes)

    return (
        <div className='notebook-container'>
            <div className='single-notebook-header'>
                <h1>{myNotebook.title}</h1>
            </div>
            <div classNAme='note-page'>
                {myNotebook.created_at}
                <ul>
                {myNotes?.map(note => (
                    <li key={note.content}>{note.title}: {note.content}</li>
                ))}
                </ul>
            </div>




        </div>
    );
}
