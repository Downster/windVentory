import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";


function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            {sessionUser ? null : <SplashPage />}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;