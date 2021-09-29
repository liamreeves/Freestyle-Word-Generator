import "./index.css";
import React from "react";
import Promt from "./Promt";
import YouTube from "react-youtube";

// Bootstrap Imports
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";


let randomWords = "";
let timeOut = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
      word: "",
      timer: 15,
      wordAmount: 1,
      wordLength: 6,
      timerMills: 15000,
      stop: false,
    };

    randomWords = require("random-words");
  }

  onPlayerReady = (event) => {
    const player = event.target;
    player.loadPlaylist({
      list: "PL0L_zzLQSZ2VqhAvl42s_LMqAlUc7dmXs",
    });
  };

  // Handle user input
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle timer change
  handleTimerChange = (e) => {
    clearTimeout(timeOut);
    this.setState({ timer: e.target.value, timerMills: e.target.value * 1000 });
    if (this.state.on) {
      this.getWords();
    } else return;
  };

  // Generate random words
  getWords = () => {
    clearTimeout(timeOut);
    this.setState({ on: true, stop: false });
    console.log(this.state);
    let currentWord = randomWords({
      exactly: Number(this.state.wordAmount),
      join: " ",
      maxLength: Number(this.state.wordLength),
    });

    this.setState({
      word: currentWord,
    });

    timeOut = setTimeout(() => {
      if (this.state.on === true) {
        let currentWord = randomWords();
        this.setState({ word: currentWord });
        if (this.state.on === true) {
          this.getWords();
        }
      } else {
        clearTimeout(timeOut);
      }
    }, this.state.timerMills);
  };

  // Stop random word generator
  stopWords = () => {
    this.setState({ stop: true, on: false });
    clearTimeout(timeOut);
  };

  // Add song to embedded YouTube playlist
//   addToPlaylist = (e) => {
//     e.preventDefault();
//     const newUrl = e.target.url.value;
//     const newArray = Array(newUrl);
//     this.setState({
//       url: "",
//       urls: this.state.urls.concat(newArray),
//       playlistEmpty: false,
//     });
//   };

  // Clear current word
  clearWord = () => {
    this.setState({ word: "" });
  };

  // Reset state and timer
  componentWillUnmount() {
    this.setState = {};
    clearTimeout(timeOut);
  }

  render() {
    return (
      <div className="App d-flex flex-column">
        <Promt />

        <h1> {this.state.word.toUpperCase()} </h1>

        <div className="flex flex-row">
          <Col className="d-flex flex-column justify-content-around bg-secondary">
            <div>
              <div className="flex flex-row">
                <h2>TIMER</h2>
              </div>

              <div className="flex flex-row">
                <Col>
                  <input
                    type="range"
                    name="timer"
                    min={1}
                    max={120}
                    step={1}
                    value={this.state.timer}
                    onChange={this.handleTimerChange}
                  />
                </Col>

                <Col>
                  <input
                    className="w-50 "
                    min="1"
                    max="120"
                    name="timer"
                    onChange={this.handleTimerChange}
                    value={this.state.timer}
                    type="number"
                  />
                </Col>
              </div>
            </div>

            <div className="flex flex-row">
              <Col>
                <h2>Add YouTube URL to playlist</h2>

                <form onSubmit={this.addToPlaylist}>
                  <input
                    name="url"
                    type="text"
                    value={this.state.url}
                    onChange={this.handleChange}
                  />

                  <Button type="submit" className="m-3">
                    Add
                  </Button>
                </form>
              </Col>

              <Col>
                <Button
                  disabled={this.state.on}
                  className="m-2"
                  variant="success"
                  onClick={this.getWords}
                >
                  Start
                </Button>

                <Button
                  disabled={!this.state.on}
                  className="m-2"
                  variant="light"
                  onClick={this.getWords}
                >
                  New Word
                </Button>

                <Button
                  disabled={!this.state.on}
                  className="m-2"
                  variant="danger"
                  onClick={this.stopWords}
                >
                  Stop
                </Button>
                <div className="flex flex-row justify-around">
                  <Col>
                    <h2>Word Amount</h2>

                    <input
                      min={1}
                      max={5}
                      name="wordAmount"
                      onChange={this.handleChange}
                      value={this.state.wordAmount}
                      type="number"
                    />
                  </Col>

                  <Col>
                    <h2>Max Length</h2>

                    <input
                      className=""
                      min={2}
                      max={20}
                      name="wordLength"
                      onChange={this.handleChange}
                      value={this.state.wordLength}
                      type="number"
                    />
                  </Col>
                </div>
              </Col>
            </div>

            <div className="w-full">
              <Button
                onClick={this.clearWord}
                variant="warning"
                type="button"
                className="m-3"
              >
                Clear Word
              </Button>
            </div>
          </Col>

          <Col className="bg-dark no-gutters">
            {this.state.playlistEmpty ? (
              <h1>Add a YouTube link</h1>
            ) : (
              <YouTube
                key={this.state.urls}
                videoID={"PL0L_zzLQSZ2VqhAvl42s_LMqAlUc7dmXs"}
                controls={true}
                className="mx-auto"
                onReady={this.onPlayerReady}
                style={{ maxWidth: "90vw" }}
              />
            )}
          </Col>
        </div>
      </div>
    );
  }
}

export default App;
