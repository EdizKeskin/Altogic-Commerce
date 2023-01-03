import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  uploadProfilePicture,
  updateProfilePictureFieldOnDatabase,
  updateUser,
  removeProfilePhoto,
  deleteProfilePictureFieldOnDatabase,
} from "../../api/storage";
import altogic from "../../api/altogic";
import { useAuth } from "../../context/authContext";

function Profile() {
  const toast = useToast();
  const {profilePicture, setProfilePicture} = useAuth();
  const name = altogic.auth.getUser().name;

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

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        {profilePicture === require("../../images/pp_blank.png") ? (
          <Avatar
            size={"xl"}
            src={profilePicture}
            alt={"Profile"}
            mb={4}
            pos={"relative"}
            referrerPolicy="no-referrer"
          />
        ) : (
          <Avatar
            size={"xl"}
            src={profilePicture}
            alt={"Uploaded Profile"}
            mb={4}
            pos={"relative"}
            referrerPolicy="no-referrer"
          />
        )}
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name ? name.toUpperCase() : altogic.auth.getUser().email}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {altogic.auth.getUser().provider.charAt(0).toUpperCase() +
            altogic.auth.getUser().provider.slice(1)}
        </Text>

        <Stack mt={8} spacing={4}>
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
    </Center>
  );
}

export default Profile;
