import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/inlineError";
import Validator from "validator";
import PropTypes from "prop-types";

class ContactForm extends React.Component {
  state = {
    data: {
      email: "",
      message: ""
    },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { email } = this.state.data;
    if (!Validator.isEmail(email)) errors.email = "Email is not valid";
    return errors;
  };

  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors }));
    }
  };

  onChange = event =>
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });

  render() {
    const { errors, data } = this.state;
    return (
      <div>
        <Form noValidate onSubmit={this.onSubmit}>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
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
        </Form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ContactForm;
