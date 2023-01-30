import {
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePreferences } from "../context/preferencesContext";
import Typewriter from "typewriter-effect";

function Header() {
  const { lang } = usePreferences();
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
      <Box textAlign={"center"} mx={10}>
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
    </Box>
  );
}

export default Header;
