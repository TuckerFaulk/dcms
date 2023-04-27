import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import MasterTask from "./MasterTask";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

import styles from "../../styles/SearchBar.module.css";
import { useRedirect } from "../../hooks/useRedirect";

function MasterTasksPage() {
  useRedirect('loggedOut')
  const [masterTasks, setMasterTasks] = useState({ results: [] });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/master-tasks/?search=${query}`);
        setMasterTasks(data);
      } catch (err) {
        // console.log(err);
      }
    };

    const timer = setTimeout(() => {
      handleMount();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

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
      <Row>
        <Col className="text-right">
          <NavLink to="/master-tasks/create">
            <i className="fas fa-plus-square"></i>Add Task
          </NavLink>
        </Col>
      </Row>
      <Row className="mt-2 mb-3">
        <Col>
        <InfiniteScroll 
          children={
            masterTasks?.results.map((task) => (
              <MasterTask key={task.id} {...task} />
            ))
          }
          dataLength={masterTasks.results.length}
          loader={<Asset spinner />}
          hasMore={!!masterTasks.next}
          next={() => fetchMoreData(masterTasks, setMasterTasks)}
        />
        </Col>
      </Row>
    </Container>
  );
}

export default MasterTasksPage;
