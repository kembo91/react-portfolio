import React, { Component } from "react";
import ContactForm from "../forms/contactForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { message } from "../../actions/message";
import { Container, Row, Col } from "react-bootstrap";

class ContactPage extends Component {
  onSubmit = (data) => {
    return this.props.message(data);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p>
              If you are interested in working with me, feel free to contact me
              directly via e-mail, or fill that form and I'll contact you back
              as soon as I can.
            </p>
            <p>
              Fill that form and my Telegram bot will notify me that you were
              here. He's my hiring agent:) Don't forget to provide valid contact
              information!
            </p>
          </Col>
          <Col>
            <ContactForm submit={this.onSubmit} />
          </Col>
        </Row>
      </Container>
    );
  }
}

ContactPage.propTypes = {
  message: PropTypes.func.isRequired,
};

export default connect(null, { message })(ContactPage);
