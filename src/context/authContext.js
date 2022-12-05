import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import altogic from "../api/altogic";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const toast = useToast();
  const [sessions, setSessions] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const sendReq = async () => {
      const resp = await getAllSessions();
      setSessions(resp.sessions);
    };

    if (altogic.auth.getSession()) {
      setIsAuth(true);
      sendReq();
    }
  }, [isAuth]);

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

export { AuthenticationProvider, useAuth };
