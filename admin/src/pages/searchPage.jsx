import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { MdAlternateEmail } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useSearchUserQuery } from "../features/customerSlice";
const SearchPage = () => {
  const { searchUser } = useParams();

  const { data: search } = useSearchUserQuery(searchUser);
  console.log(search);
  return (
    <Flex width={"100%"} height={"100vh"}>
      <Sidebar />
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Flex
          w={"full"}
          height={"fit-content"}
          bg={"nano.light"}
          flexWrap={"wrap"}
          flexBasis={1}
          rowGap={2}
          columnGap={2}
          justifyContent={"flex-start"}
          px={[2, 2, 4, 8, 8]}
          py={3}>
          {search && search.length <= 0 && (
            <Flex
              width={"100%"}
              height={"60vh"}
              justifyContent={"center"}
              alignItems={"center"}>
              <Text fontSize={22} fontWeight={500}>
                No user found
              </Text>
            </Flex>
          )}

          {search &&
            search.map((user, key) => (
              <Card
                key={key}
                width={["48%", "48%", "30%", "19%", "24%"]}
                p={2}
                height={"fit-content"}
                rounded={"lg"}>
                <Link to={`/customers/${user._id}`}>
                  <Flex
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Avatar
                      size={["md", "md", "lg", "xl", "xl"]}
                      name={user.fullname}
                    />
                  </Flex>
                  <CardBody>
                    <List spacing={2}>
                      <ListItem noOfLines={1}>
                        <ListIcon
                          as={MdAlternateEmail}
                          fontSize={"xl"}
                          color='nano.blue'
                        />
                        {user.username}
                      </ListItem>
                      <ListItem noOfLines={1}>
                        <ListIcon
                          as={FaUserShield}
                          fontSize={"xl"}
                          color='nano.blue'
                        />
                        {user.fullname}
                      </ListItem>
                      <ListItem
                        display={["none", "none", "flex", "flex", "flex"]}
                        noOfLines={1}>
                        <ListIcon
                          as={MdEmail}
                          fontSize={"xl"}
                          color='nano.blue'
                        />
                        {user.email}
                      </ListItem>
                    </List>
                  </CardBody>
                </Link>
              </Card>
            ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SearchPage;
