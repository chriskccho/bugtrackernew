import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateProject from "./components/CreateProject"
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import IssueDetails from "./components/IssueDetails";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (data) => {
    console.log(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    localStorage.setItem('id', data.user_id)
    setLoggedIn(true)
  }

  return (
    <Router>
      <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home loggedIn={loggedIn}/>
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path="/signup">
              <Signup handleLogin={handleLogin}/>
            </Route>
            <Route path="/createproject">
              <CreateProject/>
            </Route>            
            <Route exact path="/projects/:id">
              <ProjectDetails/> 
            </Route>
            <Route path="/issues/:id">
              <IssueDetails/>
            </Route>
            <Route path="/projects">
              <ProjectList/>
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
