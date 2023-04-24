import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { axiosReq } from "../../api/axiosDefaults";
import { NavLink } from "react-router-dom";
import Action from "./Action";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";

function ActionsPage() {
  const [actions, setActions] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const currentProfile = useCurrentProfile();

  useEffect(() => {
    const handleMount = async () => {

      if (currentProfile?.is_staff) {
        try {
          const { data } = await axiosReq.get(`/actions/`);
          console.log(data);
          setActions(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const { data } = await axiosReq.get(`/actions/?assigned_to__profile=${currentUser?.pk}`);
          console.log(data);
          setActions(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleMount();
  }, [currentProfile, actions]); // Try to stop it refreshing

  return (
    <Container>
      <Row>
        <Col className="text-right">
          <NavLink to="/my-actions/create">
            <i className="fas fa-plus-square"></i>Add Action
          </NavLink>
        </Col>
      </Row>

      <Row>
        <Col>
          {actions?.results.map((action) => (
            <Action {...action} ActionsPage />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ActionsPage;
