import React, { Component } from "react";
import Piano from "./Piano.js";
import {
  initLrs,
  saveStatement,
  saveAttachments,
  saveCompletion,
  saveActivityState,
  retrieveActivityState,
} from "@openlearning/xapi";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: null,
      lrsConfig: null,
      taskCompletion: false,
      userName: null,
    };

    this.props
      .fetchNextNote()
      .then((data) => {
        this.setState({ currentNote: data.note });
      })
      .catch((err) => {
        this.setState({ error: "Unable to connect to the server" });
      });
  }

  onPress = (octave, keyNames) => {
    this.props.checkAnswer(keyNames).then((data) => {
      console.log(data);
      if (data === true) {
        console.log("Correct answer chosen. Marking as complete!");
        this.setState({ taskCompletion: true });
        saveCompletion(this.state.lrsConfig);
      }
    });
  };

  getNote() {
    return this.state.currentNote.replace("#", "♯").replace("b", "♭");
  }

  getLrsConfig() {
    const lrsConfig = initLrs();
    this.setState({ lrsConfig: lrsConfig });
    this.setState({ userName: lrsConfig.actor.name });
    console.log("LRS Config data:");
    console.table(lrsConfig);
  }

  componentDidMount() {
    this.getLrsConfig();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.error ? `An error occurred: ${this.state.error}` : null}
          {this.state.currentNote ? (
            <div className="App-note-name-display">{this.getNote()}</div>
          ) : (
            <div className="App-note-loading">loading...</div>
          )}
          When a note appears above, play the corresponding note on the piano
          keyboard.
        </header>
        <Piano numOctaves={3} onPress={this.onPress} />
        <div className="User-greeting">
          <h1 className="User-greeting-message">{`Hi, ${this.state.userName}`}</h1>
        </div>
        <div className="Task-completion">
          {this.state.taskCompletion && (
            <h2 className="Task-completion-message">
              Congratulations, you pressed the right key and completed the
              assignment !
            </h2>
          )}
        </div>
        <div className="LRS-config-data">
          <h3>LRS config data:</h3>
          {JSON.stringify(this.state.lrsConfig)}
        </div>
      </div>
    );
  }
}

export default App;
