import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { useGetOrdersQuery } from "../features/orderSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/Pagination";

const Orders = () => {
  const { data: orders } = useGetOrdersQuery();
  console.log(orders);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
          height={"100vh"}
          bg={"nano.light"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          px={[2, 2, 4, 8, 16]}
          py={3}>
          <TableContainer
            bg={"nano.white"}
            height={"83%"}
            padding={2}
            rounded={12}>
            <Table variant='striped' colorScheme='blue' size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Profile</Th>
                  <Th>Fullname</Th>
                  <Th>Mining Machine2</Th>
                  <Th>No of Machines</Th>
                  <Th>Total Price($)</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders
                    .map((order, i) => (
                      <Tr key={i}>
                        <Td>
                          <Avatar size={"sm"} name={order.userID.fullname} />
                        </Td>
                        <Td>{order.userID.fullname}</Td>
                        <Td>{order.productID.name}</Td>
                        <Td>{order.quantity}</Td>
                        <Td>
                          ${order.productID.specification.fee * order.quantity}
                        </Td>
                        <Td>
                          {order.status === "Pending" && (
                            <Badge
                              variant='solid'
                              padding={"4px"}
                              rounded={3}
                              colorScheme={"purple"}>
                              {order.status}
                            </Badge>
                          )}
                          {order.status === "Approved" && (
                            <Badge
                              variant='solid'
                              padding={"4px"}
                              rounded={3}
                              bg={"#10bd91"}>
                              {" "}
                              {order.status}
                            </Badge>
                          )}
                          {order.status === "Declined" && (
                            <Badge
                              variant='solid'
                              padding={"4px"}
                              rounded={3}
                              bg={"#f1334c"}>
                              {order.status}
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          <Link to={`/orders/${order._id}`}>
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
            totalItems={orders && orders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Orders;
