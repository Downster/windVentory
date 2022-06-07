import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from './store/session';
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import CapstoneDashboard from "./components/CapstoneDashboard";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('x-access-token')) {
        await dispatch(sessionActions.restoreUser())
      }
      setLoaded(true)

    })();
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            {sessionUser ? <CapstoneDashboard /> : <SplashPage />}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;