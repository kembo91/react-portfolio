import React, { Component } from "react";
import InlineError from "../messages/inlineError";
import Validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReCaptcha } from "react-recaptcha-google";
import { Form, Alert, Button } from "react-bootstrap";

class ContactForm extends Component {
  state = {
    data: {
      email: "",
      message: "",
    },
    isVerified: false,
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { email } = this.state.data;
    const { isVerified } = this.state;
    if (!Validator.isEmail(email)) errors.email = "Email is not valid";
    if (!isVerified) errors.verification = "Please verify that you are a human";
    return errors;
  };

  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data).catch((err) => {
        errors.global = err.message;
        this.setState({ errors });
      });
    }
  };

  handleVerified = (value) => {
    if (value) {
      this.setState({ ...this.state, isVerified: true });
    }
  };

  onChange = (event) =>
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });

  renderForm = (errors, data) => {
    return (
      <Form noValidate onSubmit={this.onSubmit}>
        {errors.global && (
          <Alert negative>
            <Alert variant="danger">
              <p>Something went wrong</p>
              <p>{errors.global}</p>
            </Alert>
          </Alert>
        )}
        {errors.verification && (
          <Alert variant="danger">
            <p>{errors.verification}</p>
          </Alert>
        )}
        <Form.Group controlId="formEmail">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            placeholder="example@example.com"
            onChange={this.onChange}
            type="email"
            value={data.email}
          />
          {errors.email && <InlineError message={errors.email} />}
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Your message (optional)</Form.Label>
          <Form.Control
            onChange={this.onChange}
            type="text"
            value={data.message}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Contact me!
        </Button>
        <ReCaptcha
          ref={(el) => (this.captcha = el)}
          size="normal"
          render="explicit"
          sitekey="6LeY1OsUAAAAACFVZA2zc-u67FWv7MkgWUWhuVbA"
          verifyCallback={this.handleVerified}
        />
      </Form>
    );
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div>
        {!this.props.msgStatus ? (
          this.renderForm(errors, data)
        ) : (
          <Alert variant="success">
            <p>Message successfully sent!</p>
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
