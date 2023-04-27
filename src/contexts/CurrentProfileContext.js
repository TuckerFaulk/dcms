import { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const CurrentProfileContext = createContext();
export const SetCurrentProfileContext = createContext();

export const useCurrentProfile = () => useContext(CurrentProfileContext);
export const useSetCurrentProfile = () => useContext(SetCurrentProfileContext);

export const CurrentProfileProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${currentUser?.pk}`);
        setCurrentProfile(data);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <CurrentProfileContext.Provider value={currentProfile}>
      <SetCurrentProfileContext.Provider value={setCurrentProfile}>
        {children}
      </SetCurrentProfileContext.Provider>
    </CurrentProfileContext.Provider>
  );
};
