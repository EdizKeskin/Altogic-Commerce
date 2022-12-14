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
  Icon,
  Avatar,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useBasket } from "../context/basketContext";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ImEarth } from "react-icons/im";
import { useLang } from "../context/langContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { AiOutlineDown } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <Link to="/">
        <FormattedMessage id="products" />
      </Link>
      <Link to="/contact">
        <FormattedMessage id="contact" />
      </Link>
      <Menu>
        <MenuButton variant={"link"} as={Button} rightIcon={<AiOutlineDown />}>
          <FormattedMessage id="categories" />
        </MenuButton>
        <Portal>
          <MenuList>
            <Link to="/categories/Car">
              <MenuItem as={"span"} justifyContent={"center"}>
                <Button variant={"link"}>
                  <FormattedMessage id="car" />
                </Button>
              </MenuItem>
            </Link>
            <Link to="/categories/Home">
              <MenuItem as={"span"} justifyContent={"center"}>
                <Button variant={"link"}>
                  <FormattedMessage id="home" />
                </Button>
              </MenuItem>
            </Link>
            <Link to="/categories/Technology">
              <MenuItem as={"span"} justifyContent={"center"}>
                <Button variant={"link"}>
                  <FormattedMessage id="technology" />
                </Button>
              </MenuItem>
            </Link>
            <Link to="/categories/Test">
              <MenuItem as={"span"} justifyContent={"center"}>
                <Button variant={"link"}>Test</Button>
              </MenuItem>
            </Link>
          </MenuList>
        </Portal>
      </Menu>
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
        direction={"column"}
        alignItems={"flex-start"}
        _hover={{
          textDecoration: "none",
        }}
        mb={4}
      >
        <Link to="/">
          <Text fontSize={"xl"} mb={"3"}>
            Products
          </Text>
        </Link>
        <Link to="/contact">
          <Text fontSize={"xl"} mb={"3"}>
            Contact
          </Text>
        </Link>
        <Menu>
          <MenuButton
            variant={"link"}
            as={Button}
            rightIcon={<AiOutlineDown />}
            fontSize={"xl"}
          >
            <FormattedMessage id="categories" />
          </MenuButton>
          <Portal>
            <MenuList>
              <Link to="/categories/Car">
                <MenuItem as={"span"} justifyContent={"center"}>
                  <Button variant={"link"}>
                    <FormattedMessage id="car" />
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/categories/Home">
                <MenuItem as={"span"} justifyContent={"center"}>
                  <Button variant={"link"}>
                    <FormattedMessage id="home" />
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/categories/Technology">
                <MenuItem as={"span"} justifyContent={"center"}>
                  <Button variant={"link"}>
                    <FormattedMessage id="technology" />
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/categories/Test">
                <MenuItem as={"span"} justifyContent={"center"}>
                  <Button variant={"link"}>Test</Button>
                </MenuItem>
              </Link>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <ButtonGroup size="sm" zIndex={"overlay"}>
        <Tooltip
          hasArrow
          label={lang === "tr-TR" ? "English" : "T??rk??e"}
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
  const { items, notification } = useBasket();
  const { isOpen, onToggle } = useDisclosure();
  const { isAuth, signOutCurrentSession, admin } = useAuth();
  const size = useBreakpointValue({ base: "sm", sm: "md" });
  const { lang, setLang } = useLang();
  const btnColor = useColorModeValue("white.50", "gray.600");
  const { colorMode, toggleColorMode } = useColorMode();
  const { profilePicture } = useAuth();

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
          <Link to="/">
            <Text
              textAlign={"left"}
              fontFamily={"heading"}
              color="white"
              as={"h1"}
              fontSize="xl"
            >
              Logo
            </Text>
          </Link>
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
              label={lang === "tr-TR" ? "English" : "T??rk??e"}
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
          {isAuth === false ? (
            <>
              <Link to="/signin">
                <Button
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  variant={"link"}
                  mr={-3}
                >
                  <FormattedMessage id="signin" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  <FormattedMessage id="signup" />
                </Button>
              </Link>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar src={profilePicture} />
              </MenuButton>
              <Portal>
                <MenuList>
                  {admin === true && (
                    <Link to="/admin">
                      <MenuItem as={"span"}>
                        <Button variant={"link"} colorScheme={"green"}>
                          Admin
                        </Button>
                      </MenuItem>
                    </Link>
                  )}
                  <Link to="/profile">
                    <MenuItem as={"span"}>
                      <Button variant={"link"}>
                        <FormattedMessage id="profile" />
                      </Button>
                    </MenuItem>
                  </Link>
                  <Link to="/orders">
                    <MenuItem as={"span"}>
                      <Button variant={"link"}>
                        <FormattedMessage id="orders" />
                      </Button>
                    </MenuItem>
                  </Link>

                  <Link to="/sessions">
                    <MenuItem as={"span"}>
                      <Button variant={"link"}>
                        <FormattedMessage id="sessions" />
                      </Button>
                    </MenuItem>
                  </Link>

                  <MenuItem
                    as={"span"}
                    onClick={(event) => {
                      event.preventDefault();
                      signOutCurrentSession();
                    }}
                  >
                    <Button variant={"link"} colorScheme="red">
                      <FormattedMessage id="signout" />
                    </Button>
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          )}
        </Stack>

        <>
          {items.length > 0 && (
            <Link to="/basket">
              <Button
                variant="outline"
                colorScheme={"green"}
                size={size}
                ml={4}
              >
                <Box pos="relative" display="inline-block">
                  <Icon
                    boxSize={6}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </Icon>
                  <Box
                    pos="absolute"
                    top="-1px"
                    right="-1px"
                    px={2}
                    py={1}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="red.100"
                    transform="translate(50%,-50%)"
                    bg="red.500"
                    rounded="full"
                  >
                    {notification}
                  </Box>
                </Box>
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
