import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";

class App extends Component {
  state = {
    active: "aboutme"
  };

  onClickHome = () => {
    this.setState({ active: "aboutme" });
  };

  onClickResume = () => {
    this.setState({ active: "resume" });
  };

  onClickContact = () => {
    this.setState({ active: "contact" });
  };

  renderBlock = active => {
    switch (active) {
      case "aboutme":
        return <Aboutme />;
      case "resume":
        return <ResumePage />;
      case "contact":
        return <ContactPage />;
      default:
        return <Aboutme />;
    }
  };

  render() {
    const active = this.state.active;
    return (
      <div>
        <NavBar
          onClickHome={this.onClickHome}
          onClickContact={this.onClickContact}
          onClickResume={this.onClickResume}
        />
        {this.renderBlock(active)}
      </div>
    );
  }
}

export default App;
