import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { NavLink } from "react-router-dom";
import Action from "./Action";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MyActionsPage() {
  const [actions, setActions] = useState({ results: [] });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/actions/?assigned_to__profile=${currentUser?.pk}`);
        console.log(data);
        setActions(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, []); // Dont know whether I need to add anything in here?

  return (
    <Container>
      <Row>
        <Col className="text-right">
          <NavLink to="/actions/create">
            <i className="fas fa-plus-square"></i>Add Action
          </NavLink>
        </Col>
      </Row>

      <Row>
        <Col>
          {actions?.results.map((action) => (
            <Action {...action} MyActionsPage />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default MyActionsPage;
