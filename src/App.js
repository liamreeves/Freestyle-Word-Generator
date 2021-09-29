import "./App.css";
import React from "react";
import ReactPlayer from "react-player";
import Promt from "./Promt";

// Bootstrap Imports
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import ReactBootstrapSlider from "react-bootstrap-slider";

const beats = require("./beats");

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
      url: "",
      urls: beats.beatsArray,
    };

    randomWords = require("random-words");
  }

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
  addToPlaylist = (e) => {
    e.preventDefault();
    const newUrl = e.target.url.value;
    const newArray = Array(newUrl);
    this.setState({
      url: "",
      urls: this.state.urls.concat(newArray),
      playlistEmpty: false,
    });
  };

  // Clear embedded YouTube playlist
  clearPlaylist = () => {
    this.setState({ urls: [], playlistEmpty: true });
  };

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
      <Container fluid className="App d-flex flex-column">
        <Promt />

        <h1> {this.state.word.toUpperCase()} </h1>

        <Row className="">
          <Col className="d-flex flex-column justify-content-around bg-secondary">
            <div>
              <Row>
                <h2>TIMER</h2>
              </Row>

              <Row>
                <Col>
                  <ReactBootstrapSlider
                    name="timer"
                    min={1}
                    max={120}
                    step={1}
                    slideStop={this.handleTimerChange}
                    value={this.state.timer}
                    type="number"
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
              </Row>
            </div>

            <Row>
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
                <Row className="d-flex justify-content-around">
                  <Col>
                    <h2>Word Amount</h2>

                    <input
                      className="w-25"
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
                      className="w-25"
                      min={2}
                      max={20}
                      name="wordLength"
                      onChange={this.handleChange}
                      value={this.state.wordLength}
                      type="number"
                    />
                  </Col>
                </Row>
              </Col>

              <Container>
                <Button
                  onClick={this.clearPlaylist}
                  variant="danger"
                  type="button"
                  className="m-3"
                >
                  Clear Playlist
                </Button>

                <Button
                  onClick={this.clearWord}
                  variant="warning"
                  type="button"
                  className="m-3"
                >
                  Clear Word
                </Button>
              </Container>
            </Row>
          </Col>

          <Col className="bg-dark no-gutters">
            {this.state.playlistEmpty ? (
              <h1>Add a YouTube link</h1>
            ) : (
              <ReactPlayer
                key={this.state.urls}
                url={this.state.urls}
                controls={true}
                className="mx-auto"
                style={{ maxWidth: "90vw" }}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
