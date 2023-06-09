import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * Check user logged in status with refresh token.
 * Redirect user to home page.
 * Variables & function code provided in Moments walkthrough.
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/my-tasks/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
