import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/homePage";
import ResumePage from "./components/pages/resumePage";
import ContactPage from "./components/pages/contactPage";

function App() {
  return (
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/resume" exact component={ResumePage} />
      <Route path="/contact" exact component={ContactPage} />
    </div>
  );
}

export default App;
