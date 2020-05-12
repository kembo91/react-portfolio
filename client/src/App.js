import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";
import ThemingPage from "./components/pages/themingPage";
import { loadReCaptcha } from "react-recaptcha-google";
import Footer from "./components/shared/footer";
import DocumentTitle from "react-document-title";

class App extends Component {
  state = {
    active: "aboutme",
  };

  onClick = (value) => {
    this.setState({ ...this.state, active: value });
  };

  renderBlock = (active) => {
    switch (active) {
      case "Resume":
        return <ResumePage />;
      case "Contact":
        return <ContactPage />;
      case "Theme":
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
      <DocumentTitle title="Gali-Ketema Mbogo">
        <div className="content-wrap">
          <p className="title">GALI-KETEMA MBOGO</p>
          <NavBar onClick={this.onClick} />
          {this.renderBlock(active)}
          <Footer className="fixed-bootom" />
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
