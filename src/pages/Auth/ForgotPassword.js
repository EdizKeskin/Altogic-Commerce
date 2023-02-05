import {
  Flex,
  FormControl,
  Box,
  Heading,
  Button,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  FormErrorMessage,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import altogic from "../../api/altogic";

import { usePreferences } from "../../context/preferencesContext";

function ForgotPassword() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { animations } = usePreferences();

  useEffect(() => {
    const getUsers = async () => {
      const result = await altogic.db.model("users").get();
      setUsers(result.data);
    };
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = users.find((user) => user.email === email);
    if (user) {
      setError("");
      const { errors } = await altogic.auth.sendResetPwdEmail(email);
      if (errors) {
        setError(errors.items[0].message);
        console.log(errors);
      } else setSuccess(true);
    } else {
      setError("This email is not registered");
    }
    setLoading(false);
  };

  return (
    <Flex
      align="center"
      justifyContent="center"
      data-aos={animations === true ? "fade-up" : "none"}
    >
      <Flex align={"center"} justify={"center"} mt={6}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} alignItems={"center"} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Reset Password
            </Heading>
          </Stack>

          <Box
            bgColor={bg}
            backdropFilter={"blur(2px)"}
            boxShadow="dark-lg"
            p="10"
            mt="100px"
            mx="10px"
            width={{ base: "100%", md: "500px" }}
            mb={{ base: "20px", md: "0" }}
            borderRadius="lg"
            maxHeight={"fit-content"}
          >
            {success === true ? (
              <Alert status="success" borderRadius={"md"}>
                <AlertIcon />
                <AlertDescription>
                  Please check your email for a link to reset your password.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl
                    isRequired
                    id="email"
                    isInvalid={email === "" ? true : false}
                    mt={3}
                  >
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>
                  <Flex flexDirection={"column"} textAlign={"center"} gap={3}>
                    {error && <Text color={"red.400"}>{error}</Text>}
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      disabled={loading}
                    >
                      Reset Password
                    </Button>
                  </Flex>
                </Stack>
              </form>
            )}
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default ForgotPassword;
