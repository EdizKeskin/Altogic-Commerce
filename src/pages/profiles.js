import { useMemo } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  useColorModeValue,
  ListItem,
  Tooltip,
  Accordion,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaSteam,
  FaTwitter,
  FaGithub,
  FaTwitch,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { useLang } from "../context/langContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CustomSpinner from "../components/spinner";
import { motion } from "framer-motion";

function Profiles() {
  const { lang } = useLang();
  const { id } = useParams();

  const textColor = useColorModeValue("black", "white");
  const titleColor = useColorModeValue("yellow.500", "yellow.300");
  const btnBg = useColorModeValue("gray.900", "gray.50");
  const btnColor = useColorModeValue("white", "gray.900");

  const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  const PRODUCT_QUERY = useMemo(() => {
    return `
  {
    cards {
      price
      image
      id
      tag
      title
      link
      details
      desc
    }
  }
`;
  }, []);

  const { data, isLoading, error } = useQuery("launches", () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: PRODUCT_QUERY,
      },
    }).then((response) => response.data.data);
  });

  if (isLoading) return <CustomSpinner />;
  if (error) return <pre>{error.message}</pre>;

  const product = data.cards.find((item) => item.link === id);

  console.log(product.details);

  const right = product.details.slice(0, 3);
  const left = product.details.slice(3, 6);

  console.log(product.desc);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 20 }}
      >
        <Flex data-aos="fade-down">
          <Box>
            <Breadcrumb
              display={{ base: "none", md: "block" }}
              spacing="4px"
              mb={4}
              separator={<AiOutlineRight color="gray.500" />}
            >
              <BreadcrumbItem>
                <Link to="/">
                  <Button variant={"link"}>Home</Button>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <Button variant={"link"}>{product.title}</Button>
              </BreadcrumbItem>
            </Breadcrumb>
            <Image
              rounded={"md"}
              alt={"user image"}
              src={product.image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Box>
        </Flex>
        <Stack
          spacing={{ base: 6, md: 10 }}
          data-aos="fade-up"
          backdropFilter={"blur(4px)"}
        >
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              color={textColor}
            >
              {product.title}
            </Heading>
            <Text color={"gray.400"} fontSize={"2xl"}>
              {product.price.toFixed(2)} ₺
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.600"} />}
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={titleColor}
                fontWeight={"500"}
                mb={"4"}
              ></Text>
              <Text fontSize={"lg"} color={"gray.400"} fontWeight={"300"}>
                {product.desc}
              </Text>
            </Box>
          </Stack>
          <Stack>
            <Accordion allowToggle>
              <AccordionItem borderColor={"gray.600"}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <FormattedMessage id="title" />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2} color={textColor}>
                      {product.details.lenght > 3
                        ? product.details.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                          ))
                        : right.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                          ))}
                    </List>

                    <List spacing={2} color={textColor}>
                      {product.details.lenght > 3
                        ? product.details.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                          ))
                        : left.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                          ))}
                    </List>
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>

              {/* <AccordionItem borderColor={"gray.600"}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <FormattedMessage id="bestSeries" />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Tabs variant="enclosed" borderColor={textColor}>
                    <TabList>
                      {product.bestGames.length > 0 && (
                        <Tab>
                          <FormattedMessage id="series" />
                        </Tab>
                      )}
                      {product.bestGames.length > 0 && (
                        <Tab>
                          <FormattedMessage id="games" />
                        </Tab>
                      )}
                      {product.bestAnime.length > 0 && (
                        <Tab>
                          <FormattedMessage id="anime" />
                        </Tab>
                      )}
                      {product.bestMovies.length > 0 && (
                        <Tab>
                          <FormattedMessage id="movie" />
                        </Tab>
                      )}
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <List color={textColor}>
                          {product.bestSeries.map((item, index) => (
                            <div key={index}>
                              <ListItem>{item}</ListItem>
                            </div>
                          ))}
                        </List>
                      </TabPanel>
                      <TabPanel>
                        <List color={textColor}>
                          {product.bestGames.map((item, index) => (
                            <div key={index}>
                              <ListItem>{item}</ListItem>
                            </div>
                          ))}
                        </List>
                      </TabPanel>
                      <TabPanel>
                        <List color={textColor}>
                          {product.bestAnime.map((item, index) => (
                            <div key={index}>
                              <ListItem>{item}</ListItem>
                            </div>
                          ))}
                        </List>
                      </TabPanel>
                      <TabPanel>
                        <List color={textColor}>
                          {product.bestMovies.map((item, index) => (
                            <div key={index}>
                              <ListItem>{item}</ListItem>
                            </div>
                          ))}
                        </List>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </AccordionPanel>
              </AccordionItem> */}
            </Accordion>
          </Stack>

          <Link to="/">
            <motion.div whileTap={{ scale: 0.8 }}>
              <Button
                rounded={"none"}
                w={"full"}
                size={"lg"}
                py={"7"}
                bg={btnBg}
                color={btnColor}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                mb={{ base: "6", md: "0" }}
              >
                <FormattedMessage id="home_btn" />
              </Button>
            </motion.div>
          </Link>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default Profiles;
