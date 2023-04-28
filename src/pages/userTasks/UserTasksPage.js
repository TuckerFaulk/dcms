import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import UserTask from "./UserTask";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import StatusFilter from "../../components/StatusFilter";
import Asset from "../../components/Asset";
import styles from "../../styles/SearchBar.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Display all user tasks.
 */
function UserTasksPage() {
  useRedirect('loggedOut');
  const [userTasks, setUserTasks] = useState({ results: [] });
  const [status, setStatus] = useState("Open");
  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  const currentProfile = useCurrentProfile();

  /**
   * Fetch user tasks from API.
   * Return search results.
   */
  useEffect(() => {
    const handleMount = async () => {
      if (currentProfile?.is_staff) {
        try {
          const { data } = await axiosReq.get(
            `/user-tasks/?completed_by=Admin&status=${status}&search=${query}`
          );
          setUserTasks(data);
        } catch (err) {
          // console.log(err);
        }
      } else {
        try {
          const { data } = await axiosReq.get(
            `/user-tasks/?assigned_to__assigned_to__profile=${currentUser?.pk}&completed_by=User&status=${status}&search=${query}`
          );
          setUserTasks(data);
        } catch (err) {
          // console.log(err);
        }
      }
    };

    const timer = setTimeout(() => {
      handleMount();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentUser, currentProfile, status, query]);

  return (
    <Container>
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      <Form
        className={`${styles.SearchBar}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <Form.Control
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mr-sm-2"
          placeholder="Search..."
        />
      </Form>

      <StatusFilter status={status} setStatus={setStatus} />

      <Row className="mt-3">
        <Col>
        <InfiniteScroll 
          children={
            userTasks?.results.map((task) => (
              <UserTask key={task.id} {...task} />
            ))
          }
          dataLength={userTasks.results.length}
          loader={<Asset spinner />}
          hasMore={!!userTasks.next}
          next={() => fetchMoreData(userTasks, setUserTasks)}
        />
        </Col>
      </Row>
    </Container>
  );
}

export default UserTasksPage;
