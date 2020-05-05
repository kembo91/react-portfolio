import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { Card, Dropdown } from "react-bootstrap";

class ColorPickerCard extends Component {
  state = {
    dropActive: "Background",
  };

  handleSelect = (eventKey) => {
    this.setState({ ...this.state, dropActive: eventKey });
    this.props.onSelectColor(eventKey);
  };

  render() {
    const { dropActive } = this.state;
    const { color, onChangeComplete } = this.props;
    return (
      <div>
        <Card style={{ width: "18rem" }} className="cl-hl">
          <Card.Body>
            <Dropdown onSelect={this.handleSelect}>
              <Dropdown.Toggle>{dropActive}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Background" className="cl-bg">
                  Background
                </Dropdown.Item>
                <Dropdown.Item eventKey="Text" className="cl-txt">
                  Text
                </Dropdown.Item>
                <Dropdown.Item eventKey="Menu" className="cl-menu">
                  Menu
                </Dropdown.Item>
                <Dropdown.Item eventKey="Highlight" className="cl-hl">
                  Highlight
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
