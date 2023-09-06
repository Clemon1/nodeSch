import { Box, Button, Flex } from "@chakra-ui/react";
import Lottie from "lottie-react";
import errorLottie from "../assets/errorPage.json";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      gap={2}
      bg={"nano.light"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}>
      <Box
        width={["80%", "60%", "40%", "45%", "40%"]}
        height={["70%", "70%", "70%", "78%", "80%"]}
        bg={"nano.light"}>
        <Lottie animationData={errorLottie} />
      </Box>
      <Link to={"/home"}>
        <Button bg={"nano.blue"} color={"nano.light"} _hover={{}}>
          Return home
        </Button>
      </Link>
    </Flex>
  );
};

export default ErrorPage;
