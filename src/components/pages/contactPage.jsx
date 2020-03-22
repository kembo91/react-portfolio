import React, { Component } from "react";
import ContactForm from "../forms/contactForm";
import { connect } from "react-redux";
class ContactPage extends Component {
  onSubmit = data => {
    props.message(data);
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

export default connect(null, { message })(ContactPage);
