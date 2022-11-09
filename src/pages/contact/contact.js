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
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { IoIosReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useLang } from "../../context/langContext";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Contact() {
  function getRandom() {
    return Math.floor(
      Math.pow(10, 12 - 1) + Math.random() * 9 * Math.pow(10, 12 - 1)
    );
  }

  const [phone, setPhone] = useState(getRandom().toString());
  const bg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const btnColor = useColorModeValue("white.50", "gray.600");
  const { lang } = useLang();
  const { colorMode } = useColorMode();

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
        console.log("SUCCESS!");
        resetForm();
        Swal.fire({
          position: "center",
          icon: "success",
          title: lang === "tr-TR" ? "Mesajınız gönderildi." : "Message sent.",
          showConfirmButton: false,
          background: colorMode === "dark" ? "#2D3748" : "",
          color: colorMode === "dark" ? "#fff" : "",
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            lang === "tr-TR"
              ? "Mesajınız iletilemedi."
              : "Message could not be delivered.",
          showConfirmButton: false,
          background: colorMode === "dark" ? "#2D3748" : "",
          color: colorMode === "dark" ? "#fff" : "",
          timer: 2000,
        });
      }
    },
  });

  return (
    <Flex align="center" justifyContent="center" data-aos="fade-up">
      <Box position={"absolute"} top={"5"} left={"5"} mt="3">
        <Link to="/">
          <IconButton icon={<IoIosReturnLeft />} bgColor={btnColor} />
        </Link>
      </Box>

      <Box
        bgColor={bg}
        backdropFilter={"blur(2px)"}
        boxShadow="dark-lg"
        p="10"
        mt="100px"
        boxSize={"xl"}
        mx="10px"
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
                placeholder={
                  lang === "tr-TR"
                    ? "İsiminizi girin"
                    : "Please enter your name"
                }
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
                placeholder={
                  lang === "tr-TR"
                    ? "Mailinizi girin"
                    : "Please enter your email"
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={textColor}>
                <FormattedMessage id="phone" />
              </FormLabel>
              <Flex align={"center"} justifyContent={"space-between"}>
                <PhoneInput
                  country={"tr"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputClass="phone-input"
                />
                <motion.div whileTap={{ scale: 0.8 }}>
                  <Button
                    colorScheme={"red"}
                    onClick={() => setPhone(getRandom().toString())}
                  >
                    no
                  </Button>
                </motion.div>
              </Flex>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel color={textColor}>
                <FormattedMessage id="formMessage" />
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
