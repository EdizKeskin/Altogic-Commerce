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
  useColorModeValue,
  IconButton,
  ButtonGroup,
  Text,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  AlertDescription,
  Divider,
  HStack,
} from "@chakra-ui/react";
import altogic from "../../api/altogic";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import * as Yup from "yup";
import { Formik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePreferences } from "../../context/preferencesContext";
import { FormattedMessage, useIntl } from "react-intl";

function SignUp() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { animations } = usePreferences();
  const intl = useIntl();

  const handleShow = () => setShow(!show);
  const handleShowConfirm = () => setShowConfirm(!showConfirm);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      intl.formatMessage({ id: "required_field_name" })
    ),
    email: Yup.string()
      .email(intl.formatMessage({ id: "email_invalid" }))
      .required(intl.formatMessage({ id: "required_field_email" })),
    password: Yup.string()
      .min(6, intl.formatMessage({ id: "password_min_length" }))
      .required(intl.formatMessage({ id: "required_field_password" })),
    passwordConfirm: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        intl.formatMessage({ id: "password_match" })
      )
      .required("Required field."),
  });

  async function signin(provider) {
    const { errors } = altogic.auth.signInWithProvider(provider, {
      admin: false,
    });

    if (errors) return setError(errors);
  }

  async function handleSubmit(values, bag) {
    const { name, email, password } = values;
    const { errors, user } = await altogic.auth.signUpWithEmail(
      email,
      password,
      {
        name: name,
        admin: false,
      }
    );

    if (errors) return setError(errors);

    if (user.emailVerified === false) {
      navigate("/verification");
    } else {
      navigate("/");
    }
    bag.resetForm();
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
              <FormattedMessage id="signup" />
            </Heading>
          </Stack>
          {state && state.errors && (
            <Alert status="error" borderRadius={"md"}>
              <AlertIcon />
              <AlertDescription>
                <FormattedMessage id="sign_up_email_error" />
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert status="error" borderRadius={"md"}>
              <AlertIcon />
              <AlertDescription>{error.items[0].message}</AlertDescription>
            </Alert>
          )}

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
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
                width={{ base: "100%", md: "500px" }}
                mx="10px"
                mb={{ base: "20px", md: "0" }}
                borderRadius="lg"
                maxHeight={"fit-content"}
              >
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      id="name"
                      isRequired
                      isInvalid={touched.name && errors.name}
                    >
                      <FormLabel>
                        <FormattedMessage id="username" />
                      </FormLabel>
                      <Input
                        type="text"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        isInvalid={touched.name && errors.name}
                        placeholder="John Doe"
                      />

                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      id="email"
                      mt={3}
                      isRequired
                      isInvalid={touched.email && errors.email}
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
                    <FormControl
                      id="passwordConfirm"
                      mt={1}
                      isRequired
                      isInvalid={
                        touched.passwordConfirm && errors.passwordConfirm
                      }
                    >
                      <FormLabel>
                        <FormattedMessage id="confirm_password" />
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showConfirm ? "text" : "password"}
                          value={values.passwordConfirm}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={
                            touched.passwordConfirm && errors.passwordConfirm
                          }
                          placeholder="********"
                        />
                        <InputRightElement width="4.5rem">
                          <IconButton
                            bg="transparent !important"
                            justifyContent="flex-end"
                            onClick={handleShowConfirm}
                            icon={
                              showConfirm ? (
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
                          mt={3}
                          type="submit"
                          disabled={isSubmitting || !isValid}
                        >
                          <FormattedMessage id="signup" />
                        </Button>

                        <Link to="/signin">
                          <Button
                            colorScheme="teal"
                            variant="link"
                            width="full"
                            mt={3}
                            color="gray.500"
                            fontSize="sm"
                          >
                            <FormattedMessage id="already_have_an_account" />
                          </Button>
                        </Link>
                        <Text fontSize="sm" textAlign="center"></Text>
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

export default SignUp;
