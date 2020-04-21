import React, { Component } from "react";
import NavBar from "./components/shared/navBar";
import Aboutme from "./components/pages/aboutmePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";
import { loadReCaptcha } from "react-recaptcha-google";
import { Grid, Container } from "semantic-ui-react";

class App extends Component {
  state = {
    active: "aboutme",
  };

  onClick = (value) => {
    this.setState({ ...this.state, active: value });
  };

  renderBlock = (active) => {
    switch (active) {
      case "resume":
        return <ResumePage />;
      case "contact":
        return <ContactPage />;
      default:
        return <Aboutme />;
    }
  };

  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    const active = this.state.active;
    return (
      <div>
        <Container>
          <Grid columns={2}>
            <Grid.Column width={4}>
              <NavBar onClick={this.onClick} />
            </Grid.Column>
            <Grid.Column width={8}>{this.renderBlock(active)}</Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
