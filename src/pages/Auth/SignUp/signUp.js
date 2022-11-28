import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";

function SignUp() {

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    
  });

  return (
    <Flex align="center" width="full" justifyContent="center" data-aos="fade-up">
      <Box
        bgColor="gray.700"
        boxShadow="dark-lg"
        p="10"
        mt="50px"
        borderRadius="lg"
      >
        <Box textAlign="center">
          <Heading color="white">Sign Up</Heading>
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

        <Box my="5" textAlign="left" boxSize={"md"}>
          <form onSubmit={formik.handleSubmit}>
            <Box display={"flex"}>
              <FormControl>
                <FormLabel color={"white"}>Name</FormLabel>
                <Input
                  name="name"
                  color={"white"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
              </FormControl>

              <FormControl ml={3}>
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                  name="lastName"
                  color={"white"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
              </FormControl>
            </Box>
            <FormControl mt={4}>
              <FormLabel color={"white"}>E-mail</FormLabel>
              <Input
                name="email"
                color={"white"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"white"}>Password</FormLabel>
              <Input
                name="password"
                type="password"
                color={"white"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="none"
                isInvalid={formik.touched.password && formik.errors.password}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"white"}>Password Confirm</FormLabel>
              <Input
                name="passwordConfirm"
                type="password"
                color={"white"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                autoComplete="none"
                isInvalid={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full" mt={4} color={"white"}>
              Sign Up
            </Button>
          </form>
          <Link to="/signin">
            <Button
              colorScheme="teal"
              variant="link"
              width="full"
              mt={3}
              color="gray.500"
              fontSize="sm"
            >
              Already have an account?
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUp;
