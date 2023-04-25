import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const StatusFilter = (props) => {
  const { status, setStatus } = props;

  return (
    <Row className="d-flex justify-content-center">
      {status === "Open" && (
        <>
          <Button onClick={() => setStatus("Open")} className="btn btn-primary">
            Open
          </Button>
          <Button onClick={() => setStatus("Closed")} className="btn btn-light">
            Closed
          </Button>
        </>
      )}
      {status === "Closed" && (
        <>
          <Button onClick={() => setStatus("Open")} className="btn btn-light">
            Open
          </Button>
          <Button
            onClick={() => setStatus("Closed")}
            className="btn btn-primary"
          >
            Closed
          </Button>
        </>
      )}
    </Row>
  );
};

export default StatusFilter;
