import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/index'
import SignUpFormPage from './components/SignUpFormPage/index';
import * as sessionActions from './store/session'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=> {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true))
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignUpFormPage />
      </Route>
    </Switch>
  );
}

export default App;
