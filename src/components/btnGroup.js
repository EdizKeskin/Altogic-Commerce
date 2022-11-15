import {
  IconButton,
  ButtonGroup,
  Button,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { ImEarth } from "react-icons/im";
import { useLang } from "../context/langContext";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";
import { BsFillBasketFill } from "react-icons/bs";
import { useBasket } from "../context/basketContext";

function BtnGroup() {
  const { notification, setNotification, items } = useBasket();
  const { lang, setLang } = useLang();
  const btnColor = useColorModeValue("white.50", "gray.600");
  const { colorMode, toggleColorMode } = useColorMode();


  const langBtnHandler = () => {
    if (lang === "tr-TR") {
      setLang("en-US");
    } else {
      setLang("tr-TR");
    }
  };
  return (
    <>
      <ButtonGroup
        position={"absolute"}
        top={"5"}
        right={"5"}
        mt="3"
        size="sm"
        zIndex={"overlay"}
        data-aos="zoom-in-up"
      >
        <Tooltip
          hasArrow
          label={(lang === "tr-TR" ? "Sepet:" : "Basket") + " " + items.length}
          bg="gray.300"
          color="black"
          borderRadius={"md"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Link to="/basket">
            <IconButton
              icon={<BsFillBasketFill />}
              bgColor={btnColor}
              onClick={() => setNotification(false)}
              _after={{
                content: '""',
                w: 3,
                h: 3,
                bg: 'red.400',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                left: 6,
                display: notification ? "block" : "none",
              }}
            />
            </Link>
          </motion.div>
        </Tooltip>
        <Tooltip
          hasArrow
          label={lang === "tr-TR" ? "English" : "Türkçe"}
          bg="gray.300"
          color="black"
          borderRadius={"md"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <IconButton
              icon={<ImEarth />}
              onClick={langBtnHandler}
              bgColor={btnColor}
            />
          </motion.div>
        </Tooltip>
        <Tooltip
          hasArrow
          label={colorMode === "light" ? "Dark Mode" : "Light Mode"}
          bg="gray.300"
          color="black"
          borderRadius={"md"}
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <IconButton
              onClick={toggleColorMode}
              bgColor={btnColor}
              icon={
                colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />
              }
            />
          </motion.div>
        </Tooltip>
      </ButtonGroup>
      <Link to="contact">
        <Button
          variant={"link"}
          position={"absolute"}
          bottom={2}
          left={3}
          zIndex="2"
        >
          <FormattedMessage id="contact" />
        </Button>
      </Link>
    </>
  );
}

export default BtnGroup;
