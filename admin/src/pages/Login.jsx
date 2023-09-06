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
import cryptFile2 from "../assets/bitCoin.json";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddLoginMutation } from "../features/registerSlice";
import { useDispatch } from "react-redux";
import { Error, Pending, Success } from "../features/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addlogin, { isError }] = useAddLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(Pending());
      dispatch(Success(await addlogin({ email, password }).unwrap()));

      navigate("/home");
      toast({
        title: "Login Successfully",
        position: "top-right",
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      dispatch(Error(isError));

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
    <Flex width={"100%"} height={"100vh"} bg={"#001D3D"}>
      <Flex
        display={["none", "none", "none", "flex", "flex"]}
        width={"50%"}
        justifyContent={"flex-end"}
        padding={5}
        height={"90%"}>
        <Lottie width={70} height={100} animationData={cryptFile2} />
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
          <form onSubmit={handleLogin}>
            <Text
              fontSize={22}
              textAlign={"center"}
              fontWeight={600}
              color={"gray.800"}>
              Login
            </Text>

            <FormControl>
              <FormLabel color={"gray.800"}>Email address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                variant='filled'
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
              Dont have an account? <Link to={"/"}>Register</Link>
            </Text>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
