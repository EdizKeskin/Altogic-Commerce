import { useState } from "react";
import SessionTable from "../../components/SessionTable/SessionTable";
import { useAuth } from "../../context/authContext";
import { Box, Button, Container, Stack } from "@chakra-ui/react";
import ProfileNav from "../../components/ProfileNav";
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
    <Container maxW={"7xl"} mt={10}>
      <Stack
        bg={"gray.800"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 12 }}
        direction={{ base: "column", md: "row" }}
        borderRadius={"md"}
      >
        <ProfileNav />
        <Box display={"grid"}>
          <Box
            m={"auto"}
            minW={"fit-content"}
            borderRadius={"md"}
            mb={10}
            mx={{ base: 3, md: "auto" }}
          >
            <Box
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
      </Stack>
    </Container>
  );
};
export default Sessions;
