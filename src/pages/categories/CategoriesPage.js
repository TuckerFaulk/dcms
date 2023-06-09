import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CategoriesPage.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Display all Categories.
 */
function CategoriesPage() {
  useRedirect("loggedOut");
  const [categories, setCategories] = useState();

  const history = useHistory();

  /**
   * Fetch Categories from API.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategories(data);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, []); 

  /**
   * Route user to Edit page.
   */
  const handleEdit = (id) => {
    history.push(`/categories/${id}/edit`);
  };

  /**
   * Delete selected action from API
   */
  const handleDelete = async (id) => {
    try {
      await axiosRes.delete(`/categories/${id}`);
      // Source: CI Tutor Ed
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="text-right">
          <NavLink to="/categories/create">
            <i className="fas fa-plus-square"></i>Add Category
          </NavLink>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center pt-3">
        {categories?.map((category) => (
          <Card
            key={category.id}
            style={{ width: "18rem" }}
            className={styles.Card}
          >
            <Card.Body>
              <Row>
                <Col className="mt-2" sm={10}>
                  <p className="mb-0">{category.category_name}</p>
                </Col>
                <Col sm={2}>
                  <MoreDropdown
                    handleEdit={() => handleEdit(category.id)}
                    handleDelete={() => handleDelete(category.id)}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesPage;
