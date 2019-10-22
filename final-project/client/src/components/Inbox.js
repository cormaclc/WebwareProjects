import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Message from './Message';
import MessageAPI from '../MessageAPI';
import '../styles/inbox.css'

class Inbox extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                // {
                //     id: "1",
                //     sender: "John",
                //     recipient: "Al",
                //     subject: "Sample Project",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/4/2018"
                // },
                // {
                //     id: "2",
                //     sender: "Greg",
                //     recipient: "Al",
                //     subject: "Front-end Developer for Sample Project",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/5/2018"
                // },
                // {
                //     id: "3",
                //     sender: "Really long username that should be truncated",
                //     recipient: "Al",
                //     subject: "This is a really long subject that should be truncated",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/1/2018"
                // },
                // {
                //     id: "4",
                //     sender: "Greg",
                //     recipient: "Al",
                //     subject: "2 Front-end Developer for Sample Project",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/15/2018"
                // },
                // {
                //     id: "5",
                //     sender: "Greg",
                //     recipient: "Al",
                //     subject: "3 Front-end Developer for Sample Project",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/7/2018"
                // },
                // {
                //     id: "6",
                //     sender: "Greg",
                //     recipient: "Al",
                //     subject: "4 Front-end Developer for Sample Project",
                //     body: "Aliquam porta at arcu in suscipit. Aliquam ullamcorper, libero at aliquet viverra, sapien mauris lobortis purus, vitae suscipit massa velit quis purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue turpis vitae efficitur pulvinar. Aliquam nec facilisis erat, sed vehicula nunc. Duis tempus dui metus, ac iaculis ipsum malesuada eget. Nunc congue diam lectus, sed tempus orci vehicula nec. Pellentesque metus nibh, lobortis vel urna eget, semper fringilla odio. Etiam vestibulum congue eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                //     timestamp: "10/5/2018"
                // },
                // {
                //     id: "7",
                //     sender: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
                //     recipient: "Al",
                //     subject: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
                //     body: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
                //     timestamp: "10/25/2018"
                // },
            ],
            defaultRecip: "",
            defaultSubj: "",
            displayedMessage: undefined,
            compose: false
        }
        this.displayMessage = this.displayMessage.bind(this);
        this.displayComposeForm = this.displayComposeForm.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.discardMessage = this.discardMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount () {
        MessageAPI.getAll((res) => {
            console.log(res);
            // TODO: filter messages to reflect the authenticated user
            this.setState({messages: res.filter((message) => message.recipient === localStorage.getItem('user-email'))});
            // this.setState({messages: res});
            if(this.props.location.state) {
                this.setState({compose: true, defaultRecip: this.props.location.state.recipient, defaultSubj: this.props.location.state.subject})
            }
        });
    }

    displayMessage (id) {
        const index = this.state.messages.map(message => message.id).indexOf(id)
        if (index > -1) {
            this.setState({
                displayedMessage: this.state.messages[index],
                compose: false
            });
        }
    }

    deleteMessage (id) {
        const index = this.state.messages.map(message => message.id).indexOf(id)
        if (index > -1) {
            let id = this.state.messages[index].id;
            // Don't display message if it is getting deleted
            if(this.state.displayedMessage.id === id) {
                this.setState({displayedMessage: undefined});
            }

            MessageAPI.remove(id, (res) => {
                if (res.didRemove) {
                    this.setState({
                        messages: this.state.messages.filter((_, i) => i !== index)
                    });
                }
            });
        }
    }

    displayComposeForm () {
        this.setState({compose: true})
    }

    discardMessage () {
        this.setState({compose: false});
    }

    sendMessage () {
        let fields = document.querySelector("#compose-container");
        console.log(fields);
        let recipient = fields.querySelector("input[name='recipient']").value;
        let subject = fields.querySelector("#subject-field").value;
        let body = fields.querySelector("textarea").value;
        MessageAPI.create({recipient, subject, body, sender: localStorage.getItem('user-email'), time: new Date(Date.now())}, () => {
            this.setState({compose: false});
        });
    }

    formatDate (date) {
        let d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }

    formatTime (date) {
        let d = new Date(date);
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    render() {
        const messages = [].concat(this.state.messages)
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map((message) =>
                <Message key={message.id} message={message} date={this.formatDate(message.time)}
                         deleteMessage={this.deleteMessage} displayMessage={this.displayMessage}/>
            );

        return (
            <div id={"inbox"}>
                <a onClick={this.displayComposeForm} id={"compose-button"}><FontAwesomeIcon icon={"plus"}/><span id={"compose-text"}>Compose</span></a>
                <div id={"message-block-container"}>
                    <p id={"inbox-text"}>Message Inbox</p>
                    <div id={"message-container"}>
                        {messages}
                    </div>
                    <div id={"message-display-container"}>
                        {
                            this.state.compose ?
                                <div id={"compose-container"}>
                                    <label>
                                      <p>Recipient</p>
                                      <input className={"text"} type={"text"} tabIndex={3000} name={"recipient"} defaultValue={this.state.defaultRecip}/>
                                    </label>
                                    <label>
                                      <p>Subject</p>
                                      <input id={"subject-field"} className={"text"} type={"text"} tabIndex={3001} defaultValue={this.state.defaultSubj}/>
                                    </label>
                                    <label>
                                      <p>Message body</p>
                                      <textarea className={"text"} rows="8" tabIndex={3002}/>
                                    </label>
                                    <br/>
                                    <bottom onClick={this.sendMessage} className={"send button"} tabIndex={3003}>Send</bottom>
                                    <bottom onClick={this.discardMessage} className={"discard button"} tabIndex={3004}>Discard</bottom>
                                </div>
                                : this.state.displayedMessage ? <div>
                                    <div className={"message-subject"}>{this.state.displayedMessage.subject}</div>
                                    <div className={"break"}></div>
                                    <div className={"message-sender"}><span className={"from-span"}>From:</span>{this.state.displayedMessage.sender}</div>
                                    <div className={"message-date"}>
                                        {`${this.formatDate(this.state.displayedMessage.time)}, ${this.formatTime(this.state.displayedMessage.time)}`}
                                    </div>
                                    <div className={"message-body"}>{this.state.displayedMessage.body}</div>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Inbox;
