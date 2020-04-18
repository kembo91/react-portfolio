import React, { Component } from "react";
import ContactForm from "../forms/contactForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { message } from "../../actions/message";
import { ReCaptcha } from "react-recaptcha-google";
class ContactPage extends Component {
  state = {
    captchaVisible: "invisible",
  };

  onSubmit = (data) => {
    this.setState({ ...this.state, captchaVisible: "normal" });
    this.captcha.execute();
    return this.props.message(data);
  };

  render() {
    const { captchaVisible } = this.state;
    return (
      <div>
        <h1> Contact Page</h1>
        <ContactForm submit={this.onSubmit} />
        <ReCaptcha
          ref={(el) => (this.captcha = el)}
          size={captchaVisible}
          render="explicit"
          sitekey="6LfY1eoUAAAAAHsOVzBqqB5QrEzv5d9LMhrTwJGz"
        />
      </div>
    );
  }
}

ContactPage.propTypes = {
  message: PropTypes.func.isRequired,
};

export default connect(null, { message })(ContactPage);
