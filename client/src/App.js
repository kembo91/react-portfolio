import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";
import ThemingPage from "./components/pages/themingPage";
import { loadReCaptcha } from "react-recaptcha-google";
import Footer from "./components/shared/footer";

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
      case "theme":
        return <ThemingPage />;
      default:
        return <Aboutme />;
    }
  };

  componentDidMount() {
    loadReCaptcha();
  }
  //className="d-flex align-items-center">
  render() {
    const active = this.state.active;
    return (
      <div>
        <p className="title">GALI-KETEMA MBOGO</p>
        <NavBar onClick={this.onClick} />
        {this.renderBlock(active)}
        <Footer className="fixed-bootom" />
      </div>
    );
  }
}

export default App;
