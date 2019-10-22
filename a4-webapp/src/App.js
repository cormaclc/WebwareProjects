import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Header from "./Header/Header";
import {fetchBeats} from "./redux/actions";
import BeatsContainer from "./Beat/BeatsContainer";

class App extends Component {

  componentDidMount() {
      this.props.dispatch(fetchBeats());
  }

  render() {
    return (
      <div className="App">
          <Header/>
          <BeatsContainer beats={this.props.beats}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    beats: state.beats,
});

export default connect(mapStateToProps)(App);
