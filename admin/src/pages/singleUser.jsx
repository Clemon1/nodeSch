import {
  Avatar,
  Badge,
  Box,
  Flex,
  ListItem,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
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
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../features/customerSlice";
import {
  useAddSubscriptionMutation,
  useGetUserSubscriptionQuery,
} from "../features/subscriptionSlice";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { useGetProductQuery } from "../features/productSlice";

const SingleUser = () => {
  const { id } = useParams();
  const { data: user } = useGetSingleUserQuery(id);
  const { data: subs } = useGetUserSubscriptionQuery(id);

  // Padgination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: product } = useGetProductQuery();
  const [addSubscription] = useAddSubscriptionMutation();
  const [userId] = useState(id);
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
      setProdcuctId("");
      setQuantity("");
      setStartDate("");
      setDueDate("");
    } catch (error) {
      toast({
        title: error.data,
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
      <Box width={"full"} height={"fit-content"} bg={"nano.light"}>
        <Navbar />
        <Flex width={"100%"} px={4} justifyContent={"center"} height={"50vh"}>
          <Flex
            width={["100%", "100%", "80%", "55%", "50%"]}
            height={["fit-content", "fit-content", "50vh", "48vh", "48vh"]}
            px={4}
            py={4}
            flexDirection={"column"}
            gap={3}
            alignItems={"center"}
            bg={"#ffffff"}
            rounded={6}>
            <Avatar size={"2xl"} name={user && user.fullname} />
            <UnorderedList fontSize={17} fontWeight={500}>
              <ListItem display={"flex"} gap={4}>
                Username:
                <Text fontSize={19} fontWeight={500}>
                  {user && user.username}
                </Text>
              </ListItem>
              <ListItem display={"flex"} gap={4}>
                Name:{" "}
                <Text fontSize={19} fontWeight={500}>
                  {user && user.fullname}
                </Text>
              </ListItem>
              <ListItem display={"flex"} gap={4}>
                Email:{" "}
                <Text fontSize={19} fontWeight={500}>
                  {user && user.email}
                </Text>
              </ListItem>
              <ListItem display={"flex"} gap={4}>
                Roles:{" "}
                <Text fontSize={19} fontWeight={500}>
                  {user && user.role === "admin" && (
                    <Badge colorScheme='red' padding={1} rounded={6}>
                      {user && user.role}
                    </Badge>
                  )}
                  {user && user.role === "user" && (
                    <Badge colorScheme='purple' padding={1} rounded={6}>
                      {user && user.role}
                    </Badge>
                  )}
                </Text>
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
        <Flex
          px={[3, 3, 8, 12, 14]}
          py={4}
          direction={"column"}
          alignItems={"center"}
          width={"100%"}
          height={"fit-content"}>
          <Flex
            width={"full"}
            justifyContent={"space-between"}
            bg={"#ffffff"}
            p={3}
            height={"fit-content"}>
            <Text fontSize={19} fontWeight={500}>
              Subscriptions
            </Text>
            {user && user.role === "user" && (
              <>
                <Button
                  bg={"#0067C1"}
                  color={"nano.light"}
                  onClick={onOpen}
                  rounded={10}
                  _hover={{}}>
                  + Add
                </Button>
                <>
                  <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add Subscription</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <form onSubmit={addSub}>
                          <Flex width={"full"} gap={4}>
                            <FormControl mb={3}>
                              <FormLabel>Product</FormLabel>
                              <Select
                                placeholder='Select option'
                                onChange={(e) => setProdcuctId(e.target.value)}>
                                {product &&
                                  product.map((p, key) => (
                                    <option key={key} value={p._id}>
                                      {p.name}
                                    </option>
                                  ))}
                              </Select>
                            </FormControl>
                            <FormControl mb={3}>
                              <FormLabel>Quantity</FormLabel>
                              <Input
                                type='text'
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
              </>
            )}
          </Flex>
          <TableContainer width={"100%"} height={"60vh"} bg={"#ffffff"}>
            <Table variant='striped' colorScheme='teal'>
              {subs && subs.length === 0 && (
                <TableCaption fontSize={18}>No Subscription</TableCaption>
              )}
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Quantity</Th>
                  <Th>Status</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subs &&
                  subs
                    .map((sub, key) => (
                      <Tr key={key}>
                        <Td>{sub.productId.name}</Td>
                        <Td>{sub.quantity}</Td>
                        <Td>
                          <Badge colorScheme={"green"}>{sub.status}</Badge>
                        </Td>
                        <Td>
                          $ {sub.productId.specification.fee * sub.quantity}
                        </Td>
                      </Tr>
                    ))
                    .slice(indexOfFirstItem, indexOfLastItem)}
              </Tbody>
            </Table>
            {subs && subs.length != 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={subs && subs.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </TableContainer>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleUser;
