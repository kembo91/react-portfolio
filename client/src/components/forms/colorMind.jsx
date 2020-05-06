import React from "react";
import { Card, Button } from "react-bootstrap";

const ColorMind = (props) => {
  return (
    <Card className="cl-hl center-card" style={{ width: "18rem" }}>
      <Card.Body>
        <p>
          Colormind is a platform for smart color scheme generation that uses
          deep learning to do so. Naturally not all color schemes would work
          good with this website, but there is almost infinite amount of them.
          Go ahead, try it yourself!
        </p>
        <Button variant="ordinary" onClick={props.onFetchColormind}>
          Fetch
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ColorMind;
