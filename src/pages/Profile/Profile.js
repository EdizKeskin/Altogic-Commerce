import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useToast,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
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

function Profile() {
  const toast = useToast();
  const { profilePicture, setProfilePicture } = useAuth();
  const [name, setName] = useState(altogic.auth.getUser().name);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

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
      setProfilePicture(require("../../images/pp_blank.png"));
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
        <Box w={"full"}>
          <Box p={6} textAlign={"center"}>
            <Flex flexDirection={{ base: "column", md: "row" }}>
              <Box>
                {profilePicture === require("../../images/pp_blank.png") ? (
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
                  {altogic.auth.getUser().provider.charAt(0).toUpperCase() +
                    altogic.auth.getUser().provider.slice(1)}
                </Text>
                <Stack spacing={4}>
                  {profilePicture === require("../../images/pp_blank.png") ? (
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
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}

export default Profile;
