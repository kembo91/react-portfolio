import { Container, Col, Row, Button } from "react-bootstrap";
import { AiFillGithub, AiFillMail, AiFillInstagram } from "react-icons/ai";
import React from "react";

const Footer = () => {
  return (
    <Container fluid className="fixed-bottom">
      <Row>
        <Col>
          <Button variant="transparent" href="https://github.com/kembo91">
            <AiFillGithub size={64} />
          </Button>
        </Col>
        <Col>
          <Button variant="transparent" href="mailto:ketema.galy@gmail.com">
            <AiFillMail size={64} />
          </Button>
        </Col>
        <Col>
          <Button
            variant="transparent"
            href="https://www.instagram.com/ke_mbo/"
          >
            <AiFillInstagram size={64} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
