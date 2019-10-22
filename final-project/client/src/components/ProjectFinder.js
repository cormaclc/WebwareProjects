import React, {Component} from 'react';
import '../styles/search.css'
import Search from './Search'
import Authenticator from "../Authentication"
import RecommendedProjects from '../RecommendedProjects/RecommendedProjects'

class ProjectFinder extends Component {
    constructor () {
        super();
        this.state = {
            onSearch: true
        }
    }

    componentDidMount() {
    }


    render() {
      let loggedIn = Authenticator.getCurrentUserID() !== null;

      return (
            <div id={"finder-container"}>
                <div id={"search-tabs"}>
                  <h1 className={this.state.onSearch ? "active" : ""} onClick={event => this.setState({onSearch: true})}>Search</h1>
                  {loggedIn ? <h1 className={!this.state.onSearch ? "active" : ""} onClick={event => this.setState({onSearch: false})}>Recommended</h1> : ""}
                </div>
                <div id={"finder-content"}>
                  {this.state.onSearch ? <Search></Search> : <RecommendedProjects></RecommendedProjects>}
                </div>
            </div>
        )
    }
}
export default ProjectFinder;
