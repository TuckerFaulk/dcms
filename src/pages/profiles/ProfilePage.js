import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import { Image } from "react-bootstrap";

function ProfilePage() {
  const currentProfile = useCurrentProfile();

  const mainProfile = (
    <>
      <Row>
        <Col className="d-flex justify-content-center">
          <Image roundedCircle src={currentProfile?.image} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center px-3 text-center">
        <Col lg={6}>
          <h3 className="m-2">{currentProfile?.owner}</h3>
          <Row className="justify-content-center no-gutters mt-3">
            <Col>
              <div>{currentProfile?.user_open_tasks_count}</div> 
              {/* Change the above to a links to the appropriate page */}
              <div>Open Tasks - User</div>
            </Col>
            <Col>
              <div>{currentProfile?.admin_open_tasks_count}</div>
              <div>Open Tasks - Admin</div>
            </Col>
            <Col>
              <div>{currentProfile?.open_actions_count}</div>
              <div>Open Actions</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  return (
    <Row>
      <Col>
        <Container>
          {/* {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )} */}
          {mainProfile}
          {/* {mainProfilePosts} */}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
