import { Box, Heading, Text } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FormattedMessage } from "react-intl";

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
        <FormattedMessage id="verification_email_sent" />
      </Heading>
      <Text color={"gray.50"}>
        <FormattedMessage id="verification_email_sent_desc" />
      </Text>
    </Box>
  );
}

export default Verification;
