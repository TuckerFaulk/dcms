import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";


/**
 * Render CommentCreateForm.
 * Supply user with input fields to create a comment.
 * Source: CI Walkthrough Videos
 */
function CommentCreateForm(props) {
  const { task_name, action_title, setComments, profileImage, profile_id, page } = props;
  const [content, setContent] = useState("");

  /**
   * Populate Content strings.
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * Push data to API dependant whether
   * a task comment or action comment
   * has been created.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (page === "task") {
      try {
        const { data } = await axiosRes.post("/task-comments/", {
          content,
          task_name,
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: [data, ...prevComments.results],
        }));
        setContent("");
      } catch (err) {
        // console.log(err);
      }
    } else if (page === "action") {
      try {
        const { data } = await axiosRes.post("/action-comments/", {
          content,
          action_title,
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: [data, ...prevComments.results],
        }));
        setContent("");
      } catch (err) {
        // console.log(err);
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Add a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default CommentCreateForm;