import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useBreakpointValue,
  useDisclosure,
  ButtonGroup,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useBasket } from "../context/basketContext";
import {
  BsFillBasketFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ImEarth } from "react-icons/im";
import { useLang } from "../context/langContext";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <Link to="/">
        <Text>Products</Text>
      </Link>
      <Link to="/contact">
        <Text>Contact</Text>
      </Link>
    </Stack>
  );
};

const MobileNav = () => {
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
    <Stack bg="gray.800" p={4} display={{ sm: "none" }}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Link to="/">
          <Text fontWeight={600} color="gray.200" mb="2">
            Products
          </Text>
          <Link to="/signup">
            <Text fontWeight={600} color="gray.200">
              Sign Up
            </Text>
          </Link>
        </Link>
      </Flex>
      <ButtonGroup
        size="sm"
        zIndex={"overlay"}
      >
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
    </Stack>
  );
};

function Navbar() {
  const { items } = useBasket();
  const { isOpen, onToggle } = useDisclosure();
  const size = useBreakpointValue({ base: "sm", sm: "md" });
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
    <Box data-aos="fade-down">
      <Flex
        bg="gray.800"
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.900"
        align={"center"}
      >
        <Flex
          flex={{ base: 1, sm: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", sm: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <IoClose color="white" w={5} h={20} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            _hover={{
              bg: "gray.900",
            }}
          />
        </Flex>
        <Flex
          alignItems="center"
          flex={{ base: 1 }}
          justify={{ base: "left", sm: "start" }}
        >
          <Text
            textAlign={"left"}
            fontFamily={"heading"}
            color="white"
            as={"h1"}
            fontSize="xl"
          >
            Logo
          </Text>

          <Flex display={{ base: "none", sm: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, sm: 0 }}
          justify={"flex-start"}
          direction={"row"}
          spacing={6}
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <ButtonGroup
            display={{ base: "none", lg: "inline-flex" }}
            size="sm"
            zIndex={"overlay"}
            data-aos="fade-down"
          >
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
                    colorMode === "light" ? (
                      <BsFillMoonFill />
                    ) : (
                      <BsFillSunFill />
                    )
                  }
                />
              </motion.div>
            </Tooltip>
          </ButtonGroup>
          <Link to="/signin">
            <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            {" "}
            <Button
              display={{ base: "none", sm: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>

        <>
          {items.length > 0 && (
            <Link to="/basket">
              <Button
                variant="outline"
                colorScheme={"green"}
                size={size}
                ml={4}
                leftIcon={<BsFillBasketFill />}
              >
                ({items.length})
              </Button>
            </Link>
          )}
        </>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

export default Navbar;
