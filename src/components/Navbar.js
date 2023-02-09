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
  useColorModeValue,
  Tooltip,
  Icon,
  Avatar,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { useBasket } from "../context/basketContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ImEarth } from "react-icons/im";
import { usePreferences } from "../context/preferencesContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { AiOutlineDown } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

const NavLinks = [
  {
    name: "products",
    link: "/",
  },
  {
    name: "contact",
    link: "/contact",
  },
];

const Categories = [
  {
    name: "car",
    link: "/categories/Car",
  },
  {
    name: "home",
    link: "/categories/Home",
  },
  {
    name: "technology",
    link: "/categories/Technology",
  },
  {
    name: "book",
    link: "/categories/Book",
  },
  {
    name: "test",
    link: "/categories/Test",
  },
];

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NavLinks.map((link, i) => (
        <Link to={link.link} key={i}>
          <FormattedMessage id={link.name} />
        </Link>
      ))}
      <Menu>
        <MenuButton variant={"link"} as={Button} rightIcon={<AiOutlineDown />}>
          <FormattedMessage id="categories" />
        </MenuButton>
        <Portal>
          <MenuList>
            {Categories.map((category, i) => (
              <Link to={category.link} key={i}>
                <MenuItem as={"span"} justifyContent={"center"}>
                  <Button variant={"link"}>
                    <FormattedMessage id={category.name} />
                  </Button>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </Stack>
  );
};

const MobileNav = () => {
  const { lang, setLang } = usePreferences();
  const btnColor = useColorModeValue("white.50", "gray.600");
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
        {NavLinks.map((link, i) => (
          <Link to={link.link} key={i}>
            <Text fontSize={"xl"} mb={2}>
              <FormattedMessage id={link.name} />
            </Text>
          </Link>
        ))}

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
              {Categories.map((category, i) => (
                <Link to={category.link} key={i}>
                  <MenuItem as={"span"} justifyContent={"center"}>
                    <Button variant={"link"}>
                      <FormattedMessage id={category.name} />
                    </Button>
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <ButtonGroup size="sm" zIndex={"overlay"}>
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
      </ButtonGroup>
    </Stack>
  );
};

function Navbar() {
  const { items, notification } = useBasket();
  const { isOpen, onToggle } = useDisclosure();
  const { isAuth, signOutCurrentSession, admin } = useAuth();
  const size = useBreakpointValue({ base: "sm", sm: "md" });
  const { lang, setLang } = usePreferences();
  const btnColor = useColorModeValue("white.50", "gray.600");
  const { profilePicture } = useAuth();
  const { animations } = usePreferences();

  const langBtnHandler = () => {
    if (lang === "tr-TR") {
      setLang("en-US");
    } else {
      setLang("tr-TR");
    }
  };

  return (
    <Box data-aos={animations === true ? "fade-down" : "none"}>
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
            display={{ base: "none", sm: "inline-flex" }}
            size="sm"
            zIndex={"overlay"}
            data-aos={animations === true ? "fade-down" : "none"}
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
                <MenuList zIndex={"dropdown"} gap={3}>
                  {admin === true && (
                    <Link to="/admin">
                      <MenuItem as={"span"}>
                        <Button
                          variant={"link"}
                          fontSize={{ base: "2xl", md: "lg" }}
                          size={"lg"}
                          colorScheme={"green"}
                          leftIcon={<MdOutlineAdminPanelSettings size={25} />}
                        >
                          Admin
                        </Button>
                      </MenuItem>
                    </Link>
                  )}
                  <Link to="/profile">
                    <MenuItem as={"span"}>
                      <Button
                        variant={"link"}
                        fontSize={{ base: "2xl", md: "lg" }}
                        size={"lg"}
                        leftIcon={<FiUser size={25} />}
                      >
                        <FormattedMessage id="profile" />
                      </Button>
                    </MenuItem>
                  </Link>
                  <Link to="/orders">
                    <MenuItem as={"span"}>
                      <Button
                        variant={"link"}
                        fontSize={{ base: "2xl", md: "lg" }}
                        size={"lg"}
                        leftIcon={<BsBoxSeam size={25} />}
                      >
                        <FormattedMessage id="orders" />
                      </Button>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem
                    as={"span"}
                    onClick={(event) => {
                      event.preventDefault();
                      signOutCurrentSession();
                    }}
                  >
                    <Button
                      variant={"link"}
                      colorScheme="red"
                      fontSize={{ base: "2xl", md: "lg" }}
                      size={"lg"}
                      leftIcon={<HiOutlineLogout size={25} />}
                    >
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
