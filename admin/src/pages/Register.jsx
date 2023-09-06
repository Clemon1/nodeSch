import {
  Box,
  Button,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import cryptFile from "../assets/crypt.json";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddRegisterMutation } from "../features/registerSlice";

const Register = () => {
  const [register] = useAddRegisterMutation();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({
        username,
        fullname,
        email,
        password,
      }).unwrap();

      navigate("/login");
      toast({
        title: "Registered Successfully",
        position: "top-right",
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: err.data,
        position: "top-right",
        variant: "left-accent",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex width={"100%"} height={"100vh"} bg={"#001D3D"}>
      <Flex
        display={["none", "none", "none", "flex", "flex"]}
        width={"48%"}
        justifyContent={"flex-end"}
        padding={5}
        height={"90%"}>
        <Lottie width={70} height={100} animationData={cryptFile} />
      </Flex>
      <Flex
        justifyContent={[
          "center",
          "center",
          "center",
          "flex-start",
          "flex-start",
        ]}
        alignItems={"center"}
        width={["100%", "100%", "100", "55%", "50%"]}
        height={"100%"}>
        <Box
          width={["90%", "70%", "50%", "60%", "60%"]}
          padding={4}
          height={"fit-content"}
          borderRadius={14}
          bg={"#e6f0ff"}>
          <form onSubmit={handleRegister}>
            <Text
              fontSize={22}
              textAlign={"center"}
              fontWeight={600}
              color={"gray.800"}>
              Create Account
            </Text>
            <Flex width={"full"} gap={4}>
              <FormControl mb={3}>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  variant='filled'
                  type='text'
                  border={"2px solid #3182CE"}
                  color={"gray.800"}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={"gray.800"}>Fullname</FormLabel>
                <Input
                  onChange={(e) => setFullname(e.target.value)}
                  variant='filled'
                  type='text'
                  border={"2px solid #3182CE"}
                  color={"gray.800"}
                />
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel color={"gray.800"}>Email address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                variant='filled'
                required
                type='email'
                border={"2px solid #3182CE"}
                color={"gray.800"}
              />
            </FormControl>
            <FormControl marginBottom={2}>
              <FormLabel color={"gray.800"}>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                variant='filled'
                type='password'
                border={"2px solid #3182CE"}
                color={"gray.800"}
              />
            </FormControl>
            <FormControl marginBottom={2}>
              <Button
                type='submit'
                bg={"#023e8a"}
                width={"100%"}
                color={"#edf2f9"}
                _hover={{}}>
                Submit
              </Button>
            </FormControl>
            <Text textAlign={"center"} fontWeight={500}>
              Already have an account? <Link to={"/login"}> Login</Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
