//create product page
import { FieldArray, Field, Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Popover,
  PopoverTrigger,
  Text,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  Checkbox,
  IconButton,
  PopoverCloseButton,
  PopoverHeader,
  PopoverFooter,
  Flex,
  SimpleGrid,
  FormErrorMessage,
} from "@chakra-ui/react";
import altogic from "../../../api/altogic";
import { BsFillTrashFill } from "react-icons/bs";

function NewCheckbox(props) {
  return (
    <Field name="categories">
      {({ field, form }) => (
        <Checkbox
          type="checkbox"
          colorScheme="green"
          value={props.value}
          {...field}
          isChecked={form.values.categories.includes(props.value)}
          onChange={() => {
            if (!form.values.categories.includes(props.value)) {
              form.setFieldValue(
                "categories",
                form.values.categories.concat(props.value)
              );
            } else {
              const nextValue = form.values.categories.filter(
                (value) => value !== props.value
              );
              form.setFieldValue("categories", nextValue);
            }
          }}
        >
          {props.value}
        </Checkbox>
      )}
    </Field>
  );
}

function NewProduct() {
  const toast = useToast();

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    desc: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    images: Yup.array().required("Required"),
    details: Yup.array().required("Required"),
    discount: Yup.number().max(100, "Discount must be less than 100%").min(0),
    stock: Yup.number().required("Required"),
    categories: Yup.array()
      .required("Select at least one")
      .min(1, "Select at least one"),
  });

  const handleSubmit = async (values, bag) => {
    const newValues = {
      ...values,
      price: Number(values.price),
      images: values.images.map((image) => {
        return image;
      }),
    };

    const result = await altogic.endpoint.post("/products", newValues);

    if (!result.errors) {
      toast({
        title: "Product created.",
        desc: "We've created your product for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        desc: "We were unable to create your product.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    bag.resetForm();
  };

  return (
    <Box m={5}>
      <Text fontSize="2xl" color={"white"}>
        New Product
      </Text>

      <Formik
        initialValues={{
          title: "",
          desc: "",
          price: "",
          images: [],
          details: [],
          categories: [],
          discount: 0,
          stock: 0,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box
                bgColor="gray.800"
                p="3"
                borderRadius="lg"
                my="5"
                textAlign="left"
              >
                <form onSubmit={handleSubmit}>
                  <FormControl mb="4" isInvalid={touched.title && errors.title}>
                    <FormLabel color="white">Title</FormLabel>
                    <Input
                      name="title"
                      color={"white"}
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                      placeholder="Enter title"
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>

                  <FormControl mb="4" isInvalid={touched.desc && errors.desc}>
                    <FormLabel color="white">Description</FormLabel>
                    <Textarea
                      name="desc"
                      color={"white"}
                      minHeight="160px"
                      value={values.desc}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      isInvalid={touched.desc && errors.desc}
                      placeholder="Enter description"
                    />
                    <FormErrorMessage>{errors.desc}</FormErrorMessage>
                  </FormControl>

                  <Box
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <Flex direction={"column"} mr={"4"}>
                      <FormControl
                        mb="4"
                        isInvalid={touched.price && errors.price}
                      >
                        <FormLabel color="white">Price</FormLabel>
                        <Input
                          name="price"
                          color={"white"}
                          type="number"
                          value={values.price}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={touched.price && errors.price}
                          placeholder="0"
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                    <Flex direction={"column"} mr={"4"}>
                      <FormControl mb="4" isInvalid={touched.discount && errors.discount}>
                        <FormLabel color="white">
                          Discount{" "}
                          <Text
                            as={"span"}
                            fontSize={"sm"}
                            fontWeight="hairline"
                          >
                            (in percent)
                          </Text>
                        </FormLabel>
                        <Input
                          name="discount"
                          color={"white"}
                          placeholder="0"
                          type="number"
                          value={values.discount}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={touched.discount && errors.discount}
                        />
                        <FormErrorMessage>{errors.discount}</FormErrorMessage>
                      </FormControl>
                    </Flex>

                    <Flex direction={"column"}>
                      <FormControl mb="4" isInvalid={touched.stock && errors.stock}>
                        <FormLabel color="white">Stock</FormLabel>
                        <Input
                          name="stock"
                          color={"white"}
                          placeholder="0"
                          type="number"
                          value={values.stock}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          isInvalid={touched.stock && errors.stock}
                        />
                        <FormErrorMessage>{errors.stock}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </Box>

                  <FormControl mb="4" isInvalid={touched.categories && errors.categories}>
                    <FormLabel color="white">
                      Categories{" "}
                      <Text as={"span"} fontSize={"sm"} fontWeight="hairline">
                        (Select primary category first)
                      </Text>
                    </FormLabel>
                    <SimpleGrid spacing={4} columns={{ base: 2, sm: 3, md: 5 }}>
                      <NewCheckbox value="Car" />
                      <NewCheckbox value="Home" />
                      <NewCheckbox value="Technology" />
                      <NewCheckbox value="Book" />
                      <NewCheckbox value="Test" />
                    </SimpleGrid>
                    <FormErrorMessage>{errors.categories}</FormErrorMessage>
                  </FormControl>
                  <FormControl mb="4">
                    <FormLabel color="white">Details</FormLabel>
                    <FieldArray
                      name="details"
                      color={"white"}
                      render={(arrayHelpers) => (
                        <div>
                          {values.details &&
                            values.details.map((detail, index) => (
                              <div key={index}>
                                <Box
                                  mb="3"
                                  display="flex"
                                  textAlign="center"
                                  justifyContent="space-between"
                                >
                                  <Input
                                    name={`details.${index}`}
                                    color={"white"}
                                    value={detail}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                  />

                                  <Popover>
                                    <PopoverTrigger>
                                      <IconButton
                                        aria-label="Delete detail"
                                        icon={<BsFillTrashFill />}
                                        variant="outline"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverHeader>Confirm</PopoverHeader>
                                      <PopoverBody>
                                        Are you sure you want to delete this
                                        detail?
                                      </PopoverBody>
                                      <PopoverFooter
                                        display="flex"
                                        justifyContent="space-between"
                                      >
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Delete
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                      </PopoverFooter>
                                    </PopoverContent>
                                  </Popover>
                                </Box>
                              </div>
                            ))}
                          <Button
                            variant="outline"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add detail
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel color="white">Images</FormLabel>
                    <FieldArray
                      name="images"
                      color={"white"}
                      render={(arrayHelpers) => (
                        <div>
                          {values.images &&
                            values.images.map((photo, index) => (
                              <div key={index}>
                                <Box
                                  mb="3"
                                  display="flex"
                                  textAlign="center"
                                  justifyContent="space-between"
                                >
                                  <Input
                                    name={`images.${index}`}
                                    color={"white"}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                  />

                                  <Popover>
                                    <PopoverTrigger>
                                      <IconButton
                                        aria-label="Delete images"
                                        icon={<BsFillTrashFill />}
                                        variant="outline"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverHeader>Confirm</PopoverHeader>
                                      <PopoverBody>
                                        Are you sure you want to delete this
                                        images?
                                      </PopoverBody>
                                      <PopoverFooter
                                        display="flex"
                                        justifyContent="space-between"
                                      >
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Delete
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                      </PopoverFooter>
                                    </PopoverContent>
                                  </Popover>
                                </Box>
                              </div>
                            ))}
                          <Button
                            variant="outline"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add image
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                    width="full"
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
}

export default NewProduct;
