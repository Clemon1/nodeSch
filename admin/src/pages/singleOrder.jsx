/* eslint-disable no-unused-vars */
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from "../features/orderSlice";
import { useState } from "react";
import { useAddSubscriptionMutation } from "../features/subscriptionSlice";

const SingleOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { data: order } = useGetSingleOrderQuery({ id });
  const [updateOrder] = useUpdateOrderMutation();
  const hangleStatus = async (e) => {
    e.preventDefault();
    try {
      await updateOrder({ id, status }).unwrap();
      toast({
        title: `Order is ${status}`,
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

  const [addSubscription] = useAddSubscriptionMutation();
  const [userId, setUserId] = useState("");
  const [productId, setProdcuctId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const body = {
    userId: order && order.userID._id,
    productId: order && order.productID._id,
    startDate,
    dueDate,
    quantity: order && order.quantity,
  };
  console.log(body);

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
        <Flex width={"full"} gap={4} px={6} justifyContent={"center"}>
          <Card
            width={"90%"}
            height={"fit-content"}
            rounded={12}
            bg={"#ffffff"}
            p={6}>
            <Box>
              <Text fontSize={20} fontWeight={500}>
                Order from {order && order.userID.fullname}
              </Text>
            </Box>
            <Flex width={"full"} justifyContent={"space-between"} mb={4}>
              <UnorderedList fontSize={17} fontWeight={400}>
                <ListItem mb={4}>
                  Email:
                  <Text fontSize={20} fontWeight={500}>
                    {order && order.userID.email}
                  </Text>
                </ListItem>

                <ListItem mb={4}>
                  Quantity:
                  <Text fontSize={20} fontWeight={500}>
                    {order && order.quantity}
                  </Text>
                </ListItem>

                <ListItem>
                  Status:
                  {order && order.status === "Pending" && (
                    <Badge
                      variant='solid'
                      padding={"4px"}
                      rounded={3}
                      colorScheme={"purple"}>
                      {order && order.status}
                    </Badge>
                  )}
                  {order && order.status === "Approved" && (
                    <Badge
                      variant='solid'
                      padding={"4px"}
                      rounded={3}
                      bg={"#10bd91"}>
                      {order && order.status}
                    </Badge>
                  )}
                  {order && order.status === "Declined" && (
                    <Badge
                      variant='solid'
                      padding={"4px"}
                      rounded={3}
                      bg={"#f1334c"}>
                      {order && order.status}
                    </Badge>
                  )}
                </ListItem>
              </UnorderedList>
              <UnorderedList fontSize={17} fontWeight={400}>
                <ListItem mb={4}>
                  Mining Machine:
                  <Text fontSize={20} fontWeight={500}>
                    {order && order.productID.name}
                  </Text>
                </ListItem>
                <ListItem>
                  Price:
                  <Text fontSize={20} fontWeight={500}>
                    $
                    {order &&
                      order.productID.specification.fee * order.quantity}
                  </Text>
                </ListItem>
              </UnorderedList>
            </Flex>
            <Flex maxWidth={"50%"} gap={5} direction={"column"}>
              <Select
                variant={"filled"}
                placeholder='Select Status'
                onChange={(e) => setStatus(e.target.value)}>
                <option value='Approved'>Approve</option>
                <option value='Declined'>Decline</option>
              </Select>
              <Button
                onClick={hangleStatus}
                bg={"#0067C1"}
                color={"nano.light"}
                _hover={{}}>
                Submit
              </Button>
            </Flex>
            {order && order.status === "Approved" && (
              <>
                <Button
                  onClick={onOpen}
                  bg={"nano.blue"}
                  color={"nano.light"}
                  position={"absolute"}
                  top={0}
                  right={0}
                  _hover={{
                    backgroundColor: "nano.light",
                    color: "nano.blue",
                  }}
                  border={"none"}
                  rounded={"0px 10px 0px 10px"}>
                  Add Subscription
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Subscription</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <form onSubmit={addSub}>
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
                          type='submit'
                          colorScheme='blue'
                          mr={3}
                          onClick={onClose}>
                          Submit
                        </Button>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </>
            )}
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleOrder;
