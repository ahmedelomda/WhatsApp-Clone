import React,{ useState } from 'react';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Login from "./Components/Login";
import { useStateValue } from "./Components/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Styles/App.css';

function App() {

  const [{ user }, dispatch] = useStateValue();
  

  return (
    <div className="app">

    {!user ? (
        <Login />
      ):(
        <div className="app-body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
     )
    }
    </div>
  );
}

export default App;
