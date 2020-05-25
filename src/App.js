import React, {useEffect} from 'react';
import './App.css';
import Login from './views/Login/index.jsx';
import Main from './views/Main/index';
import {Switch, Route, useHistory} from 'react-router-dom';
import appConfig from './config/appConfig';
import {UserContextProvider} from './context/userContext';
import {SocketContextProvider} from './context/socketContext';
import {MessageContextProvider} from './context/messageContext';

function App() {
  const history = useHistory();
  useEffect(() => {
    let token = (window.localStorage.getItem(appConfig.Localtoken)) 
    if(!token) {
      history.replace("Login")
    }
  }, [history])

  return (
    <UserContextProvider>
      <Switch>
        <Route exact path = "/Login">
          <Login/>
        </Route>
        <Route path = "/">
          <SocketContextProvider>
            <MessageContextProvider>
              <Main/>
            </MessageContextProvider>
          </SocketContextProvider>
        </Route>        
      </Switch>
    </UserContextProvider>
  );
}

export default App;
