import React, { Component } from "react";
import Validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Alert, Button } from "react-bootstrap";

class ContactForm extends Component {
  state = {
    data: {
      email: "",
      message: "",
    },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { email } = this.state.data;
    if (!Validator.isEmail(email) && !Validator.isMobilePhone(email))
      errors.email = "Contact data incorrect";
    return errors;
  };

  handleSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data).catch((err) => {
        errors.global = err.response.data;
        this.setState({ errors });
      });
    }
  };

  handleVerified = (value) => {
    if (value) {
      const isVerified = !this.state.isVerified;
      this.setState({ isVerified });
    }
  };

  onChange = (event) => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  };

  renderForm = (errors, data) => {
    return (
      <Form noValidate onSubmit={this.onSubmit}>
        {errors.email && (
          <Alert variant="danger">
            <p>{errors.email}</p>
          </Alert>
        )}
        {errors.global && (
          <Alert variant="danger">
            <p>{errors.global}</p>
          </Alert>
        )}
        <Form.Group controlId="formEmail">
          <Form.Label>E-Mail or phone number</Form.Label>
          <Form.Control
            name="email"
            placeholder="example@example.com or (+79999999)"
            onChange={this.onChange}
            type="email"
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Your message (optional)</Form.Label>
          <Form.Control onChange={this.onChange} type="text" name="message" />
        </Form.Group>
        <Button variant="ordinary" onClick={this.handleSubmit}>
          Contact me!
        </Button>
      </Form>
    );
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div className="cl-hl form-container rounded center-card">
        {!this.props.msgStatus ? (
          this.renderForm(errors, data)
        ) : (
          <Alert variant="success">
            <p>Message successfully sent!</p>
            <p>I'll get in touch as soon as I can</p>
          </Alert>
        )}
      </div>
    );
  }
}

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    msgStatus: state.user.msgStatus,
  };
};

export default connect(mapStateToProps)(ContactForm);
