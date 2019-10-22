import React, {Component} from 'react';
import '../styles/search.css'
import ProjectAPI from '../ProjectAPI';

class Search extends Component {
    constructor () {
        super();
        this.state = {
            projects: [],
            queryResults: []
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.skillClicked = this.skillClicked.bind(this);
    }

    // Fetch projects after first mount
    componentDidMount() {
        this.getProjects();
        document.getElementById('search-bar').focus();
    }

    getProjects = () => {
        // Get the projects and store them in state
        ProjectAPI.getAll(projects => this.setState({ projects, queryResults: projects }));
    }

    handleKeyPress (e) {
        let query = document.querySelector("#search-bar-container input").value;
        this.filterProjects(query.toLowerCase());
        // if (e.key === 'Enter') {
        //     console.log(query);
        // }
    }

    skillClicked (event, skill) {
        event.stopPropagation();
        document.querySelector("#search-bar").value = skill;
        this.filterProjects(skill.toLowerCase());
    }

    filterProjects (query) {
        let matchingProjects = [];
        this.state.projects.forEach((project) => {
            if (project.name.toLowerCase().includes((query))) {
                matchingProjects.push(project);
            } else if (project.description.toLowerCase().includes(query)){
                matchingProjects.push(project);
            } else {
                let skillsContain = project.skills.some((skill) => {
                    return skill.toLowerCase().includes(query);
                });

                if (skillsContain) {
                    matchingProjects.push(project);
                } else {
                    let topicsContain = project.topics.some((topic) => {
                        return topic.toLowerCase().includes(query);
                    });

                    if (topicsContain) matchingProjects.push(project);
                }
            }
        })
        this.setState({queryResults: matchingProjects});
    }

    loadProject(id) {
        // console.log(`Navigate to ${id} page`); // TODO: window.location.href
        window.location.href = "/projects/" + id;
    }

    render() {
        let projects = this.state.queryResults.map((project, index) =>
            <div className="project" key={index} tabIndex={index+100} onClick={() => this.loadProject(project.id)}>
                <div className="project-header">
                    <h2 className="project-name">{project.name}</h2>
                </div>
                <div className="project-topics">
                    {project.topics.map((topic, tpcIdx) => <p onClickCapture={(event) => this.skillClicked(event, topic)} className="project-topic" key={tpcIdx}>{topic}</p>)}
                    {project.skills.map((skill, skillIdx) => <p onClickCapture={(event) => this.skillClicked(event, skill)} className="project-skill" key={skillIdx}>{skill}</p>)}
                </div>
                <div className="project-description" dangerouslySetInnerHTML={{__html: project.description}}></div>
                <div className="project-footer">
                    <div className="project-membersNeeded">
                        <img src={"/person.svg"} height="16px" alt="People"/>
                        <p>{project.membersNeeded}</p>
                    </div>
                    {project.isFunded ? <p className="project-funded">$</p> : ""}

                    <p className="project-date">{project.startTime} &bull; {project.duration} days</p>
                    <p className="project-email">{project.email}</p>
                </div>
            </div>
        );

        return (
            <div id={"search-container"}>
                <div id={"search-bar-container"}>
                    <label className="container">
                      <input id={"search-bar"} type="text" placeholder={"Type to search..."} onChange={this.handleKeyPress}/>
                    </label>
                </div>
                <div className="container">
                    {projects.length > 0 ? <p className={"results"}>{this.state.queryResults.length} results</p> : null}
                    {projects.length > 0 ? projects : <p className={"no-results"}>No Results Found</p>}
                </div>
            </div>
        )
    }
}
export default Search;
