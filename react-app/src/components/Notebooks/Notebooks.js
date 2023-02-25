import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotebooks_thunk, createNotebook_thunk } from "../../store/notebooks";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenModalButton from "../LandingPage/OpenModalButton";
import CreateNotebookForm from "./CreateNotebookForm";
import EditNotebookForm from "./EditNotebookForm";
import DeleteNotebookForm from "./DeleteNotebookForm";
import "./Notebooks.css"

export default function Notebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const notebooks = useSelector((state) =>state.notebooks.allNotebooks);
    // console.log(notebooks)

    useEffect(() => {
        dispatch(getUserNotebooks_thunk());
      }, [dispatch]);

    return (
        <div className = "notebook-container">

            <div className="header">
                <h1>Notebooks</h1>
            </div>

            <div className="page-content">
                <div className="sub-header">
                    <div>{Object.values(notebooks).length}  Notebooks</div>
                    <div className="create-nb">
                        <OpenModalButton
                        className = 'button-in'
                        buttonText="New Notebook"
                        modalComponent={<CreateNotebookForm />}
                        />
                    </div>
                </div>

                <hr style={{ width: "100%" }} />

                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>TITLE</th>
                                <th>CREATED BY</th>
                                <th>UPDATED </th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(notebooks).map((notebook) => (
                                <React.Fragment key={notebook.id}>
                                <tr>
                                    <td>
                                        <Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{notebook.updated_at}</td>
                                    <td>
                                        <OpenModalButton
                                            modalComponent={<EditNotebookForm myNotebook={notebook} />}
                                            // className="fa-solid fa-pen-to-square"
                                            buttonText='Rename'
                                        />
                                        <OpenModalButton
                                            modalComponent={<DeleteNotebookForm notebookId={notebook.id}/>}
                                            // className="fa-solid fa-pen-to-square"
                                            buttonText='Delete'
                                        />
                                    </td>
                                </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
