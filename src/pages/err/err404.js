import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function err404() {
  return (
    <Box textAlign="center" py={10} px={6} data-aos="fade-up">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, red.400, red.500)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        <FormattedMessage id="title_404" />
      </Text>
      <Text color={"gray.500"} mb={6}>
        <FormattedMessage id="desc_404" />
      </Text>
      <Link to="/">
        <Button colorScheme="red">
          <FormattedMessage id="btn_404" />
        </Button>
      </Link>
    </Box>
  );
}
export default err404;
