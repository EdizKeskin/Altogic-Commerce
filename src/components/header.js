import {
  Text,
  Box,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { useLang } from "../context/langContext";
import Typewriter from "typewriter-effect";

function Header() {
  const { lang } = useLang();
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");
  const desc =
    lang === "tr-TR"
      ? "Her zaman için en iyi hizmeti sunmak için çalışıyoruz."
      : "We are working to provide the best service at all times.";

  return (
    <Box
      justifyContent="center"
      alignItems={"center"}
      display="flex"
      py={10}
      flexDirection="column"
    >
      <Text
        as={"h1"}
        fontSize={"4xl"}
        fontWeight={"extrabold"}
        letterSpacing={"10px"}
        color={textColor}
        textAlign={"center"}
      >
        Sharp Commerce
      </Text>
      <Box textAlign={"center"}>
        <Typewriter
          options={{
            autoStart: true,
            delay: 60,
            deleteSpeed: 0.05,
          }}
          onInit={(typewriter) => {
            typewriter.typeString(desc).pauseFor(1000).start();
          }}
        />
      </Box>
      <Button
        color="Black"
        variant="link"
        onClick={toggleColorMode}
        mt="3"
        fontSize={"2xl"}
        display={colorMode === "light" ? "box" : "none"}
      >
        <FormattedMessage id="err" />
      </Button>
    </Box>
  );
}

export default Header;
