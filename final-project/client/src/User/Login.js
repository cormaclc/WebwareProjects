import React from 'react';
import Authenticator from "../Authentication";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    authenticate = () => {
        Authenticator.signin(this.state.email, this.state.password, function callback(user) {
            if(user) {
                window.location.assign('/');
            } else {
                alert('Incorrect email or password');
            }
        })
    };

    render() {
        return (
            <div className="container">
                <h1 className="center">Login</h1>
                <label>
                  <p>Email</p>
                  <input type='email' placeholder='Email' onChange={(event) => this.setState({email: event.target.value})}/>
                </label>
                <label>
                  <p>Password</p>
                  <input type='password' placeholder='Password' onChange={(event) => this.setState({password: event.target.value})}/>
                </label>
                <br/>
                <button onClick={this.authenticate}>Login</button>
            </div>
        )
    }
}

export default Login;
