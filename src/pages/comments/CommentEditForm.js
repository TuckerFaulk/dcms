import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

/**
 * Render CommentEditForm.
 * Supply user with input fields to edit an comment.
 * Source: CI Walkthrough Videos
 */
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments, page } = props;

  const [formContent, setFormContent] = useState(content);

  /**
   * Populate FormContent strings.
   */
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /**
   * Push data to API dependant whether
   * a task comment or action comment
   * has been edited.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (page === "task") {
      try {
        await axiosRes.put(`/task-comments/${id}/`, {
          content: formContent.trim(),
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            return comment.id === id ? {
                  ...comment,
                  content: formContent.trim(),
                  updated_at: "now",
                }
              : comment;
          }),
        }));
        setShowEditForm(false);
      } catch (err) {
        // console.log(err);
      }
    } else if (page === "action") {
      try {
        await axiosRes.put(`/action-comments/${id}/`, {
          content: formContent.trim(),
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.map((comment) => {
            return comment.id === id ? {
                  ...comment,
                  content: formContent.trim(),
                  updated_at: "now",
                }
              : comment;
          }),
        }));
        setShowEditForm(false);
      } catch (err) {
        // console.log(err);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
      <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          Update
        </button>
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;