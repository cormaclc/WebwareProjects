import React from 'react'
import './ProjectCreationForm.css';
import Authenticator from '../Authentication'
import ProjectAPI from '../ProjectAPI'
import CodeEditor from "../components/CodeEditor"

class ProjectCreationForm extends React.Component {
    constructor(props) {
        super(props);

        this.possibleSkills = [] // TODO: load from server
        this.possibleTopics = [] // TODO: load from server

        // TODO: put project information here
        this.state = {
          email: '',
          projectname: '',
          skills: [],
          topics: [],
          startTime: '',
          duration: undefined,
          isFunded: false,
          membersNeeded: undefined
        };

        this.editor = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSkillChange = this.handleSkillChange.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      var obj = {};
      obj[event.target.id] = event.target.value;
      this.setState(obj);
    }

    handleToggle(event){
      var obj = {};
      obj[event.target.id] = event.target.checked;
      this.setState(obj);
    }

    handleTopicChange(event){
      var topics = this.state.topics;
      if (!event.target.checked){
        var idx = topics.indexOf(event.target.value);
        if (idx === -1){
          return;
        }
        topics.splice(idx, 1)
      } else {
        topics.push(event.target.value)
      }
      this.setState({'topics': topics})
    }

    handleSkillChange(event){
      var skills = this.state.skills;
      if (!event.target.checked){
        var idx = skills.indexOf(event.target.value);
        if (idx === -1){
          return;
        }
        skills.splice(idx, 1)
      } else {
        skills.push(event.target.value)
      }
      this.setState({'skills': skills})
    }

    handleSubmit(event) {
      var project = this.state;
      project.name = project.projectname;
      delete project.projectname;
      project.description = this.editor.current.getRenderText();
      ProjectAPI.create(this.state, project => {
        // TODO: let the user know
        window.location.href = "/";
      });
      event.preventDefault();
    }

    componentDidMount() {
        fetch('/api/skills')
          .then(res => res.json())
          .then(json => {
            this.possibleSkills = json;
            this.setState({})
          });

        fetch('/api/topics')
          .then(res => res.json())
          .then(json => {
            this.possibleTopics = json;
            this.setState({})
          });

          if (Authenticator.getCurrentUserID() === null){
            alert('You are not authorized to create projects.');
            window.location.href = "/";
          }

          // console.log(Authenticator.getCurrentUserEmail());
          this.setState({ // TODO: send the user id to verify they can create a project
            email: Authenticator.getCurrentUserEmail()
          })
    }



    render() {

      // TODO: link the CodeEditor to the description property...

        return(
            <div id='project-form-wrapper'>
              <form onSubmit={this.handleSubmit}>
                <h1 className="center">Create a project</h1>
                <section id="project-details">
                  <div className="container">
                    <h2>Project details</h2>
                    <p>Owner: {this.state.email}</p>
                    <label>
                      <p>Project name:</p>
                      <input type="text" value={this.state.projectname} onChange={this.handleChange} id="projectname" />
                    </label>
                    <label>
                      <p>Project description:</p>
                      <div id="create-code-editor">
                        <CodeEditor ref={this.editor}></CodeEditor>
                      </div>
                    </label>
                    <br/>
                    <p className="checkbox-field-title">Topic(s):</p>
                    <div id="topics-div">
                      {this.possibleTopics.map((topic, index) =>
                          <label key={index} className="checkbox">
                            <input type="checkbox" onChange={this.handleTopicChange} value={topic}/>
                            <span className="checkmark"></span>
                            <div className="accessibility-box"></div>
                            {topic}
                          </label>
                      )}
                    </div>

                    <label>
                      <p>Start date:</p>
                      <input type="date" onChange={this.handleChange} value={this.state.startTime} id="startTime"/>
                    </label>
                    <label>
                      <p>Duration (in days):</p>
                      <input type="number" onChange={this.handleChange} value={this.state.duration} id="duration"/>
                    </label>
                  </div>
                </section>

                <section id="project-requirements">
                  <div className="container">
                    <h2>Project requirements</h2>
                    <label>
                      <p>Target team size:</p>
                      <input type="number" onChange={this.handleChange} value={this.state.membersNeeded} id="membersNeeded"/>
                    </label>
                    <br/>
                    <label className="checkbox">
                      <input type="checkbox" onChange={this.handleToggle} value={this.state.isFunded} id="isFunded"/>
                      <span className="checkmark"></span>
                      <div className="accessibility-box"></div>
                      Funding by members required
                    </label>
                    <br/>
                    <p className="checkbox-field-title">Skills required:</p>
                    <div id="skills-div">
                      {this.possibleSkills.map((skill, index) =>
                          <label key={index} className="checkbox">
                            <input type="checkbox" onChange={this.handleSkillChange} value={skill}/>
                            <span className="checkmark"></span>
                            <div className="accessibility-box"></div>
                            {skill}
                          </label>
                      )}
                    </div>
                  </div>
                </section>

                <section id="submit">
                  <div className="container">
                    <input type="submit" value="Create project" />
                  </div>
                </section>

              </form>
            </div>
        )
    }
}

export default ProjectCreationForm
