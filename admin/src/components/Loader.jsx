import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      width={"100%"}
      bg={"nano.light"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}>
      <Spinner color='#0067C1' size={"xl"} />
    </Flex>
  );
};

export default Loader;
