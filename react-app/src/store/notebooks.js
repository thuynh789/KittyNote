const GET_USER_NOTEBOOKS= 'notebooks/GET_USER_NOTEBOOKS';
const ONE_NOTEBOOK = 'notebooks/ONE_NOTEBOOK';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK= 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';


// ACTION CREATORS
export const getUserNotebooksAC= (notebooks) => ({
    type: GET_USER_NOTEBOOKS,
    payload: notebooks
  });

export const getOneNotebookAC= (notebook) => ({
    type: ONE_NOTEBOOK,
    payload: notebook
  });

export const createNotebookAC= (notebook) => ({
    type: CREATE_NOTEBOOK,
    payload: notebook
  });

export const updateNotebookAC= (notebook) => ({
    type: UPDATE_NOTEBOOK,
    payload: notebook
  });

export const deleteNotebookAC= (notebookId) => ({
    type: DELETE_NOTEBOOK,
    payload: notebookId
  });


// THUNKS
