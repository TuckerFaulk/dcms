import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import UserTask from "./UserTask";
import UserTaskUpdateForm from "./UserTaskUpdateForm";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function UserTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, { data: comments }] = await Promise.all([
          axiosReq.get(`/user-tasks/${id}`),
          axiosReq.get(`/task-comments/?task_name=${id}`),
        ]);
        setTask({ results: [task] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <UserTask {...task.results[0]} TaskPage />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTaskUpdateForm {...task.results[0]} setTask={setTask} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentCreateForm
            profile_id={currentUser.profile_id}
            profileImage={profile_image}
            task_name={id}
            setComments={setComments}
            page="task"
          />

          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setComments={setComments}
                page="task"
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

export default UserTaskPage;
