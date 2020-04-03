import React, { Component } from "react";
import ContactForm from "../forms/contactForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { message } from "../../actions/message";
class ContactPage extends Component {
  onSubmit = data => {
    return this.props.message(data);
  };

  render() {
    return (
      <div>
        <h1> Contact Page</h1>
        <ContactForm submit={this.onSubmit} />
      </div>
    );
  }
}

ContactPage.propTypes = {
  message: PropTypes.func.isRequired
};

export default connect(null, { message })(ContactPage);
