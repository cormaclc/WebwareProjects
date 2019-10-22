import React from 'react';
import Beat from "./Beat";

class BeatsContainer extends React.Component {
    render() {
        return (
            <div id='main-wrapper'>
                {this.props.beats.map((beat, key) =>
                    <Beat key={key} index={key} beat={beat}/>
                )}
            </div>
        )
    }
}

export default BeatsContainer