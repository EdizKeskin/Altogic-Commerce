import { Container, Stack, Text } from "@chakra-ui/react";
import React from "react";
import ProfileNav from "../../components/ProfileNav";

function Adress() {
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
        <Text>I am currently working on</Text>
      </Stack>
    </Container>
  );
}

export default Adress;