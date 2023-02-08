import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
  AlertIcon,
  useColorModeValue,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { usePreferences } from "../../context/preferencesContext";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import * as yup from "yup";

function Contact() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const { animations } = usePreferences();
  const intl = useIntl();
  const toast = useToast();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: "email_invalid_test" }))
      .required(intl.formatMessage({ id: "required_field" })),
    name: yup
      .string()
      .min(3, intl.formatMessage({ id: "name_min_length" }))
      .required(intl.formatMessage({ id: "required_field" })),
    message: yup
      .string()
      .min(10, intl.formatMessage({ id: "message_min_length" }))
      .required(intl.formatMessage({ id: "required_field" })),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        emailjs.send(
          "gmail",
          process.env.REACT_APP_TEMPLATE_ID,
          values,
          process.env.REACT_APP_EMAIL_ID
        );
        resetForm();
        toast({
          title: intl.formatMessage({ id: "message_sent" }),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: intl.formatMessage({ id: "message_not_sent" }),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Flex
      align="center"
      justifyContent="center"
      data-aos={animations === true ? "fade-up" : "none"}
    >
      <Box
        bgColor={bg}
        backdropFilter={"blur(2px)"}
        boxShadow="dark-lg"
        p="10"
        mt={10}
        boxSize={{ base: "90%", md: "xl" }}
        mx="10px"
        mb={{ base: "20px", md: "0" }}
        borderRadius="lg"
        maxHeight={"fit-content"}
      >
        <Box textAlign="center">
          <Heading color={textColor}>
            <FormattedMessage id="contact" />
          </Heading>
        </Box>

        <Box my={5}>
          {formik.errors.general && (
            <Alert
              status="error"
              color="white"
              bgColor="red.600"
              borderRadius="lg"
            >
              <AlertIcon color="red.900" />
              {formik.errors.general}
            </Alert>
          )}
        </Box>

        <Box my="5" textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel color={textColor}>
                <FormattedMessage id="formName" />
              </FormLabel>
              <Input
                name="name"
                color={textColor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isInvalid={formik.touched.name && formik.errors.name}
                placeholder={"John Doe"}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel color={textColor}>E-Mail</FormLabel>
              <Input
                name="email"
                color={textColor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
                placeholder={"johndoe@gmail.com"}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel color={textColor}>
                <FormattedMessage id="form_message" />
              </FormLabel>
              <Textarea
                name="message"
                color={textColor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                autoComplete="none"
                isInvalid={formik.touched.message && formik.errors.message}
                maxHeight="100px"
                resize={"none"}
                placeholder={intl.formatMessage({ id: "form_message" })}
              />
            </FormControl>
            <motion.div whileTap={{ scale: 0.8 }}>
              <Button type="submit" colorScheme="teal" width="full" mt={4}>
                <FormattedMessage id="formSubmit" />
              </Button>
            </motion.div>
          </form>
          <Link to="/">
            <Button
              colorScheme="teal"
              variant="link"
              width="full"
              mt={3}
              color="gray.500"
              fontSize="md"
            >
              <FormattedMessage id="btn_404" />
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Contact;
