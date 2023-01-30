import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useState } from "react";
import { useEffect } from "react";
import ProfileNav from "../../components/ProfileNav";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateAddress, updateUser } from "../../api/storage";
import altogic from "../../api/altogic";

function Address() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  async function handleSubmit(values) {
    const resp = await updateAddress(values);
    if (resp.errors === null) {
      await updateUser();
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const initialAddress = altogic.auth.getUser().address;

  return (
    <Container maxW={"7xl"} mt={10}>
      <Stack
        bg={"gray.800"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 12 }}
        direction={{ base: "column", md: "row" }}
        borderRadius={"md"}
      >
        <ProfileNav />
        <Formik
          initialValues={{
            country: initialAddress === undefined ? "" : initialAddress.country,
            city: initialAddress === undefined ? "" : initialAddress.city,
            address: initialAddress === undefined ? "" : initialAddress.address,
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
              display={"flex"}
              flexDirection={"column"}
              ml={{ base: 0, md: 10 }}
              mt={{ base: 10, md: 0 }}
              px={{ base: 10, md: 0 }}
            >
              <form onSubmit={handleSubmit}>
                <Heading
                  color={"white"}
                  textAlign={{ base: "center", md: "start" }}
                >
                  Add your address
                </Heading>
                <Divider my={4} />

                <Box display={"flex"} alignItems={"center"}>
                  <FormControl
                    mr={8}
                    isRequired
                    isInvalid={touched.email && errors.email}
                  >
                    <FormLabel>Country</FormLabel>
                    <AutoComplete isInvalid={touched.country && errors.country}>
                      <AutoCompleteInput
                        placeholder="Turkey"
                        id="country"
                        value={values.country || selectedCountry}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        isInvalid={touched.country && errors.country}
                      />
                      <AutoCompleteList>
                        {countries.map((country, oid) => (
                          <AutoCompleteItem
                            key={`option-${oid}`}
                            value={country.name}
                            textTransform="capitalize"
                            align="center"
                            onClick={() => {
                              values.country = country.name;
                              setSelectedCountry(country.name);
                            }}
                          >
                            <Text ml="4">{country.name}</Text>
                          </AutoCompleteItem>
                        ))}
                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                      </AutoCompleteList>
                      <FormErrorMessage>{errors.country}</FormErrorMessage>
                    </AutoComplete>
                  </FormControl>

                  <FormControl
                    id="city"
                    isRequired
                    isInvalid={touched.city && errors.city}
                  >
                    <FormLabel>City</FormLabel>
                    <Input
                      placeholder="Istanbul"
                      w={"full"}
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      isInvalid={touched.city && errors.city}
                    />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                  </FormControl>
                </Box>

                <FormControl
                  id="address"
                  mt={4}
                  isRequired
                  isInvalid={touched.address && errors.address}
                >
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    placeholder="Enter your address"
                    w={"full"}
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    isInvalid={touched.address && errors.address}
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>

                <Button
                  mt={4}
                  colorScheme={"green"}
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Save
                </Button>
              </form>
            </Box>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}

export default Address;
