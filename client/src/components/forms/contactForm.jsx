import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/inlineError";
import Validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReCaptcha } from "react-recaptcha-google";

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
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        {errors.verification && (
          <Message negative>
            <p>{errors.verification}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label>E-Mail</label>
          <input
            placeholder="example@example.com"
            onChange={this.onChange}
            name="email"
            type="email"
            id="email"
            value={data.email}
          />
          {errors.email && <InlineError message={errors.email} />}
        </Form.Field>
        <Form.Field>
          <label>Your message (optional)</label>
          <input
            onChange={this.onChange}
            name="message"
            type="text"
            id="message"
            value={data.message}
          />
        </Form.Field>
        <Button primary type="submit">
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
          <Message>
            <Message.Header>Message successfully sent!</Message.Header>
          </Message>
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
