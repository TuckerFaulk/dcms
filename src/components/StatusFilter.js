import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import btnStyles from "../styles/Button.module.css";

const StatusFilter = (props) => {
  const { status, setStatus } = props;

  return (
    <Row className="d-flex justify-content-center">
      {status === "Open" && (
        <>
          <Button onClick={() => setStatus("Open")} className={`${btnStyles.Button} ${btnStyles.Blue}`}>
            Open
          </Button>
          <Button onClick={() => setStatus("Closed")} className={`${btnStyles.Button}`}>
            Closed
          </Button>
        </>
      )}
      {status === "Closed" && (
        <>
          <Button onClick={() => setStatus("Open")} className={`${btnStyles.Button}`}>
            Open
          </Button>
          <Button
            onClick={() => setStatus("Closed")}
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
          >
            Closed
          </Button>
        </>
      )}
    </Row>
  );
};

export default StatusFilter;
