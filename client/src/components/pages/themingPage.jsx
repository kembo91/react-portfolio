import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ColorPickerCard from "../forms/colorPicker";
import api from "../../api";
import ColorMind from "../forms/colorMind";

class ThemingPage extends Component {
  state = {
    theme: {
      "--bgcolor": "#4e5e6d",
      "--textcolor": "#d9bd89",
      "--menucolor": "#96939d",
      "--hlcolor": "#527ea8",
    },
    active: "--bgcolor",
  };

  handleFetchColormind = () => {
    api.user.color().then((theme) => {
      this.setState({ theme });
      this.changeTheme();
    });
  };

  changeTheme = () => {
    Object.keys(this.state.theme).map((key) => {
      document.documentElement.style.setProperty(key, this.state.theme[key]);
    });
  };

  handleChangeComplete = (item) => (color) => {
    this.setState({
      theme: { ...this.state.theme, [item]: color.hex },
    });
    this.changeTheme();
  };

  changeActive = (value) => {
    console.log(value);
    this.setState({ ...this.state, active: value });
  };

  handleSelect = (eventKey) => {
    switch (eventKey) {
      case "Background":
        this.changeActive("--bgcolor");
        break;
      case "Menu":
        this.changeActive("--menucolor");
        break;
      case "Highlight":
        this.changeActive("--hlcolor");
        break;
      case "Text":
        this.changeActive("--textcolor");
        break;
    }
  };

  render() {
    const { active } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col>
            <ColorPickerCard
              title="Background color"
              onChangeComplete={this.handleChangeComplete(active)}
              onSelectColor={this.handleSelect}
              color={this.state.theme[active]}
            />
          </Col>
          <Col>
            <p>
              I'm not a designer, which means that choosing colors is not my
              thing. I'm a developer, so I give this choice to you.
            </p>
            <p>
              Elements of this website consist of 4 customizable colors. Feel
              free to change them manually or fetch generated color pallette
              from <a href="http://colormind.io">colormind.io</a>
            </p>
          </Col>
          <Col>
            <ColorMind onFetchColormind={this.handleFetchColormind} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ThemingPage;
