import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { useGetAllUserQuery } from "../features/customerSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
const Customers = () => {
  const [role, setRole] = useState("");
  const { data } = useGetAllUserQuery(role);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Flex width={"100%"} height={"100vh"}>
      <Sidebar />
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Flex
          w={"full"}
          height={"87vh"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          px={[2, 2, 4, 8, 16]}
          py={3}>
          <Flex
            w={"full"}
            padding={2}
            gap={1}
            height={"7vh"}
            justifyContent={"flex-end"}
            alignItems={"center"}>
            <Input width={"50"} type='text' />
            <Text fontWeight={500}>Filter by:</Text>
            <Select
              onChange={(e) => setRole(e.target.value)}
              bg={"nano.white"}
              width={"20%"}
              rounded={12}
              placeholder='All'>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </Select>
            <Link to={`/customers/create`}>
              <Button
                bg={"#0067C1"}
                color={"nano.light"}
                rounded={10}
                _hover={{}}>
                + Add
              </Button>
            </Link>
          </Flex>
          <TableContainer
            bg={"nano.white"}
            height={"100%"}
            padding={2}
            transition={".9s ease-in-out all"}
            rounded={12}>
            <Table variant='striped' colorScheme='blue' size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Profile</Th>
                  <Th>Fullname</Th>
                  <Th>Email</Th>

                  <Th>Role</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.allUser
                    .map((customer, i) => (
                      <Tr key={i} transition={".9s ease-in-out all"}>
                        <Td>
                          <Avatar size={"sm"} name={customer.fullname} />
                        </Td>
                        <Td>{customer.fullname} </Td>
                        <Td>{customer.email} </Td>

                        <Td>
                          {customer.role === "admin" && (
                            <Badge colorScheme='red' padding={1} rounded={6}>
                              {customer.role}
                            </Badge>
                          )}

                          {customer.role === "user" && (
                            <Badge colorScheme='purple' padding={1} rounded={6}>
                              {customer.role}
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          <Link to={`/customers/${customer._id}`}>
                            <Button
                              bg={"#0067C1"}
                              color={"nano.light"}
                              rounded={"full"}
                              width={"23%"}
                              height={"32px"}
                              _hover={{}}>
                              <Icon
                                as={HiOutlineViewfinderCircle}
                                fontSize={20}
                                fontWeight={500}
                              />
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                    .slice(indexOfFirstItem, indexOfLastItem)}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data && data.allUser.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Customers;
