import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Button,
  useColorModeValue,
  Tooltip,
  useDisclosure,
  useBreakpointValue,
  Collapse,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaInstagram, FaSteam, FaTwitter } from "react-icons/fa";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { motion } from "framer-motion";

function Card({ item }) {
  const [display, setDisplay] = useState();
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("black", "white");

  console.log(item);

  const draggable = useBreakpointValue({
    base: "none",
    lg: "drag",
  });
  const tapable = useBreakpointValue({
    base: "none",
    lg: { scale: 0.9 },
  });

  return (
    <motion.div
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={tapable}
      dragElastic={0.2}
      {...(draggable === "drag" && {
        drag: true,
      })}
    >
      <Center py={6}>   
          <Box
            w={"full"}
            bg={bg}
            boxShadow={"2xl"}
            borderRadius={"md"}
            textAlign={"center"}
            className="card"
            onMouseEnter={() => {
              setDisplay("none");
              onToggle();
            }}
            onMouseLeave={() => {
              setDisplay();
              onToggle();
            }}
            p={6}
            mx={6}
            mb={5}
          >
            <Avatar
              size={"xl"}
              src={item.avatar}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
              border={"1px solid #eaeaea"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"} color={textColor}>
              {item.name}
            </Heading>
            <Text fontWeight={600} fontSize={"xl"} color={"gray.500"} mb={4}>
              {item.tag}
            </Text>

            <Center>
              {display === "none" ? (
                <AiOutlineUp size={15} color={"gray.500"} />
              ) : (
                <AiOutlineDown size={15} color={"gray.500"} />
              )}
            </Center>

            <Collapse in={isOpen} animateOpacity>
              <Box
                display={"flex"}
                flexDirection="row"
                alignItems={"center"}
                justifyContent="center"
                mb={6}
                mt={4}
              >
                <Tooltip
                  hasArrow
                  label="Instagram"
                  bg="gray.300"
                  color="black"
                  borderRadius={"md"}
                >
                  <Text
                    as={"a"}
                    href={item.sm.instagram}
                    mr="6"
                    target="_blank"
                    rel="noopener noreferrer"
                    color={textColor}
                    _hover={{ color: "teal.200" }}
                    transition="all 0.3s"
                  >
                    <FaInstagram size={"30px"} />
                  </Text>
                </Tooltip>
                <Tooltip
                  hasArrow
                  label="Steam"
                  bg="gray.300"
                  color="black"
                  borderRadius={"md"}
                >
                  <Text
                    as={"a"}
                    href={item.sm.steam}
                    mr="6"
                    target="_blank"
                    rel="noopener noreferrer"
                    color={textColor}
                    _hover={{ color: "teal.200" }}
                    transition="all 0.3s"
                  >
                    <FaSteam size={"30px"} />
                  </Text>
                </Tooltip>
                <Tooltip
                  hasArrow
                  label="Twitter"
                  bg="gray.300"
                  color="black"
                  borderRadius={"md"}
                >
                  <Text
                    as={"a"}
                    href={item.sm.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={textColor}
                    _hover={{ color: "teal.200" }}
                    transition="all 0.3s"
                  >
                    <FaTwitter size={"30px"} />
                  </Text>
                </Tooltip>
              </Box>

              <Link to={`/${item.link}`}>
                <Button
                  flex={1}
                  colorScheme={"teal"}
                  fontSize={"sm"}
                  borderRadius="lg"
                  alignItems={"center"}
                  width={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                  _hover={{
                    transform: "translateY(2px)",
                  }}
                >
                  <FormattedMessage id="card_btn" />
                </Button>
              </Link>
            </Collapse>
          </Box>
      </Center>
    </motion.div>
  );
}

export default Card;
