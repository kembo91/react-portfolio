import React, { Component } from "react";

class ThemingPage extends Component {
  state = {
    theme: {
      "background-color": "4E5E6D",
      "text-color": "4E5E6D",
      "button-color": "D9BD89",
      "container-color": "FAFBFA",
      "menu-color": "96939D",
    },
  };
  render() {
    return <h1>Theming Page</h1>;
  }
}

export default ThemingPage;
