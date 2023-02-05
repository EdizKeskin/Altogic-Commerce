import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import altogic from "../../api/altogic";
import * as Yup from "yup";
import { Formik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePreferences } from "../../context/preferencesContext";

function ResetPassword() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const { animations } = usePreferences();
  const [loading, setLoading] = useState(false);

  const { accessToken } = useParams();

  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required field."),
  });

  async function handleSubmit(values) {
    setLoading(true);
    const { errors } = await altogic.auth.resetPwdWithToken(
      accessToken,
      values.password
    );
    if (errors) {
      setError(errors);
    } else {
      setConfirm(true);
    }
    setLoading(false);
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      data-aos={animations === true ? "fade-up" : "none"}
    >
      <Flex align={"center"} justify={"center"} mt={6}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} alignItems={"center"} px={6}>
          {confirm ? (
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
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"} mb={6}>
                  Reset Password
                </Heading>
              </Stack>
              <Alert status="success">
                <AlertIcon />
                <Box>
                  Password reset successfully! You can now{" "}
                  <Link to="/signin">
                    <Text textDecoration={"underline"} fontWeight={"bold"}>
                      login
                    </Text>
                  </Link>
                </Box>
              </Alert>
            </Box>
          ) : (
            <>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Reset Password
                </Heading>
              </Stack>

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
                  password: "",
                  passwordConfirmation: "",
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
                              disabled={isSubmitting || loading}
                              isInvalid={touched.password && errors.password}
                              placeholder="Enter your new password"
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
                          id="passwordConfirmation"
                          mt={3}
                          isRequired
                          isInvalid={
                            touched.passwordConfirmation &&
                            errors.passwordConfirmation
                          }
                        >
                          <FormLabel>Password Confirm</FormLabel>
                          <InputGroup>
                            <Input
                              type={show ? "text" : "password"}
                              value={values.passwordConfirmation}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={isSubmitting || loading}
                              isInvalid={
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation
                              }
                              placeholder="Enter your password again"
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
                          <FormErrorMessage>
                            {errors.passwordConfirmation}
                          </FormErrorMessage>
                        </FormControl>
                        <Button
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          mt={5}
                          w={"full"}
                          type="submit"
                          disabled={isSubmitting || !isValid || loading}
                        >
                          Reset Password
                        </Button>
                      </form>
                    </Stack>
                  </Box>
                )}
              </Formik>
            </>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}

export default ResetPassword;
