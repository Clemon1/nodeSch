import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAddCustomerMutation } from "../features/customerSlice";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const [addCustomer] = useAddCustomerMutation();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const body = {
    fullname,
    email,
    password,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      await addCustomer(body).unwrap();
      navigate("/customers");
      toast({
        title: "Customer added successfully",
        position: "top-right",
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
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
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Box
          maxWidth='500px'
          bg={"nano.white"}
          height={"fit-content"}
          rounded={"lg"}
          margin='auto'
          p={4}>
          <form onSubmit={handleSubmit}>
            <Text fontSize={18} fontWeight={600}>
              Add Customer
            </Text>
            <VStack spacing={2} align='stretch'>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type='text'
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Button
                bg={"nano.blue"}
                color={"nano.light"}
                _hover={{}}
                type='submit'>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateCustomer;
