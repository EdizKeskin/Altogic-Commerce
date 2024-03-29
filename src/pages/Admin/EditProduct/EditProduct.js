//create product page
import { useEffect, useState } from "react";
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
  ButtonGroup,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import altogic from "../../../api/altogic";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../api/storage";
import CustomSpinner from "../../../components/Spinner";
import { FormattedMessage, useIntl } from "react-intl";
import { useProduct } from "../../../context/productContext";

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

function EditProduct() {
  const toast = useToast();
  const { setTrigger } = useProduct();
  const { product_id } = useParams();
  const intl = useIntl();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required(intl.formatMessage({ id: "required_field" })),
    desc: Yup.string().required(intl.formatMessage({ id: "required_field" })),
    price: Yup.number().required(intl.formatMessage({ id: "required_field" })),
    images: Yup.array().required(intl.formatMessage({ id: "required_field" })),
    details: Yup.array().required(intl.formatMessage({ id: "required_field" })),
    discount: Yup.number()
      .max(100, intl.formatMessage({ id: "discount_max" }))
      .min(0),
    categories: Yup.array()
      .required(intl.formatMessage({ id: "categories_required" }))
      .min(1, intl.formatMessage({ id: "categories_required" })),
  });
  //get product by id
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      const result = await getProductById(product_id);
      setProduct(result.data);
    };
    getProduct();
  }, [product_id]);

  const handleSubmit = async (values) => {
    const {
      title,
      desc,
      price,
      images,
      details,
      categories,
      discount,
      stock,
      isDisabled,
    } = values;

    try {
      const resp = await altogic.db
        .model("products")
        .object(product_id)
        .update({
          title,
          desc,
          price,
          images,
          details,
          categories,
          discount,
          stock,
          isDisabled,
        });
      if (resp.errors === null) {
        toast({
          title: intl.formatMessage({ id: "product_updated" }),
          description: intl.formatMessage({ id: "product_updated_desc" }),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <CustomSpinner />;
  }
  const deleteProduct = async () => {
    try {
      const resp = await altogic.db
        .model("products")
        .object(product_id)
        .delete();
      if (resp.errors === null) {
        toast({
          title: intl.formatMessage({ id: "product_deleted" }),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTrigger(true);
        navigate(-1);
      }
    } catch (error) {
      toast({
        title: intl.formatMessage({ id: "product_deleted_error" }),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box m={5}>
      <Breadcrumb mt={{ base: 3, md: 0 }} spacing="6px" p="3">
        <BreadcrumbItem>
          <Link to="/admin">
            <Button variant={"link"} textTransform={"capitalize"}>
              Admin
            </Button>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={"/admin/products"}>
            <Button variant={"link"} textTransform={"capitalize"}>
              <FormattedMessage id="products" />
            </Button>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button variant={"link"} textTransform={"capitalize"}>
            {product.title}
          </Button>
        </BreadcrumbItem>
      </Breadcrumb>

      <Formik
        initialValues={{
          title: product.title,
          desc: product.desc,
          price: product.price,
          images: product.images,
          details: product.details,
          categories: product.categories,
          discount: product.discount,
          stock: product.stock,
          isDisabled: product.isDisabled,
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
                <Text fontSize="2xl" color={"white"} mb={10}>
                  <FormattedMessage id="edit_product" />
                </Text>
                <form onSubmit={handleSubmit}>
                  <FormControl mb="4" isInvalid={touched.title && errors.title}>
                    <FormLabel color="white">
                      <FormattedMessage id="product_title" />
                    </FormLabel>
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
                    <FormLabel color="white">
                      <FormattedMessage id="product_desc" />
                    </FormLabel>
                    <Textarea
                      name="desc"
                      color={"white"}
                      minHeight="160px"
                      value={values.desc}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      isInvalid={touched.desc && errors.desc}
                      placeholder={intl.formatMessage({ id: "product_desc" })}
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
                        <FormLabel color="white">
                          <FormattedMessage id="price" />
                        </FormLabel>
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
                      <FormControl
                        mb="4"
                        isInvalid={touched.discount && errors.discount}
                      >
                        <FormLabel color="white">
                          <FormattedMessage id="discount" />{" "}
                          <Text
                            as={"span"}
                            fontSize={"sm"}
                            fontWeight="hairline"
                          >
                            (<FormattedMessage id="in_percent" />)
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
                      <FormControl
                        mb="4"
                        isInvalid={touched.stock && errors.stock}
                      >
                        <FormLabel color="white">
                          <FormattedMessage id="stock" />
                        </FormLabel>
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

                  <FormControl
                    mb="4"
                    isInvalid={touched.categories && errors.categories}
                  >
                    <FormLabel color="white">
                      <FormattedMessage id="categories" />{" "}
                      <Text as={"span"} fontSize={"sm"} fontWeight="hairline">
                        (
                        <FormattedMessage id="select_primary_categorie_first" />
                        )
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
                    <FormLabel color="white">
                      <FormattedMessage id="product_details" />
                    </FormLabel>
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
                                        <FormattedMessage id="delete_detail_desc" />
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
                                          <FormattedMessage id="delete" />
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <FormattedMessage id="cancel" />
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
                            <FormattedMessage id="add_detail" />
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <FormControl mb="4">
                    <FormLabel color="white">
                      <FormattedMessage id="images" />
                    </FormLabel>
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
                                        <FormattedMessage id="delete_image_desc" />
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
                                          <FormattedMessage id="delete" />
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <FormattedMessage id="cancel" />
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
                            <FormattedMessage id="add_image" />
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <FormControl
                    mb="4"
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={3}
                  >
                    <FormattedMessage id="is_disabled" />:
                    <Checkbox
                      name="isDisabled"
                      onChange={handleChange}
                      colorScheme="green"
                      defaultChecked={values.isDisabled === true}
                    />
                  </FormControl>
                  <ButtonGroup w={"full"}>
                    <Button
                      colorScheme="green"
                      type="submit"
                      isLoading={isSubmitting}
                      width="full"
                    >
                      <FormattedMessage id="save" />
                    </Button>
                    <Tooltip
                      label={intl.formatMessage({ id: "delete_product" })}
                      hasArrow
                      bg="gray.300"
                      color="black"
                      borderRadius={"md"}
                    >
                      <IconButton
                        icon={<BsTrash size={20} />}
                        onClick={() => deleteProduct()}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
}

export default EditProduct;
