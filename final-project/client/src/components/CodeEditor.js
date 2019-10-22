import React, {Component} from 'react';
// import { render } from 'react-dom';
// import brace from 'brace';
import AceEditor from 'react-ace';
import renderHTML from 'react-render-html';
import SplitPane from 'react-split-pane';
import sanitizeHtml from 'sanitize-html';

import 'brace/mode/html';
import 'brace/theme/github';
import '../styles/codeeditor.css';

class CodeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorText: `<!--Type your code here and see a preview rendered to the right-->\n<!--For safety, script and style tags have been disabled-->\n<a style="color: crimson;" href='https://github.com'>GitHub</a>`,
            renderText: ``,
            wrapEditor: true
        }
        this.onChange = this.onChange.bind(this);
        this.movedDivider = this.movedDivider.bind(this);
    }

    sanitizeStyles(dirty) {
        let clean = sanitizeHtml(dirty, {
            allowedAttributes: {
                '*' : ["style"]
            },
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1'])
        });
        return clean;
    }

    getRenderText() {
        return this.state.renderText;
    }

    onChange(newValue) {
        this.setState({editorText: newValue, renderText: `${this.sanitizeStyles(newValue)}`});
    }

    componentDidMount() {
        let body = document.querySelector("body");
        body.style.background = 'white';

        let splitPane = document.querySelector(".SplitPane");
        splitPane.style.overflow = "auto";
        splitPane.style.position = "relative";

        this.setState({renderText: `${this.sanitizeStyles(this.state.editorText)}`});
    }

    movedDivider() {
        this.setState({wrapEditor: false});
        this.setState({wrapEditor: true});
    }

    render() {
        return (
            <SplitPane split="vertical" maxSize="90vw" defaultSize="50%" onDragFinished={this.movedDivider}>
                <div id={'code-editor'}>
                    <AceEditor
                        mode="html"
                        height="500px"
                        width="100%"
                        theme="github"
                        onChange={this.onChange}
                        name="editor"
                        wrap="true"
                        showPrintMargin={false}
                        wrapEnabled={this.state.wrapEditor}
                        value={this.state.editorText}
                        editorProps={{$blockScrolling: true}}
                    />
                </div>
                <div id={'code-render'}>
                    {renderHTML(this.state.renderText)}
                </div>
            </SplitPane>
        )

    }
}
export default CodeEditor;
