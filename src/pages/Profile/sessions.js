import { useState } from "react";
import SessionTable from "../../components/sessionTable/sessionTable";
import { useAuth } from "../../context/authContext";
import { Box, Button } from "@chakra-ui/react";
const Sessions = () => {
  const { signOutAllSessions, sessions } = useAuth();
  const [loading, setLoading] = useState(false);

  const signOutAll = async (event) => {
    setLoading(true);
    event.preventDefault();
    await signOutAllSessions();
    setLoading(false);
  };

  return (
    <Box display={"grid"}>
      <Box
        m={"auto"}
        minW={"fit-content"}
        borderRadius={"md"}
        shadow={"lg"}
        mt={10}
        bg={"gray.800"}
        mb={10}
        mx={{ base: 3, md: "auto" }}
      >
        <Box
          border={"1px solid"}
          borderColor={"gray.200"}
          overflowX={"auto"}
          m={"auto"}
          minW={"fit-content"}
          borderRadius={"md"}
        >
          {sessions !== null ? <SessionTable sessions={sessions} /> : <></>}
          <Box textAlign={"center"}>
            <Button
              isLoading={loading}
              onClick={signOutAll}
              colorScheme={"teal"}
              variant={"solid"}
              my={4}
            >
              Sign Out From All Sessions
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Sessions;
