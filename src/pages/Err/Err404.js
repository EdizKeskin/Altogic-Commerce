import { Box, Text, Button, Image } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { usePreferences } from "../../context/preferencesContext";

function Err404() {
  const { animations } = usePreferences();
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      data-aos={animations === true ? "fade-up" : "none"}
    >
      <Image
        src={"https://i.imgur.com/A040Lxr.png"}
        alt="404"
        w="100%"
        maxW="400px"
        mx="auto"
        mb={6}
      />
      <Text fontSize="18px" mt={3} mb={2}>
        <FormattedMessage id="title_404" />
      </Text>
      <Text color={"gray.500"} mb={6}>
        <FormattedMessage id="body_404" />
      </Text>
      <Link to="/">
        <Button colorScheme="teal" variant={"outline"}>
          <FormattedMessage id="btn_404" />
        </Button>
      </Link>
    </Box>
  );
}
export default Err404;
