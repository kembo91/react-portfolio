import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ColorPickerCard from "../forms/colorPicker";

class ThemingPage extends Component {
  state = {
    theme: {
      backgroundColor: "4E5E6D",
      textColor: "4E5E6D",
      buttonColor: "D9BD89",
      containerColor: "FAFBFA",
      menuColor: "96939D",
    },
  };

  changeTheme = () => {
    document.documentElement.style.setProperty(
      "--bgcolor",
      this.state.theme.backgroundColor
    );
  };

  handleChangeComplete = (item) => (color) => {
    this.setState({
      theme: { ...this.state.theme, [item]: color.hex },
    });
    this.changeTheme();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <ColorPickerCard
              title="Background color"
              color={this.state.theme}
              onChangeComplete={this.handleChangeComplete()}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ThemingPage;
