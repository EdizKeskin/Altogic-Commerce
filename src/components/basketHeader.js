import {
  Text,
  Box,
  Button,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { useLang } from "../context/langContext";
import Typewriter from "typewriter-effect";
import { TiTickOutline } from "react-icons/ti";

function BasketHeader() {
  const { lang } = useLang();
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex
      py={10}
      zIndex={"99"}
      mx={10}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        as={"h1"}
        fontSize={"4xl"}
        fontWeight={"extrabold"}
        letterSpacing={"10px"}
        color={textColor}
        zIndex={"99"}
        mt={10}
      >
        Basket:
      </Text>
      <Box>
        {" "}
        <Button
          colorScheme="green"
          mt={10}
          ml="5"
          rightIcon={<TiTickOutline size="20px" />}
        >
          Complete the order
        </Button>
      </Box>
    </Flex>
  );
}

export default BasketHeader;
