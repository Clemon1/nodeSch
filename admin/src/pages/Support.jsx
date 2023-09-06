import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useGetAllSupportQuery } from "../features/supportSlice";
import { Link } from "react-router-dom";
const Support = () => {
  const { data: support } = useGetAllSupportQuery();
  console.log(support);
  return (
    <Flex width={"100%"} height={"100vh"}>
      <Sidebar />
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Flex
          w={"full"}
          height={"100vh"}
          bg={"nano.light"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          px={[2, 2, 4, 8, 10]}
          py={3}>
          <Tabs position='relative' variant='unstyled'>
            <TabList>
              <Tab
                fontWeight={500}
                bg={"nano.blue"}
                color={"nano.light"}
                rounded={5}>
                Open Ticket
              </Tab>
              <Tab fontWeight={500}>Closed Ticket</Tab>
            </TabList>
            <TabIndicator
              mt='-1.5px'
              height='4px'
              bg='blue.500'
              borderRadius='1px'
            />
            <TabPanels>
              {/* Open Ticket */}
              <TabPanel
                display={"flex"}
                justifyContent={"flex-start"}
                flexWrap={"wrap"}
                rowGap={2}
                columnGap={2}>
                {support &&
                  support
                    .filter((e) => {
                      return e.status === "Open";
                    })
                    .map((support, key) => (
                      <Card key={key} width={"32%"} bg={"white"} rounded={7}>
                        <Link to={`/support/${support._id}`}>
                          <Flex
                            width={"full"}
                            p={2}
                            gap={"8px"}
                            alignItems={"center"}>
                            <Avatar name={support.userId.fullname} />
                            <Text fontSize={16} fontWeight={500}>
                              {support.userId.fullname}
                            </Text>
                          </Flex>
                          <Flex width={"full"} px={5}>
                            <Text
                              noOfLines={[1, 1, 1, 1, 1]}
                              fontSize={18}
                              fontWeight={500}>
                              {support.subject}
                            </Text>
                          </Flex>
                          <CardBody>
                            <Text isTruncated>{support.message}</Text>
                            <Box
                              position={"relative"}
                              bg={"blue.400"}
                              width={"full"}
                              rounded={"15px 0px 30px 0px"}
                              top={"20px"}
                              right={"-19px"}
                              height={"10px"}></Box>
                          </CardBody>
                        </Link>
                      </Card>
                    ))}
              </TabPanel>

              {/* Closed Ticket */}
              <TabPanel
                display={"flex"}
                justifyContent={"flex-start"}
                flexWrap={"wrap"}
                rowGap={2}
                columnGap={2}>
                {support &&
                  support
                    .filter((e) => {
                      return e.status === "Closed";
                    })
                    .map((support, key) => (
                      <Card
                        key={key}
                        width={["100%", "100%", "50%", "32%", "32%"]}
                        bg={"white"}
                        rounded={7}>
                        <Link to={`/support/${support._id}`}>
                          <Flex
                            width={"full"}
                            p={2}
                            gap={"8px"}
                            alignItems={"center"}>
                            <Avatar name={support.userId.fullname} />
                            <Text fontSize={16} fontWeight={500}>
                              {support.userId.fullname}
                            </Text>
                          </Flex>
                          <Flex width={"full"} px={5}>
                            <Text
                              noOfLines={[1, 1, 1, 1, 1]}
                              fontSize={18}
                              fontWeight={500}>
                              {support.subject}
                            </Text>
                          </Flex>
                          <CardBody>
                            <Text isTruncated>{support.message}</Text>
                            <Box
                              position={"relative"}
                              bg={"red.500"}
                              width={"full"}
                              rounded={"15px 0px 30px 0px"}
                              top={"20px"}
                              right={"-19px"}
                              height={"10px"}></Box>
                          </CardBody>
                        </Link>
                      </Card>
                    ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Support;
