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
  HStack,
  Divider,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import altogic from "../../api/altogic";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAuth } from "../../context/authContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePreferences } from "../../context/preferencesContext";
import { FormattedMessage, useIntl } from "react-intl";

function SignIn() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const { setSessions } = useAuth();
  const { animations } = usePreferences();
  const intl = useIntl();

  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: "email_invalid" }))
      .required(intl.formatMessage({ id: "required_field_email" })),
    password: Yup.string()
      .min(6, intl.formatMessage({ id: "password_min_length" }))
      .required(intl.formatMessage({ id: "required_field_password" })),
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
              <FormattedMessage id="signin" />
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
              {state.errors}
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
                      <FormLabel>E-Mail</FormLabel>
                      <Input
                        type="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        isInvalid={touched.email && errors.email}
                        placeholder="johndoe@gmail.com"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="password"
                      mt={3}
                      isRequired
                      isInvalid={touched.password && errors.password}
                    >
                      <FormLabel>
                        <FormattedMessage id="password" />
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={touched.password && errors.password}
                          placeholder="********"
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
                        <Flex flexDirection={"column"} mt={5} gap={5}>
                          <Flex justifyContent={"flex-end"}>
                            <Link to="/forgot-password">
                              <Button
                                variant={"link"}
                                colorScheme="teal"
                                textAlign={"end"}
                              >
                                <FormattedMessage id="forgot_password" />
                              </Button>
                            </Link>
                          </Flex>
                          <Button
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                            disabled={isSubmitting || !isValid}
                          >
                            <FormattedMessage id="signin" />
                          </Button>
                        </Flex>
                        <Link to="/signup">
                          <Button
                            colorScheme="teal"
                            variant="link"
                            width="full"
                            mt={3}
                            color="gray.500"
                            fontSize="sm"
                          >
                            <FormattedMessage id="dont_have_account" />
                          </Button>
                        </Link>
                        <HStack>
                          <Divider />
                          <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                            <FormattedMessage id="or_continue_with" />
                          </Text>
                          <Divider />
                        </HStack>
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
                      <Alert
                        status="info"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <AlertTitle mb={1} fontSize="lg">
                          Admin Account
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                          Email: admin@admin.com
                          <br />
                          Password: admin123
                        </AlertDescription>
                      </Alert>
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
