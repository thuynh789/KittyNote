import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotebooks_thunk } from "../../store/note";
import { useHistory } from "react-router-dom";

export default function allNotebooks() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const notebooks = useSelector((state) =>state.notebooks.allNotebooks);

    useEffect(() => {
        dispatch(getUserNotebooks_thunk());
      }, [dispatch]);

    return (
        <div className = "notebook-container">
            {notebooks}
        </div>
    )
}
