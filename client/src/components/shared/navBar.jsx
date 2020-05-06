import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const NavBar = (props) => {
  const navItems = ["Home", "Resume", "Contact", "Theme"];
  return (
    <Container fluid className="nav-pad">
      <Row>
        {navItems.map((item) => (
          <Col>
            <Button variant="menu" onClick={() => props.onClick(item)}>
              {item}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NavBar;
