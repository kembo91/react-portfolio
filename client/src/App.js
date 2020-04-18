import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";
import { loadReCaptcha } from "react-recaptcha-google";

class App extends Component {
  state = {
    active: "aboutme",
  };

  onClick = (value) => {
    this.setState({ ...this.state, active: value });
  };

  renderBlock = (active) => {
    switch (active) {
      case "resume":
        return <ResumePage />;
      case "contact":
        return <ContactPage />;
      default:
        return <Aboutme />;
    }
  };

  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    const active = this.state.active;
    return (
      <div>
        <NavBar onClick={this.onClick} />
        {this.renderBlock(active)}
      </div>
    );
  }
}

export default App;
