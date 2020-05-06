import React from "react";
import { Container, Row } from "react-bootstrap";

const Aboutme = () => {
  return (
    <Container fluid className="content-row">
      <Row>
        <p>
          Hi! I'm a web developer/data scientist located in Saint-Petersburg,
          Russia. I have experience in Javascript (ES6), React, Golang, Python
          and a whole bunch of data science frameworks e.g. tensorflow, pytorch
          etc. I'm passionate about building well-designed software that
          enhances people's lives.
        </p>
      </Row>
      <Row>
        <p>
          Interested in working with me? I'm seeking new opportunities, get in
          touch with me and let's build something awesome!
        </p>
      </Row>
    </Container>
  );
};

export default Aboutme;
