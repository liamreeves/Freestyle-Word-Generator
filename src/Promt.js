import React from "react";

export default class Prompt extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", this.beforeunload.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeunload.bind(this));
  }

  beforeunload(e) {
    if (true) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

  render() {
    return "";
  }
}
