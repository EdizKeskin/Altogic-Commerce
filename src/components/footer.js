import { Box, ButtonGroup, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from "react";

function Footer() {
  return (
    <>
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{ base: "4", md: "8" }}
      backdropFilter={"blur(4px)"}
    >
      <Stack>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
         <Text as={"h2"} fontSize={"3xl"} fontWeight={"bold"}>Logo</Text> 
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="20px" />}
            />
            <IconButton
              as="a"
              href="https://github.com/EdizKeskin"
              aria-label="GitHub"
              icon={<FaGithub fontSize="20px" />}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/sharpness_4/"
              aria-label="Twitter"
              icon={<FaInstagram fontSize="20px" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
          &copy; {new Date().getFullYear()} Sharpness, Inc. All rights reserved.
        </Text>
      </Stack>
    </Box>
    </>
  );
}

export default Footer;
