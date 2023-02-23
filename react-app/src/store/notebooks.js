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
  // console.log(res)
  if (res.ok) {
      const data = await res.json()
      // console.log(data)
      dispatch(getUserNotebooks_AC(data.Notebooks))
      return data
  }
  return res
}

export const getOneNotebook_thunk= (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}`);
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(getOneNotebook_AC(data.Notebook));
    return data;
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
      const newState = { allNotebooks: {}, singleNotebook: {}}
      action.payload.forEach(notebook => {
        newState.allNotebooks[notebook.id] = notebook
      })
      return newState
      // return {
      //   ...state,
      //   allNotebooks: newState
      // }
    }

    case ONE_NOTEBOOK: {
      const newState = {...state, singleNotebook: {}}
      newState.singleNotebook = action.payload
      console.log(newState)
      return newState
    }




    default:
      return state
  }
}
