import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  FormControl,
  Box,
  Heading,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import altogic from "../../api/altogic";

function Register(props) {
  const type = props.type;
  const { state } = useLocation();
  console.log(state);

  const signin = (provider) => {
    altogic.auth.signInWithProvider(provider, {
      admin: false,
    });
  };

  return (
    <Flex align="center" justifyContent="center" data-aos="fade-up">
      <Box
        bgColor="gray.700"
        boxShadow="dark-lg"
        boxSize={{ base: "90%", md: "xl" }}
        p="10"
        mt="50px"
        maxHeight={"fit-content"}
        maxWidth={"fit-content"}
        borderRadius="lg"
      >
        <Box textAlign="center">
          <Heading color="white">{type}</Heading>
        </Box>
        {state && state.errors && (
          <Alert
            mt={"4"}
            status="error"
            color="white"
            bgColor="red.600"
            borderRadius="lg"
          >
            <AlertIcon color="red.900" />
            This email is already in use.
          </Alert>
        )}
        <Box my="5" textAlign="left" boxSize={{ base: "2xs", md: "md" }}>
          <FormControl>
            <Button
              colorScheme="teal"
              w={"full"}
              onClick={(event) => {
                event.preventDefault();
                signin("google");
              }}
            >
              Continue with Google
            </Button>
          </FormControl>

          <FormControl mt={4}>
            <Button
              colorScheme="teal"
              w={"full"}
              onClick={(event) => {
                event.preventDefault();
                signin("github");
              }}
            >
              Continue with Github
            </Button>
          </FormControl>

          <FormControl mt={4}>
            <Button
              colorScheme="teal"
              w={"full"}
              onClick={(event) => {
                event.preventDefault();
                signin("discord");
              }}
            >
              Continue with Discord
            </Button>
          </FormControl>

          {type === "Sign Up" && (
            <Link to="/signin">
              <Button
                colorScheme="teal"
                variant="link"
                width="full"
                mt={3}
                color="gray.500"
                fontSize="sm"
              >
                Already have an account?
              </Button>
            </Link>
          )}
          {type === "Sign In" && (
            <Link to="/signup">
              <Button
                colorScheme="teal"
                variant="link"
                width="full"
                mt={3}
                color="gray.500"
                fontSize="sm"
              >
                Don't have an account?
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;
