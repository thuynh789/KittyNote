import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotebooks_thunk, createNotebook_thunk } from "../../store/notebooks";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenModalButton from "../LandingPage/OpenModalButton";
import CreateNotebookForm from "./CreateNotebookForm";
import EditNotebookForm from "./EditNotebookForm";

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
            <h1>Notebooks</h1>

            <div className="create-nb">
                <OpenModalButton
                className = 'button-in'
                buttonText="New Notebook"
                modalComponent={<CreateNotebookForm />}
                />
            </div>

                {Object.values(notebooks).map((notebook) => (
					<li key={notebook.id}>
						<Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
    
                        <OpenModalButton
                            modalComponent={<EditNotebookForm myNotebook={notebook} />}
                            // className="fa-solid fa-pen-to-square"
                            buttonText='Rename'
                        />
					</li>
				))}
        </div>
    )
}
