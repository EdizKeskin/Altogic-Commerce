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
import { FormattedMessage, useIntl } from "react-intl";

function ResetPassword() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const { animations } = usePreferences();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const { accessToken } = useParams();

  const handleShow = () => setShow(!show);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, intl.formatMessage({ id: "password_min_length" }))
      .required(intl.formatMessage({ id: "required_field_password" })),
    passwordConfirmation: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        intl.formatMessage({ id: "password_match" })
      )
      .required(intl.formatMessage({ id: "required_field" })),
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
                  <FormattedMessage id="reset_password" />
                </Heading>
              </Stack>
              <Alert status="success">
                <AlertIcon />
                <Box>
                  <FormattedMessage id="password_reset_success" />{" "}
                  <Link to="/signin">
                    <Text textDecoration={"underline"} fontWeight={"bold"}>
                      <FormattedMessage id="signin" />
                    </Text>
                  </Link>
                </Box>
              </Alert>
            </Box>
          ) : (
            <>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  <FormattedMessage id="reset_password" />
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
                          <FormLabel>
                            <FormattedMessage id="password" />
                          </FormLabel>
                          <InputGroup>
                            <Input
                              type={show ? "text" : "password"}
                              value={values.password}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={isSubmitting || loading}
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
                          id="passwordConfirmation"
                          mt={3}
                          isRequired
                          isInvalid={
                            touched.passwordConfirmation &&
                            errors.passwordConfirmation
                          }
                        >
                          <FormLabel>
                            <FormattedMessage id="confirm_password" />
                          </FormLabel>
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
                          <FormattedMessage id="reset_password" />
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
