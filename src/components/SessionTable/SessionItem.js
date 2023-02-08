import {
  Flex,
  Stack,
  SimpleGrid,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import altogic from "../../api/altogic";
import { useAuth } from "../../context/authContext";

function SessionItem(props) {
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const { signOutSelectedSession } = useAuth();
  const [loading, setLoading] = useState(false);

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
                <FormattedMessage id="created_at" />
              </Text>
              {format(new Date(props.session.creationDtm), "dd/MM/yyyy HH:mm")}
            </Flex>
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems={{ base: "flex-end", md: "flex-start" }}
            >
              <Text fontWeight="bold" fontSize={"xl"} mr={4}>
                <FormattedMessage id="browser" />
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
                <FormattedMessage id="os" />
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
                  <FormattedMessage id="sign_out" />
                </Button>
                {isCurrentSession ? (
                  <p>
                    <FormattedMessage id="current_session" />
                  </p>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SessionItem;
