import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Action from "./Action";
import ActionUpdateForm from "./ActionUpdateForm";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function ActionPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const [action, setAction] = useState({ results: [] });

  const history = useHistory();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: action }, { data: comments }] = await Promise.all([
          axiosReq.get(`/actions/${id}`),
          axiosReq.get(`/action-comments/?action_title=${id}`),
        ]);
        setAction({ results: [action] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className="d-flex justify-content-end pb-3">
        <Button
          onClick={() => history.goBack()}
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
        >
          Back
        </Button>
      </Row>

      <Row>
        <Col>
          <Action {...action.results[0]} ActionPage />
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionUpdateForm {...action.results[0]} setAction={setAction} />
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <CommentCreateForm
            profile_id={currentUser?.profile_id}
            profileImage={profile_image}
            action_title={id}
            setComments={setComments}
            page="action"
          />

          {comments?.results.length ? (
            comments?.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setComments={setComments}
                page="action"
              />
            ))
          ) : (
            <span>No comments...</span>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ActionPage;
