import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import '../styles/home.css'
import Authenticator from "../Authentication"
import MessageAPI from "../MessageAPI"

class Home extends Component {

  constructor () {
      super();
      this.state = {
          messages: 0
      }
  }


    signout(){
      Authenticator.signout();
      this.setState({});
    }

    getMessageCount(){
      MessageAPI.getAll((res) => {
          this.setState({messages: res.filter((message) => message.recipient === localStorage.getItem('user-email')).length});
      });
    }

    componentDidMount() {
      this.getMessageCount();
    }

    render() {

      let loggedIn = Authenticator.getCurrentUserID() !== null;

        return (
            <div id={"home-container"}>
                <div className={"bg"}></div>
                <div className={"header"}>
                    {loggedIn ? <NavLink to={"/inbox"}>Inbox {"(" + this.state.messages + ")"}</NavLink> : ""}
                    {loggedIn ? <NavLink to={"/user/" + Authenticator.getCurrentUserEmail()}>Profile</NavLink> : ""}
                    {loggedIn ? <NavLink to={"/projects/my"}>My projects</NavLink> : ""}
                    {loggedIn ? <NavLink to="/projects/create">New Project</NavLink> : ""}
                    {!loggedIn ? <NavLink to="/login">Login</NavLink> : <a onClick={event => this.signout()}>Logout</a>}
                    {!loggedIn ? <NavLink to="/register">Sign Up</NavLink> : ""}
                </div>
                <div id={"content"}>
                    <h1 id={"title"}>Project-er</h1>
                    <p id={"description"}>Join innovative teams of talented developers and help revolutionize the world</p>
                    <NavLink to="/search">Begin Project Search</NavLink>
                    <br/>
                </div>
            </div>
        )
    }
}
export default Home;
