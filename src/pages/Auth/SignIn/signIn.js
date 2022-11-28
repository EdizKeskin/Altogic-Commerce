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

function SignIn() {

  const formik = useFormik({
    initialValues: {
      email: "",
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
          <Heading color="white">Sign In</Heading>
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
            <FormControl>
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

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Sign In
            </Button>
          </form>
          <Link to="/signup">
            <Button
              colorScheme="teal"
              variant="link"
              width="full"
              mt={3}
              color="gray.500"
              fontSize="sm"
            >
              Don’t have an account yet?
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignIn;
