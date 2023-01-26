import {
  Flex,
  Stack,
  SimpleGrid,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import altogic from "../../api/altogic";
import { useAuth } from "../../context/authContext";

function SessionItem(props) {
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const { signOutSelectedSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const humanReadableDate = (datetime) => {
    return new Date(datetime).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: "false",
      minute: "2-digit",
    });
  };
  const killSession = async (event) => {
    setLoading(true);
    event.preventDefault();
    await signOutSelectedSession(props.session.token);
    setLoading(false);
  };

  const isCurrentSession =
    props.session.token === altogic.auth.getSession().token;

  return (
    <Flex>
      <Stack
        direction={{
          base: "column",
        }}
        bg={{
          md: bg,
        }}
        shadow="lg"
        mx={3}
        w="full"
        mt={10}
      >
        <Flex
          direction={{
            base: "row",
            md: "column",
          }}
          bg={bg2}
          py={3}
        >
          <SimpleGrid
            spacingY={3}
            columns={{
              base: 1,
              md: 4,
            }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
            alignItems={{ base: "center", md: "flex-start" }}
            justifyItems={{ base: "start", md: "center" }}
          >
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "flex-end", md: "flex-start" }}
            >
              <Text fontWeight="bold" fontSize={"xl"} mr={4}>
                CREATION DATE
              </Text>
              {humanReadableDate(props.session.creationDtm)}
            </Flex>
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "flex-end", md: "flex-start" }}
            >
              <Text fontWeight="bold" fontSize={"xl"} mr={4}>
                BROWSER
              </Text>
              <Text as={"span"} fontSize={"xl"} fontWeight={"hairline"}>
                {props.session.userAgent.family}
              </Text>
            </Flex>
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "flex-end", md: "flex-start" }}
            >
              <Text fontWeight="bold" fontSize={"xl"} mr={4}>
                OPERATING SYSTEM
              </Text>
              <Text as="span" fontSize={"xl"} fontWeight={"hairline"}>
                {props.session.userAgent.os.family}
              </Text>
            </Flex>
            <Flex
              justify={{
                md: "end",
              }}
            >
              <Flex direction={"column"}>
                <Button
                  isLoading={loading}
                  onClick={killSession}
                  colorScheme="teal"
                  variant={isCurrentSession ? "solid" : "outline"}
                >
                  Sign Out
                </Button>
                {isCurrentSession ? <p>(Current Session)</p> : <></>}
              </Flex>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SessionItem;
