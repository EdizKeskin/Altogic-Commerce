import { Box, Heading, Text } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Verification() {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <BsFillCheckCircleFill color="#38A169" size={"50px"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
      Verification Email Sent
      </Heading>
      <Text color={"gray.50"}>
        We've sent a verification email to your email address. Please check your
        inbox and click on the link to verify your email address.
      </Text>
    </Box>
  );
}

export default Verification;
