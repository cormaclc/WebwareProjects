import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import './styles/material.css';
import ProjectAPI from './ProjectAPI';

// Components
import Home from './components/Home';
import Inbox from './components/Inbox';
import NotFound from './components/NotFound';
import User from "./User/User";
import CreateUser from "./User/CreateUser";
import ProjectCreationForm from "./ProjectCreationForm/ProjectCreationForm"
import RecommendedProjects from "./RecommendedProjects/RecommendedProjects"
import ProjectFinder from "./components/ProjectFinder"
import MyProjects from "./components/MyProjects"

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Login from "./User/Login";
import Project from "./components/Project";
library.add(faPlus, faTrashAlt);

class App extends Component {
    // Initialize state
    state = { projects: [] }

    // Fetch projects after first mount
    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        // Get the projects and store them in state
        // Authenticator.signin("test@example.com", "1234", console.log);
        // Authenticator.signout();
        // UserAPI.get("test@example.com", console.log);
        ProjectAPI.getAll(projects => this.setState({ projects }));
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        {/* Temp routes for testing */}
                        <Route path="/inbox" component={Inbox} />
                        <Route path="/search" component={ProjectFinder} />
                        <Route path='/user/:userEmail' component={User}/>
                        <Route path='/projects/my' component={MyProjects}/>
                        <Route path='/projects/create' component={ProjectCreationForm}/>
                        <Route path='/projects/recommended' component={RecommendedProjects}/>
                        <Route path='/projects/:projid' component={Project}/>
                        <Route path='/register' name='register' component={CreateUser}/>
                        <Route path='/login' component={Login} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
