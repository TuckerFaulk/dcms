import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <Container fluid>
      <Row className="mt-5">
        <h1>What is DCMS?</h1>
        <p>
          DCMS (Digital Compliance Management Software) allows you to monitor
          whether different sites within your company are keeping up with their
          compliance checks.
        </p>
        <p>This central system allows you to:</p>
      </Row>
      <Row>
        <ul>
          <li>
            Allocate regular tasks to each site and set them to be completed at
            varying frequencies
          </li>
          <li>
            Raise actions against each site in line with inspection/assessment
            findings
          </li>
          <li>
            Set whether it is a task for the site to complete or if it is
            something to be done by the central office
          </li>
        </ul>
      </Row>
    </Container>
  );
}

export default Home;
