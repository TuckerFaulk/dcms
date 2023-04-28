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
import AssignedToCreateForm from "./pages/assignedTo/AssignedToCreateForm";
import MasterTasksPage from "./pages/masterTasks/MasterTasksPage";
import ActionsPage from "./pages/actions/ActionsPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import UserTasksPage from "./pages/userTasks/UserTasksPage";
import UserTaskPage from "./pages/userTasks/UserTaskPage";
import ActionsCreateForm from "./pages/actions/ActionsCreateForm";
import ActionPage from "./pages/actions/ActionPage";
import MasterTasksEditForm from "./pages/masterTasks/MasterTasksEditForm";
import CategoriesEditForm from "./pages/categories/CategoriesEditForm";
import ActionsEditForm from "./pages/actions/ActionsEditForm";
import Home from "./pages/home/home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Home Page */}
          <Route exact path="/" render={() => <Home />} />
          {/* Authentication */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Categories */}
          <Route exact path="/categories/" render={() => <CategoriesPage />} />
          <Route exact path="/categories/create" render={() => <CategoriesCreateForm />} />
          <Route exact path="/categories/:id/edit" render={() => <CategoriesEditForm />} />
          {/* Master Tasks */}
          <Route exact path="/master-tasks/" render={() => <MasterTasksPage />} />
          <Route exact path="/master-tasks/create" render={() => <MasterTasksCreateForm />} />
          <Route exact path="/master-tasks/:id" render={() => <MasterTaskPage />} />
          <Route exact path="/master-tasks/:id/edit" render={() => <MasterTasksEditForm />} />
          {/* Assigned To */}
          <Route exact path="/assigned-to/create" render={() => <AssignedToCreateForm />} />
          {/* Actions */}
          <Route exact path="/my-actions/" render={() => <ActionsPage /> } />
          <Route exact path="/my-actions/create" render={() => <ActionsCreateForm /> } />
          <Route exact path="/my-actions/:id" render={() => <ActionPage /> } />
          <Route exact path="/my-actions/:id/edit" render={() => <ActionsEditForm /> } />
          {/* User Tasks */}
          <Route exact path="/my-tasks/" render={() => <UserTasksPage /> } />
          <Route exact path="/my-tasks/:id" render={() => <UserTaskPage /> } />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
