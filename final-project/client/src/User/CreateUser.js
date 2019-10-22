import React from 'react';
import './user_styles.css'
import '../ProjectCreationForm/ProjectCreationForm.css'
import UserAPI from "../UserAPI";
import Authenticator from "../Authentication";

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.possibleSkills = [];
        this.possibleTopics = [];
        this.state = {name:'', secondStep: false, email:'', skills:[], looking: false, topics: [], duration: 0, funding: false, teamSize: 0};
    }

    componentDidMount() {
        fetch('/api/users')
            .then(res => res.json())
            .then(json => {
                this.existingUsers = json.map(user => user.email);
            });
        fetch('/api/skills')
            .then(res => res.json())
            .then(json => {
                this.possibleSkills = json;
                this.setState({});
            });

        fetch('/api/topics')
            .then(res => res.json())
            .then(json => {
                this.possibleTopics = json;
                this.setState({});
            });

        if(this.props.location.state) {
            let user = this.props.location.state;
            this.setState({
                name: user.name,
                email: user.email,
                skills: user.skills,
                topics: user.projInterests,
                looking: user.lookingForProjects,
                duration: user.maxProjectDuration,
                funding: user.canFund,
                teamSize: user.teamSize,
            })
        }
    }

    nextStep = (event) => {
        if(this.state.email.length === 0 || this.state.name.length === 0 || !this.state.p1 || !this.state.p2) {
            alert('Please fill all fields.')
        } else if(this.existingUsers.includes(this.state.email) && !this.props.location.state) {
            alert('There is already an account with this email.')
        } else if(this.state.p1 !== this.state.p2) {
            alert('Passwords must match')
        } else {
            this.setState({
                secondStep: true,
            });
        }
        event.preventDefault();
    };

    updateProfile = () => {
        let id = Authenticator.getCurrentUserID();

        UserAPI.update(this.state.email, id, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.p1,
            skills: this.state.skills,
            projInterests: this.state.topics,
            lookingForProjects: this.state.looking,
            maxProjectDuration: this.state.duration,
            canFund: this.state.funding,
            teamSize: this.state.teamSize,
        }, user => {
            window.location.assign('/user/' + this.state.email);
        })
    };

    createProfile = () => {
        const duration = this.state.duration < 1 ? -1 : this.state.duration;

        UserAPI.create({
            name: this.state.name,
            email: this.state.email,
            password: this.state.p1,
            skills: this.state.skills,
            projInterests: this.state.topics,
            lookingForProjects: this.state.looking,
            maxProjectDuration: duration,
            canFund: this.state.funding,
            teamSize: this.state.teamSize,
        }, user => {
            Authenticator.signin(this.state.email, this.state.p1, loggedin => {});
            window.location.assign('/user/' + this.state.email)
        })
    };

    updateSkills = (event) => {
        if(this.state.skills.includes(event.target.name)) {
            this.state.skills.splice(this.state.skills.indexOf(event.target.name), 1);
        } else {
            this.state.skills.push(event.target.name);
        }
    };

    updateInterests = (event) => {
        if(this.state.topics.includes(event.target.name)) {
            this.state.topics.splice(this.state.topics.indexOf(event.target.name), 1);
        } else {
            this.state.topics.push(event.target.name);
        }
    }

    renderCreate = (update) => {
        if(update) {
            return(
                <div>
                    <button onClick={this.updateProfile}>Update Profile</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.createProfile}>Create Profile</button>
                </div>
            )
        }
    };

    render() {
        if(!this.state.secondStep) {
            return (
                <div className="container">
                    <h1 className="center">Create an account</h1>
                    <h2>Basic information</h2>
                    <form>
                        <label>
                          <p>Full name</p>
                          <input type='text' placeholder='Full Name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
                        </label>
                        <label>
                          <p>Email</p>
                          <input type='email' placeholder='Email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
                        </label>
                        <label>
                          <p>Password</p>
                          <input type='password' placeholder='Password' onChange={(event) => this.setState({p1: event.target.value})}/>
                        </label>
                        <label>
                          <p>Confirm password</p>
                          <input type='password' placeholder='Confirm Password' onChange={(event) => this.setState({p2: event.target.value})}/>
                        </label>
                    </form>
                    <br/>
                    <button onClick={this.nextStep}>Next</button>
                </div>
            )
        } else {
            return (
                //   skills: ["list", "of", "skills"],
        //   lookingForProjects: true or false,
        //   projInterests: ['list', 'of', 'interests'],
        //   maxProjectDuration: max duration or -1 if no preference,
        //   canFund: true or false,
        //   teamSize: number of teammates wanted
                <div className="container">
                  <h1 className="center">Create an account</h1>
                  <h2>Skill and interest information</h2>
                    <p>Check off your skills:</p>
                    <div id='skills-div'>
                        {this.possibleSkills.map((skill, key) => {
                            return(
                                <label key={key} className='checkbox'>{skill}
                                    <input type="checkbox" defaultChecked={this.state.skills.includes(skill)} name={skill} onChange={this.updateSkills}/>
                                    <span className="checkmark"/>
                                    <div className="accessibility-box"/>
                                </label>
                            )
                        })}
                    </div>
                    <p>Check off the topics that interest you:</p>
                    <div id='topics-div'>
                        {this.possibleTopics.map((topic, key) => {
                            return(
                                <label key={key} className='checkbox'>{topic}
                                    <input type="checkbox" defaultChecked={this.state.topics.includes(topic)} name={topic} onChange={this.updateInterests}/>
                                    <span className="checkmark"/>
                                    <div className="accessibility-box"/>
                                </label>
                            )
                        })}
                    </div>
                    <label>
                        <p>Maximum duration you can spend on a project (in days):</p>
                        <input type="number" value={this.state.duration} onChange={(event) => {this.setState({duration: event.target.value})}} id="duration"/>
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.funding} onChange={(event) => this.setState({funding: event.target.value})} id="isFunded"/>
                        <span className="checkmark"/>
                        <div className="accessibility-box"/>
                        I can provide funding to a project
                    </label>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={this.state.looking} onChange={(event) => {this.setState({looking: event.target.checked})}} id="isFunded"/>
                        <span className="checkmark"/>
                        <div className="accessibility-box"/>
                        I am available to work on a project
                    </label>
                    <label>
                        <p>How many people would you like to work with:</p>
                        <input type="number" value={this.state.teamSize} onChange={(event) => this.setState({teamSize: event.target.value})} id="membersNeeded"/>
                    </label>

                  <br/>
                    {this.renderCreate(this.props.location.state)}
                      <br/>
                        <br/>

                </div>
            )
        }
    }
}

export default CreateUser;
