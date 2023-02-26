const GET_USER_NOTES= 'notes/GET_USER_NOTES';
const ONE_NOTE = 'notes/ONE_NOTE';
const CREATE_NOTE = 'notes/CREATE_NOTE';
const UPDATE_NOTE= 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';


// ACTION CREATORS
export const getUserNotes_AC= (notes) => ({
    type: GET_USER_NOTES,
    payload: notes
  });

export const getOneNote_AC= (note) => ({
    type: ONE_NOTE,
    payload: note
  });

export const createNote_AC= (note) => ({
    type: CREATE_NOTE,
    payload: note
  });

export const updateNote_AC= (note) => ({
    type: UPDATE_NOTE,
    payload: note
  });

export const deleteNote_AC= (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId
  });


// THUNKS

export const getUserNotes_thunk = () => async (dispatch) => {
  const res = await fetch('/api/notes/')
  // console.log(res)
  if (res.ok) {
      const data = await res.json()
      // console.log(data)
      dispatch(getUserNotes_AC(data.Notes))
      return data
  }
  return res
}

export const getOneNote_thunk= (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}`);
  // console.log(res)
  if (res.ok) {
    const data = await res.json();
    // console.log(data)
    dispatch(getOneNote_AC(data.Note));
    return data;
  }
  return res
}

export const createNote_thunk= (note) => async (dispatch) => {
  const res = await fetch(`/api/notes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(note),
  })
  // console.log(res)
  if (res.ok) {
    const data = await res.json();
    // console.log(data)
    dispatch(createNote_AC(data));
    return data;
  }
  return res
}

export const updateNote_thunk= (note) => async (dispatch) => {
  const res = await fetch(`/api/notes/${note.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(note),
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(updateNote_AC(data));
    return data;
  }
  return res
}

export const deleteNote_thunk= (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteNote_AC(noteId));
    return data;
  }
  return res
}



// REDUCER
const initialState = {
  allNotes: {},
  singleNote: {}
};

export default function noteReducer(state = initialState, action) {
  switch (action.type) {

    case GET_USER_NOTES: {
      const newState = { allNotes: {}, singleNote: {}}
      action.payload.forEach(note => {
        newState.allNotes[note.id] = note
      })
      return newState
    }

    case ONE_NOTE: {
      const newState = {...state, singleNote: {}}
      // console.log(newState)
      newState.singleNote = action.payload
      // console.log(newState)
      return newState
    }

    case CREATE_NOTE: {
      const newState = {...state, singleNote: {}}
      newState.allNotes[action.payload.id] = action.payload
      return newState
    }

    case UPDATE_NOTE: {
      const newState = {...state, singleNote: {}}
      newState.allNotes[action.payload.id] = action.payload
      return newState
    }

    case DELETE_NOTE: {
      const newState = {...state, singleNote: {}}
      delete newState.allNotes[action.payload]
      return newState
    }

    default:
      return state
  }
}
