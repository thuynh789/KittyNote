import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Notebooks from "./components/Notebooks/Notebooks"
import NotebookDetails from "./components/Notebooks/NotebookDetails";
import Notes from "./components/Notes/Notes"
import NoteDetails from "./components/Notes/NoteDetails";
import NoteDetails2 from "./components/Notes/NoteDetails2";
import ErrorCat from "./components/404Page/404Page";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/" exact={true}>
            <LandingPage/>
          </Route>

          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <ProtectedRoute path="/home" exact={true}>
            <Navigation />
            <Notebooks />
            <Notes/>
          </ProtectedRoute>
          <ProtectedRoute path='/notebooks' exact={true}>
            <Navigation />
            <Notebooks />
          </ProtectedRoute>
          <ProtectedRoute path='/notebooks/:notebookId' exact={true}>
            <Navigation />
            <NotebookDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/notebooks/:notebookId/:noteId' exact={true}>
            <Navigation />
            <NoteDetails2 />
          </ProtectedRoute>
          <ProtectedRoute path='/notes' exact={true}>
            <Navigation />
            <Notes />
          </ProtectedRoute>
          <ProtectedRoute path='/notes/:noteId' exact={true}>
            <Navigation />
            <Notes />
            <NoteDetails />
          </ProtectedRoute>
          <Route>
            <ErrorCat/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
