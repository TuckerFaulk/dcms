import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setComments,
    page,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {

    if (page === "task") {
      try {
        await axiosRes.delete(`/task-comments/${id}/`);
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      } catch (err) {
        console.log(err);
      } 
    } else if (page === "action") {
      try {
        await axiosRes.delete(`/action-comments/${id}/`);
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      } catch (err) {
        console.log(err);
      } 
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
              page={page}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
