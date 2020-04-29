import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const NavBar = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Button
            bsPrefix="custom-btn"
            className="btn-block"
            onClick={() => props.onClick("home")}
          >
            Home
          </Button>
        </Col>
        <Col>
          <Button
            bsPrefix="custom-btn"
            className="btn-block"
            onClick={() => props.onClick("resume")}
          >
            Resume
          </Button>
        </Col>

        <Col>
          <Button
            bsPrefix="custom-btn"
            className="btn-block"
            onClick={() => props.onClick("contact")}
          >
            Contact
          </Button>
        </Col>

        <Col>
          <Button
            bsPrefix="custom-btn"
            className="btn-block"
            onClick={() => props.onClick("theme")}
          >
            Theme
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
