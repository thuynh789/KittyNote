import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNotebook_thunk } from "../../store/notebooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Notebooks.css"

export default function NotebookDetails(){
    const myNotebook = useSelector(state => state.notebooks.singleNotebook)
    const myNotes = useSelector(state => state.notebooks.singleNotebook.notes)
    // console.log(myNotebook)
    console.log(myNotes)
    const dispatch = useDispatch();
    const {notebookId} = useParams();


    useEffect(()=>{
        dispatch(getOneNotebook_thunk(notebookId))
    },[dispatch])

    // useEffect(()=>{
    //     dispatch(getNoteThunk(noteId))
    // },[dispatch,noteId])

    // console.log(myNotebook.notes)

    return (
        <div className='notebook-container'>
            <div className='single-notebook-header'>
                <h1>{myNotebook.title}</h1>
                <h2>{myNotes?.length} Notes</h2>
            </div>
            <div classNAme='note-page'>
                Created at: {' '}{myNotebook.created_at}
                <ul className="nbnotes" style={{marginTop: '2rem'}}>
                {myNotes?.map(note => (
                    <li className= 'nbnotes2' style={{marginTop: '1rem'}} key={note.id}>
                       <Link to={`/notebooks/${myNotebook.id}/${note.id}`}>{note.title}</Link>
                    </li>
                ))}
                </ul>
            </div>




        </div>
    );
}
