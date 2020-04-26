import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";
import ThemingPage from "./components/pages/themingPage";
import { loadReCaptcha } from "react-recaptcha-google";
import { Container, Row, Col } from "react-bootstrap";

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
      <Container fluid>
        <Row className="justify-content-md-center" id="titleRow">
          <p className="title">GALI-KETEMA MBOGO</p>
        </Row>
        <Row className="justify-content-md-center">
          <h3 className="title">Web developer</h3>
        </Row>
        <Row className="m-4">
          <NavBar onClick={this.onClick} />
        </Row>
        <Row className="container-color">{this.renderBlock(active)}</Row>
      </Container>
    );
  }
}

export default App;
