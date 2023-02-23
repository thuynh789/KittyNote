import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} />
      {isLoaded && ( */}
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
            <div id="main-components-container">
              <Navigation />
            </div>
          </ProtectedRoute>
        </Switch>
      {/* )} */}
    </>
  );
}

export default App;
