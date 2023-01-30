import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiUser, FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function ProfileNav() {
  const location = useLocation().pathname;

  const buttonList = [
    {
      name: "Profile",
      icon: <FiUser />,
      path: "/profile",
    },
    {
      name: "Sessions",
      icon: <FiUsers />,
      path: "/sessions",
    },
    {
      name: "Orders",
      icon: <BsBoxSeam />,
      path: "/orders",
    },
    {
      name: "Adress",
      icon: <IoLocationOutline />,
      path: "/adress",
    },
  ];

  const selectedButton = buttonList.find((button) => button.path === location);
  const notSelectedButtons = buttonList.filter(
    (button) => button.path !== location
  );

  return (
    <Flex
      flexDirection={"column"}
      ml={{ base: 0, md: 2 }}
      alignItems={{ base: "normal", md: "flex-start" }}
    >
      {buttonList.map((button) => (
        <Link to={button.path} key={button.path}>
          <Button
            display={{ base: "none", md: "flex" }}
            w={"full"}
            variant="ghost"
            colorScheme={selectedButton.name === button.name ? "teal" : "gray"}
            leftIcon={button.icon}
          >
            {button.name}
          </Button>
        </Link>
      ))}

      <Accordion
        allowMultiple
        borderTop={"none"}
        display={{ base: "block", md: "none" }}
      >
        <AccordionItem borderTop={"none"}>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="center"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"md"}
              fontWeight={"semibold"}
              color={"teal.200"}
            >
              {selectedButton.icon} &nbsp; {selectedButton.name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            pb={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            {notSelectedButtons.map((button) => (
              <Link to={button.path} key={button.path}>
                <Button
                  w={"full"}
                  variant="ghost"
                  colorScheme={
                    selectedButton.name === button.name ? "teal" : "gray"
                  }
                  leftIcon={button.icon}
                >
                  {button.name}
                </Button>
              </Link>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default ProfileNav;
