import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/message.css'

class Search extends Component  {
    constructor(props) {
        super(props);

        this.state = {isHovering: false};

        this.handleClick = this.handleClick.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseExit = this.handleMouseExit.bind(this);
    }

    handleClick() {
        this.props.displayMessage(this.props.message.id)
    }

    deleteMessage(e) {
        e.stopPropagation();
        this.props.deleteMessage(this.props.message.id)
    }

    isOverflowing(element) {
        return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth
    }

    handleMouseEnter() {
        this.setState({isHovering: true});
    }

    handleMouseExit() {
        this.setState({isHovering: false})
    }



    componentDidMount() {
        let messages = document.querySelectorAll(".message");
        messages.forEach((message) => {
            if (this.isOverflowing(message)) {
                // Element is overflowing
                let paragraphs = message.querySelectorAll("p")
                for (let i = 0; i < paragraphs.length - 1; i++) {
                    let paragraph = paragraphs[i];
                    if (this.isOverflowing(paragraph)) {
                        let text = paragraph.textContent;
                        let trimmed = "";
                        let index = 0;
                        paragraph.textContent = "";
                        while(!this.isOverflowing(paragraph)) {
                            trimmed += text[index] || " ";
                            paragraph.textContent = trimmed + "...";
                            index++;
                        }
                        if (trimmed.length > 0) paragraph.textContent = trimmed.substring(0, trimmed.length - 1) + "...";
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className={"message"} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
                {this.state.isHovering ?
                    <a onClick={this.deleteMessage} className={"delete-button"}>
                    <FontAwesomeIcon icon={"trash-alt"}/>
                    </a> : null
                }
                <p className={"sender-preview"}>{this.props.message.sender}</p>
                <p className={"subject-preview"}>{this.props.message.subject}</p>
                <p className={"body-preview"}>{this.props.message.body}</p>
                <p className={"date-preview"}>{this.props.date}</p>
            </div>
        )
    }
}
export default Search;
