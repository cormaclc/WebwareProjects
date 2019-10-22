import React, {Component} from 'react';
import '../styles/projectpreview.css'

class ProjectPreview extends Component {
    constructor(props) {
        super(props);

        this.projectClicked = this.projectClicked.bind(this);
    }

    isOverflowing(element) {
        return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth
    }

    componentDidMount() {
        let paragraphs = [this.name, this.description];
        paragraphs.forEach((p) => {
            if (this.isOverflowing(p)) {
                // Element is overflowing
                let text = p.textContent;
                let trimmed = "";
                let index = 0;
                p.textContent = "";
                while(!this.isOverflowing(p)) {
                    trimmed += text[index] || " ";
                    p.textContent = trimmed + "...";
                    index++;
                }
                if (trimmed.length > 0) p.textContent = trimmed.substring(0, trimmed.length - 1) + "...";
            }
        });
    }

    projectClicked () {
        console.log(`Navigate to ${this.props.project.id} page`)
    }

    render() {
        let skills = this.props.project.skills.map((skill) => {return <div key={skill} onClick={() => this.props.skillClicked(`${skill}`)} className={"skill-preview"}>{skill}</div>});
        return (
            <div className={"project-preview"}>
                <p ref={(name) => {this.name = name}} className={"project-name-preview"} onClick={this.projectClicked}>{this.props.project.name}</p>
                <div ref={(description) => {this.description = description}} className={"project-description-preview"} dangerouslySetInnerHTML={{__html: this.props.project.description}}></div>
                {skills}
            </div>
        )
    }
}
export default ProjectPreview;
