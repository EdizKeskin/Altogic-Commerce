import { Box, Text, Button, Image } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function Err404() {
  return (
    <Box textAlign="center" py={10} px={6} data-aos="fade-up">
      <Image
        src={"https://i.imgur.com/A040Lxr.png"}
        alt="404"
        w="100%"
        maxW="400px"
        mx="auto"
        mb={6}
      />
      <Text fontSize="18px" mt={3} mb={2}>
        This Page is Lost in Space
      </Text>
      <Text color={"gray.500"} mb={6}>
        You thought this mission to the moon would be a quick six month thing.
        Your neighbor offered to look after your dog. Your high school math
        teacher was impressed. He once said you wouldn’t amount to anything.You
        sure showed him. But now here you are, fifty feet from your spaceship
        with no way to get back. Your dog will be so sad. Your math teacher will
        be so smug. Pretty devastating.
      </Text>
      <Link to="/">
        <Button colorScheme="red" variant={"outline"}>
          <FormattedMessage id="btn_404" />
        </Button>
      </Link>
    </Box>
  );
}
export default Err404;
