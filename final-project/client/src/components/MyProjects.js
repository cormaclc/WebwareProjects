import React from 'react'
import '../styles/myprojects.css';
// import ProjectIcon from './project.svg'
import Authenticator from '../Authentication'
import ProjectAPI from '../ProjectAPI'

class MyProjects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          email: '',
          projects: []
        };
    }

    componentDidMount() {

      if (Authenticator.getCurrentUserID() === null){
        alert('You are not authorized to be here.');
        window.location.href = "/";
      }

      this.getProjects();

    }

    loadProject(id){
      window.location.href = "/projects/" + id;
    }

    getProjects(){
      ProjectAPI.getAll(projects => {
        var p = projects.filter(project => project.email === Authenticator.getCurrentUserEmail());
        this.setState({
          projects: p,
          email: Authenticator.getCurrentUserEmail()
        })
      })
    }

    deleteProject(event, id){
      ProjectAPI.remove(id, res => {
        this.getProjects();
      })
      event.stopPropagation();
    }

    render() {
        return(
            <div id='my-projects-wrapper'>
              <div className="container">
                {
                  !this.state.projects.length ?
                    <div className="project-empty-state">
                      No projects found.
                    </div>
                  : ""
                }
                {
                  this.state.projects.map((project, index) =>
                    <div className="project" key={index} tabIndex={index+100} onClick={() => this.loadProject(project.id)}>
                      <div className="project-header">
                        <h2 className="project-name">{project.name}</h2>
                        <button onClick={(e) => this.deleteProject(e, project.id)}>DELETE</button>
                      </div>
                      <div className="project-topics">
                        {project.topics.map((topic, tpcIdx) => <p className="project-topic" key={tpcIdx}>{topic}</p>)}
                        {project.skills.map((skill, skillIdx) => <p className="project-skill" key={skillIdx}>{skill}</p>)}
                      </div>
                      <div className="project-description" dangerouslySetInnerHTML={{__html: project.description}}></div>
                      <div className="project-footer">
                        <div className="project-membersNeeded">
                          <img src={"/person.svg"} height="16px" alt="People"/>
                          <p>{project.membersNeeded}</p>
                        </div>
                        {project.isFunded ? <p className="project-funded">$</p> : ""}

                        <p className="project-date">{project.startTime} &bull; {project.duration} days</p>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        )
    }
}

export default MyProjects
