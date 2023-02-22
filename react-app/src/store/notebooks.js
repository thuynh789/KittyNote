const GET_USER_NOTEBOOKS= 'notebooks/GET_USER_NOTEBOOKS';
const ONE_NOTEBOOK = 'notebooks/ONE_NOTEBOOK';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK= 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';


// ACTION CREATORS
export const getUserNotebooks_AC= (notebooks) => ({
    type: GET_USER_NOTEBOOKS,
    payload: notebooks
  });

export const getOneNotebook_AC= (notebook) => ({
    type: ONE_NOTEBOOK,
    payload: notebook
  });

export const createNotebook_AC= (notebook) => ({
    type: CREATE_NOTEBOOK,
    payload: notebook
  });

export const updateNotebook_AC= (notebook) => ({
    type: UPDATE_NOTEBOOK,
    payload: notebook
  });

export const deleteNotebook_AC= (notebookId) => ({
    type: DELETE_NOTEBOOK,
    payload: notebookId
  });


// THUNKS

export const getUserNotebooks_thunk = () => async (dispatch) => {
  const res = await fetch('/api/notebooks/')
  if (res.ok) {
      const data = await res.json()
      dispatch(getUserNotebooks_AC(data))
      return data
  }
  return res
}


// REDUCER
const initialState = {
  allNotebooks: {},
  singleNotebook: {}
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {

    case GET_USER_NOTEBOOKS: {
      const newState = {}
      action.payload.forEach(notebook => {
        newState[notebook.id] = notebook
      })
      return {
        ...state,
        allNotebooks: newState
      }
    }




    default:
      return state
  }
}
