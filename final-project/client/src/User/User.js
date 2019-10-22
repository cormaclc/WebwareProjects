import React from 'react'
import './user_styles.css';
import {Link} from "react-router-dom";
import NotFound from "../components/NotFound";

class User extends React.Component {
    constructor(props) {
        super(props);

        this.user = {};
        this.state = {loading: true}
    }

    componentDidMount() {
        const email = this.props.match.params.userEmail;
        fetch('/api/users/' + email)
            .then(res => res.json())
            .then(json => {
                this.user = json;
                if(!this.user.skills) {
                    this.user.skills = [];
                }
                if(!this.user.projInterests) {
                    this.user.projInterests = [];
                }
                this.setState({loading: false})
            });
    }

    willFund = (fund) => {
        if(fund) {
            return (<p>I am willing to help fund a project.</p>)
        } else {
            return (<p>Unfortunately, I can not help fund a project at this time.</p>)
        }
    };

    renderSkills = (skills) => {
        if(skills.length !== 0) {
            return (
                <div>
                    <p className='section-title'>I'm especially skilled in:</p>
                    <div className='list-display chip-field'>
                        {this.user.skills.map((skill, key) =>
                            <p key={key} className='skill-item chip'>{skill}</p>
                        )}
                    </div>
                </div>
            )
        }
    };

    renderProj = (projs) => {
        if(projs.length !== 0) {
            return (
                <div>
                    <p className='section-title'>My project interests include:</p>
                    <div className='list-display chip-field'>
                        {this.user.projInterests.map((proj, key) =>
                            <p key={key} className='interest-item chip'>{proj}</p>
                        )}
                    </div>
                </div>
            )
        }
    };

    renderEdit = (email) => {
        if(email === this.user.email) {
            return (
                <div>
                    <Link style={{textDecoration: 'none'}} to={{ pathname: "/register", state: this.user}}><button className="success-btn">Edit</button></Link>
                </div>
            )
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else if(!this.user.name) {
            return(
                <React.Fragment>
                    <NotFound/>
                </React.Fragment>
            )
        }
        return (
            <div id='profile-wrapper' className="container">
                <p id='name'>{this.user.name}</p>
                <p className='section-title'>You can find me here:</p>
                <div id='contact-info'>
                    <p className='contact-item'>{this.user.email}</p>
                </div>
                {this.renderSkills(this.user.skills)}
                {this.renderProj(this.user.projInterests)}
                <p className='section-title'>I'm willing to work for:</p>
                <p>{this.user.maxProjectDuration === -1 ? 0 : this.user.maxProjectDuration} days</p>
                <p className='section-title'>Funding: </p>
                {this.willFund(this.user.canFund)}
                <p className='section-title'>Team size:</p>
                <p>I would be willing to work with {this.user.teamSize} people</p>
                {this.renderEdit(localStorage.getItem("user-email"))}
            </div>
        )
    }
}

export default User
