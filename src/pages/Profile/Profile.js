import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useToast,
  Container,
  FormControl,
  FormLabel,
  Input,
  Switch,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  uploadProfilePicture,
  updateProfilePictureFieldOnDatabase,
  updateUser,
  removeProfilePhoto,
  deleteProfilePictureFieldOnDatabase,
  updateName,
} from "../../api/storage";
import altogic from "../../api/altogic";
import { useAuth } from "../../context/authContext";
import ProfileNav from "../../components/ProfileNav";
import { usePreferences } from "../../context/preferencesContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";

function Profile() {
  const toast = useToast();
  const { profilePicture, setProfilePicture } = useAuth();
  const [name, setName] = useState(altogic.auth.getUser().name);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { animations, setAnimations } = usePreferences();
  const [error, setError] = useState();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required field."),
  });

  const handleFileSelect = async (event) => {
    setLoading(true);
    await handleFileUpload(event.target.files[0]);
  };
  const handleFileUpload = async (file) => {
    const resp = await uploadProfilePicture(file);
    setLoading(false);
    if (resp.errors === null) {
      const updateResponse = await updateProfilePictureFieldOnDatabase(
        resp.data.publicPath,
        setProfilePicture(resp.data.publicPath)
      );
      if (updateResponse.errors === null) {
        await updateUser();
        toast({
          title: "Profile picture updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating profile picture",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error uploading profile picture",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const removePhoto = async () => {
    setRemoveLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRemoveLoading(false);
    const resp = await removeProfilePhoto();
    if (resp.errors === null) {
      await deleteProfilePictureFieldOnDatabase();
      await updateUser();
      setProfilePicture(require("../../assets/pp_blank.png"));
      toast({
        title: "Profile picture removed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error removing profile picture",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  async function handleSubmit(values, bag) {
    setLoading(true);
    const { oldPassword, newPassword } = values;
    const { errors } = await altogic.auth.changePassword(
      newPassword,
      oldPassword
    );

    if (errors === null) {
      toast({
        title: "Password changed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setError("");
    } else {
      toast({
        title: "Error changing password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError(errors.items[0].message);
    }
    setLoading(false);
    bag.resetForm();
  }

  const handleSave = async (event) => {
    setLoading(true);
    event.preventDefault();
    const resp = await updateName(name);
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
    setLoading(false);
  };

  const animationsHandler = async (event) => {
    setAnimations(event.target.checked);
  };

  const handleShow = () => setShow(!show);
  const handleShowConfirm = () => setShowConfirm(!showConfirm);

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
        <Flex flexDirection={"column"}>
          <Text
            fontSize={"2xl"}
            fontWeight={700}
            mb={2}
            textTransform={"uppercase"}
            pl={10}
          >
            Profile & Settings
          </Text>
          <Box w={"full"}>
            <Box p={6} textAlign={"center"}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={10}
              >
                <Box>
                  {profilePicture === require("../../assets/pp_blank.png") ? (
                    <Avatar
                      size={"xl"}
                      src={profilePicture}
                      alt={"Profile"}
                      mb={4}
                      pos={"relative"}
                      cursor="pointer"
                      _hover={{
                        filter: "grayscale(100%)",
                      }}
                      referrerPolicy="no-referrer"
                    >
                      {" "}
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="file"
                        onChange={handleFileSelect}
                      />
                    </Avatar>
                  ) : (
                    <Avatar
                      size={"xl"}
                      src={profilePicture}
                      alt={"Uploaded Profile"}
                      mb={4}
                      cursor="pointer"
                      pos={"relative"}
                      _hover={{
                        filter: "grayscale(100%)",
                      }}
                      referrerPolicy="no-referrer"
                    >
                      {" "}
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="file"
                        onChange={handleFileSelect}
                      />
                    </Avatar>
                  )}
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {name ? name.toUpperCase() : altogic.auth.getUser().email}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} mb={4}>
                    {altogic.auth.getUser().provider === "altogic"
                      ? "Email"
                      : altogic.auth
                          .getUser()
                          .provider.charAt(0)
                          .toUpperCase() +
                        altogic.auth.getUser().provider.slice(1)}
                  </Text>
                  <Stack spacing={4}>
                    {profilePicture === require("../../assets/pp_blank.png") ? (
                      <Button
                        px={4}
                        py={2}
                        rounded={"md"}
                        shadow={"sm"}
                        colorScheme="teal"
                        isLoading={loading}
                        cursor="pointer"
                      >
                        Upload Profile picture
                        {
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="file"
                            onChange={handleFileSelect}
                          />
                        }
                      </Button>
                    ) : (
                      <>
                        <>
                          <Button
                            px={4}
                            py={2}
                            rounded={"md"}
                            shadow={"sm"}
                            colorScheme="teal"
                            isLoading={loading}
                            cursor="pointer"
                          >
                            Change Profile Picture
                            {
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                className="file"
                                onChange={handleFileSelect}
                              />
                            }
                          </Button>
                          <Button
                            px={4}
                            py={2}
                            rounded={"md"}
                            shadow={"sm"}
                            isLoading={removeLoading}
                            onClick={removePhoto}
                          >
                            Remove Profile Picture
                          </Button>
                        </>
                      </>
                    )}
                  </Stack>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  ml={{ base: 0, md: 10 }}
                  mt={{ base: 10, md: 0 }}
                >
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={altogic.auth.getUser().email}
                      disabled
                      w={"full"}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="email"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      w={"full"}
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme={"green"}
                    onClick={handleSave}
                    isLoading={loading}
                  >
                    Save
                  </Button>
                </Box>
                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
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
                    >
                      <form onSubmit={handleSubmit}>
                        <FormControl
                          isInvalid={touched.oldPassword && errors.oldPassword}
                          id="oldPassword"
                          isRequired
                        >
                          <FormLabel>Old Password</FormLabel>
                          <InputGroup>
                            <Input
                              type={show ? "text" : "password"}
                              value={values.oldPassword}
                              w={"full"}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              isInvalid={
                                touched.oldPassword && errors.oldPassword
                              }
                              placeholder="Old password"
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
                            {errors.oldPassword}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          id="newPassword"
                          mt={4}
                          isInvalid={touched.newPassword && errors.newPassword}
                          isRequired
                        >
                          <FormLabel>New Password</FormLabel>
                          <InputGroup>
                            <Input
                              type={showConfirm ? "text" : "password"}
                              value={values.newPassword}
                              w={"full"}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              isInvalid={
                                touched.newPassword && errors.newPassword
                              }
                              placeholder="New password"
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
                          <FormErrorMessage>
                            {errors.newPassword}
                          </FormErrorMessage>
                        </FormControl>
                        <Button
                          mt={4}
                          w={"full"}
                          colorScheme={"green"}
                          isLoading={loading}
                          type="submit"
                          disabled={isSubmitting || !isValid}
                        >
                          Change Password
                        </Button>
                        {error && (
                          <Text color={"red.400"} mt={2}>
                            {error}
                          </Text>
                        )}
                      </form>
                    </Box>
                  )}
                </Formik>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  ml={{ base: 0, md: 10 }}
                  mt={{ base: 10, md: 0 }}
                >
                  <FormControl
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <FormLabel>Dark Mode</FormLabel>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text mr={2}>Off</Text>
                      <Switch isChecked={true} isDisabled />
                      <Text ml={2}>On</Text>
                    </Box>
                  </FormControl>

                  <FormControl
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    mt={5}
                  >
                    <FormLabel>Animations</FormLabel>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text mr={2}>Off</Text>
                      <Switch
                        isChecked={animations}
                        onChange={animationsHandler}
                      />
                      <Text ml={2}>On</Text>
                    </Box>
                  </FormControl>
                </Box>
              </SimpleGrid>
            </Box>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export default Profile;
