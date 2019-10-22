import React from 'react';
import ProjectAPI from "../ProjectAPI";
import '../styles/project.css';
import '../User/user_styles.css';
import NotFound from "./NotFound";
import {Link} from "react-router-dom";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {skills: [], loading: true};
    }

    componentDidMount() {
        const id = this.props.match.params.projid;
        ProjectAPI.get(id, project => {
            project.loading = false
            this.setState(project)
        });
    }

    renderFunding = (funded) => {
        if(funded) {
            return (
                <div>
                    <p className='section-title'>Funding Status:</p>
                    <p>{this.state.name} needs team members to help fund.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p className='section-title'>Funding Status:</p>
                    <p>{this.state.name} is fully funded.</p>
                </div>
            )
        }
    };

    /*
	"email": "USER EMAIL",
  "topics": ["list", "of", "topics"],
  "id": "SET BY SERVER"*/

    renderSendMessage = (email) => {
        if(email !== localStorage.getItem("user-email")) {
            return (
                <Link  to={{ pathname: "/inbox", state: {subject: this.state.name, recipient: this.state.email}}}><button>Send Message</button></Link>
            )
        } else {
            return (
                <React.Fragment/>
            )
        }
    }

    render() {
        if(this.state.loading) {
            return(
                <div>
                    Loading...
                </div>
            )
        } else if(!this.state.name) {
            return (
                <React.Fragment>
                    <NotFound/>
                </React.Fragment>
            )
        } else {
            return (
                <div id='project-wrapper' className='container'>
                    <p id='name'>{this.state.name}</p>
                    <div id='desc' dangerouslySetInnerHTML={{__html: this.state.description}}></div>
                    <p className='section-title'>Skills needed:</p>
                    <div className='list-display chip-field'>
                        {this.state.skills.map((skill, key) =>
                            <p key={key} className='skill-item chip'>{skill}</p>
                        )}
                    </div>
                    <p className='section-title'>Team Members:</p>
                    <p>We need {this.state.membersNeeded} team members for this project.</p>
                    {this.renderFunding(this.state.isFunded)}
                    <p className='section-title'>Time Commitment:</p>
                    <p>This project starts on {this.state.startTime}.</p>
                    <p>It will take {this.state.duration} days.</p>
                    <p className='section-title'>Contact the Creator:</p>
                    <p>{this.state.email}</p>
                    {this.renderSendMessage(this.state.email)}
                </div>
            )
        }

    }
}

export default Project;
