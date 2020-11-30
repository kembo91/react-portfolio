import React from "react";
import { Nav, NavItem, Button } from "react-bootstrap";
import { useState } from "react";
import PortfolioDesc from "../descriptions/portfolioDesc";
import MMADesc from "../descriptions/MMADesc";

//{evKey == 1 ? <PortfolioDesc /> : null}
//    {evKey == 2 ? <MMADesc /> : null}

const ResumePage = () => {
  const [evKey, setEvKey] = useState(1);
  return (
    <div>
      <Nav justify variant="tabs" activeKey={evKey}>
        <Nav.Item>
          <Button variant="linkMenu" onClick={() => setEvKey(1)}>
            Portfolio
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="linkMenu" onClick={() => setEvKey(2)}>
            MMA predictions
          </Button>
        </Nav.Item>
      </Nav>
      {evKey === 1 ? <PortfolioDesc /> : null}
      {evKey === 2 ? <MMADesc /> : null}
    </div>
  );
};

export default ResumePage;
