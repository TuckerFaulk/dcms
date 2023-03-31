import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import MasterTasksCreateForm from "./pages/masterTasks/MasterTasksCreateForm";
import CategoriesCreateForm from "./pages/categories/CategoriesCreateForm";
import MasterTaskPage from "./pages/masterTasks/MasterTaskPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/categories/create" render={() => <CategoriesCreateForm />} />
          <Route exact path="/master-tasks/create" render={() => <MasterTasksCreateForm />} />
          <Route exact path="/master-tasks/:id" render={() => <MasterTaskPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
