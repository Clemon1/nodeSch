/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  useToast,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { format } from "date-fns";
import { useState } from "react";
import { useGetProductQuery } from "../features/productSlice";

import {
  useAddSubscriptionMutation,
  useGetAllSubscriptionQuery,
} from "../features/subscriptionSlice";
import Pagination from "../components/Pagination";
import { useGetAllUserQuery } from "../features/customerSlice";
const Subscription = () => {
  const [role, setRole] = useState("user");
  const { data: allProducts } = useGetProductQuery();

  const { data: customers } = useGetAllUserQuery(role);

  const { data } = useGetAllSubscriptionQuery();

  console.log(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [addSubscription] = useAddSubscriptionMutation();
  const [userId, setUserId] = useState("");
  const [productId, setProdcuctId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const body = {
    userId,
    productId,
    startDate,
    dueDate,
    quantity,
  };
  const toast = useToast();
  const addSub = async (e) => {
    e.preventDefault();
    try {
      await addSubscription(body).unwrap();
      toast({
        title: `Subscription added successfully`,
        position: "top-right",
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.message,
        position: "top-right",
        variant: "left-accent",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
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
          <Flex
            w={"full"}
            padding={2}
            gap={1}
            height={"7vh"}
            justifyContent={"flex-end"}
            alignItems={"center"}>
            <Text fontWeight={500}>Filter by:</Text>
            <Select
              bg={"nano.white"}
              width={"20%"}
              rounded={12}
              placeholder='All'>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Select>
            <Button
              bg={"#0067C1"}
              color={"nano.light"}
              onClick={onOpen}
              rounded={10}
              _hover={{}}>
              + Add
            </Button>
            <>
              <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Subscription</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={addSub}>
                      <Flex width={"full"} gap={4}>
                        <FormControl mb={3}>
                          <FormLabel>Customers</FormLabel>
                          <Select
                            placeholder='Select user'
                            onChange={(e) => setUserId(e.target.value)}>
                            {customers &&
                              customers.allUser.map((customer, key) => (
                                <option key={key} value={customer._id}>
                                  {customer.fullname}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                        <FormControl mb={3}>
                          <FormLabel>Product</FormLabel>
                          <Select
                            placeholder='Select Product'
                            onChange={(e) => setProdcuctId(e.target.value)}>
                            {allProducts &&
                              allProducts.map((prod, key) => (
                                <option key={key} value={prod._id}>
                                  {prod.name}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                        <FormControl mb={3}>
                          <FormLabel>Quantity</FormLabel>
                          <Input
                            type='number'
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </FormControl>
                        <FormControl mb={3}>
                          <FormLabel>Start Date</FormLabel>
                          <Input
                            type='date'
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </FormControl>
                        <FormControl mb={3}>
                          <FormLabel>Due Date</FormLabel>
                          <Input
                            type='date'
                            onChange={(e) => setDueDate(e.target.value)}
                          />
                        </FormControl>
                        <Button
                          width={"21%"}
                          type='submit'
                          colorScheme='blue'
                          mr={3}
                          onClick={onClose}>
                          Submit
                        </Button>
                      </Flex>
                    </form>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
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
                  <Th>Machines</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Due Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data
                    .map((customer, i) => (
                      <Tr key={i} transition={".9s ease-in-out all"}>
                        <Td>
                          <Avatar size={"sm"} name={customer.userId.fullname} />
                        </Td>
                        <Td>{customer.userId.fullname} </Td>
                        <Td>{customer.productId.name} </Td>
                        <Td>{customer.quantity}</Td>
                        <Td>
                          ${" "}
                          {customer.quantity *
                            customer.productId.specification.fee}
                        </Td>
                        <Td>
                          {customer.status === "active" && (
                            <Badge colorScheme='green' padding={1} rounded={6}>
                              {customer.status}
                            </Badge>
                          )}
                          {customer.status === "inactive" && (
                            <Badge colorScheme='red' padding={1} rounded={6}>
                              {customer.status}
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          {format(new Date(customer.startDate), "dd/MM/yyyy")}
                        </Td>
                        <Td>
                          {format(new Date(customer.dueDate), "dd/MM/yyyy")}
                        </Td>
                      </Tr>
                    ))
                    .slice(indexOfFirstItem, indexOfLastItem)}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data && data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Subscription;
