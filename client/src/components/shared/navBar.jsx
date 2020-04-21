import React from "react";
import { Button, Grid } from "semantic-ui-react";

const style = {
  height: "50px",
};

const NavBar = (props) => {
  return (
    <div>
      <Grid columns={1}>
        <Grid.Column style={style}>
          <Button onClick={() => props.onClick("home")}>Home</Button>
        </Grid.Column>
        <Grid.Column style={style}>
          <Button onClick={() => props.onClick("resume")}>Resume</Button>
        </Grid.Column>
        <Grid.Column style={style}>
          <Button onClick={() => props.onClick("contact")}>contact</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default NavBar;
