import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  FormControl,
  Box,
  Heading,
  Button,
  Alert,
  AlertIcon,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  ButtonGroup,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import altogic from "../../api/altogic";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAuth } from "../../context/authContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePreferences } from "../../context/preferencesContext";

function SignIn() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const { setSessions } = useAuth();
  const { animations } = usePreferences();

  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signin = (provider) => {
    altogic.auth.signInWithProvider(provider, {
      admin: false,
    });
  };

  async function handleSubmit(values) {
    const { email, password } = values;

    const { errors, user, session } = await altogic.auth.signInWithEmail(
      email,
      password
    );
    if (errors) return setError(errors);
    setUser(user ?? null);
    setSessions(session ?? null);

    navigate("/");
  }

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
              Sign In
            </Heading>
          </Stack>
          {state && state.errors && (
            <Alert
              mt={"4"}
              status="error"
              color="white"
              bgColor="red.600"
              borderRadius="lg"
            >
              <AlertIcon color="red.900" />
              This email is already in use.
            </Alert>
          )}
          {error && (
            <Alert
              mt={"4"}
              status="error"
              color="white"
              bgColor="red.600"
              borderRadius="lg"
            >
              <AlertIcon color="red.900" />
              {error.items[0].message}
            </Alert>
          )}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
              isSubmitting,
              isValid,
            }) => (
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
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isRequired
                      isInvalid={touched.email && errors.email}
                      id="email"
                      mt={3}
                    >
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        isInvalid={touched.email && errors.email}
                        placeholder="Enter your email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="password"
                      mt={3}
                      isRequired
                      isInvalid={touched.password && errors.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={touched.password && errors.password}
                          placeholder="Enter your password"
                        />
                        <InputRightElement width="4.5rem">
                          <IconButton
                            bg="transparent !important"
                            justifyContent="flex-end"
                            onClick={handleShow}
                            icon={
                              show ? (
                                <AiOutlineEyeInvisible size={"25px"} />
                              ) : (
                                <AiOutlineEye size={"25px"} />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Stack spacing={10}>
                      <Flex direction="column">
                        <Button
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          mt={5}
                          type="submit"
                          disabled={isSubmitting || !isValid}
                        >
                          Sign in
                        </Button>

                        <Link to="/signup">
                          <Button
                            colorScheme="teal"
                            variant="link"
                            width="full"
                            mt={3}
                            color="gray.500"
                            fontSize="sm"
                          >
                            Don't have an account?
                          </Button>
                        </Link>
                        <Text fontSize="sm" textAlign="center">
                          Or sign in with
                        </Text>
                        <ButtonGroup
                          justifyContent={"center"}
                          textAlign={"center"}
                          mt={3}
                        >
                          <IconButton
                            colorScheme="teal"
                            onClick={(event) => {
                              event.preventDefault();
                              signin("google");
                            }}
                            icon={<FaGoogle />}
                          />

                          <IconButton
                            colorScheme="teal"
                            onClick={(event) => {
                              event.preventDefault();
                              signin("github");
                            }}
                            icon={<FaGithub />}
                          />

                          <IconButton
                            colorScheme="teal"
                            onClick={(event) => {
                              event.preventDefault();
                              signin("discord");
                            }}
                            icon={<FaDiscord />}
                          />
                        </ButtonGroup>
                      </Flex>
                    </Stack>
                  </form>
                </Stack>
              </Box>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default SignIn;
