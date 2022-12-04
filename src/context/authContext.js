import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import altogic from "../api/altogic";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const toast = useToast();
  // Define states
  const [sessions, setSessions] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // We use useNavigate() method to switch routes
  let navigate = useNavigate();

  useEffect(() => {
    const sendReq = async () => {
      const resp = await getAllSessions();
      setSessions(resp.sessions);
    };

    // Fetches the session data to determine if the user is authenticated and updates the context
    if (altogic.auth.getSession()) {
      setIsAuth(true);
      sendReq();
    }
  }, [isAuth]);

  // Signs out from the current session with Altogic Client Library signOut() function and updates isAuth state. We call this function in ProfileDropdown component
  const signOutCurrentSession = async () => {
    try {
      const resp = await altogic.auth.signOut();

      if (resp.errors === null) {
        setIsAuth(false);
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // This function will call same Altogic Client Library function with above signOutFromTheCurrentSession().
  // But the difference is, we call this function in Sessions component, not in ProfileDropdown
  const signOutSelectedSession = async (token) => {
    const flag = token === altogic.auth.getSession().token;

    try {
      const resp = await altogic.auth.signOut(token);
      if (resp.errors === null) {
        const temp = await getAllSessions();
        setSessions(temp.sessions);
        if (flag) {
          setIsAuth(false);
          navigate("/signin");
        } else {
          toast({
            title: "Success",
            description: "Session has been signed out successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Session could not be signed out.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Sign out from all sessions with AltogicClientLibrary signOutAll() function
  const signOutAllSessions = async () => {
    try {
      const resp = await altogic.auth.signOutAll();
      if (resp.errors === null) {
        setIsAuth(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get list of all active sessions with Altogic Client Library function getAllSessions()
  const getAllSessions = async () => {
    try {
      return await altogic.auth.getAllSessions();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const values = {
    isAuth,
    setIsAuth,
    signOutCurrentSession,
    signOutSelectedSession,
    getAllSessions,
    signOutAllSessions,
    sessions,
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuth = () => useContext(AuthenticationContext);

export {AuthenticationProvider, useAuth};
