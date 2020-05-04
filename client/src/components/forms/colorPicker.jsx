import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { Card, Dropdown } from "react-bootstrap";

class ColorPickerCard extends Component {
  state = {
    dropActive: "Background",
  };

  handleSelect = (eventKey) => {
    this.setState({ ...this.state, dropActive: eventKey });
  };

  render() {
    const { dropActive } = this.state;
    const { color, onChangeComplete } = this.props;
    const { bg, text, menu, hl, btn } = this.props;
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Dropdown onSelect={this.handleSelect}>
              <Dropdown.Toggle>{dropActive}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Background" style={{ background: bg }}>
                  Background
                </Dropdown.Item>
                <Dropdown.Item eventKey="Text" style={{ background: text }}>
                  Text
                </Dropdown.Item>
                <Dropdown.Item eventKey="Menu" style={{ background: menu }}>
                  Menu
                </Dropdown.Item>
                <Dropdown.Item eventKey="Highlight" style={{ background: hl }}>
                  Highlight
                </Dropdown.Item>
                <Dropdown.Item eventKey="Button" style={{ background: btn }}>
                  Button
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ChromePicker color={color} onChangeComplete={onChangeComplete} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ColorPickerCard;
