import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  useGetSingleSupportQuery,
  useReplySupportMutation,
  useCloseSupportTicketMutation,
} from "../features/supportSlice";
const Single_Support = () => {
  const { id } = useParams();
  const { data: support } = useGetSingleSupportQuery(id);
  const [replyData] = useReplySupportMutation();
  const [closeData] = useCloseSupportTicketMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reply, setReply] = useState("");
  const toast = useToast();
  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await replyData({ id, reply }).unwrap();
      toast({
        title: `Reply is sent successfully`,
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
  const handleCloseTicket = async (e) => {
    e.preventDefault();
    try {
      await closeData({ id }).unwrap();
      toast({
        title: `Ticket is Closed`,
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
        <Flex
          w={"full"}
          height={"fit-content"}
          bg={"nano.light"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          px={[2, 2, 4, 8, 10]}
          py={3}>
          <Box
            width={"full"}
            py={3}
            px={4}
            bg={"#ffffff"}
            rounded={6}
            height={"fit-content"}>
            {support && support.status === "Open" && (
              <Box
                width={"60%"}
                height={"18px"}
                bg={"blue.900"}
                position={"relative"}
                top={"-11px"}
                right={"16px"}
                borderRadius={"11px 0px 0px 0px"}></Box>
            )}
            {support && support.status === "Closed" && (
              <Box
                width={"60%"}
                height={"18px"}
                bg={"#ef233c"}
                position={"relative"}
                top={"-11px"}
                right={"16px"}
                borderRadius={"11px 0px 0px 0px"}></Box>
            )}
            <Flex gap={4} alignItems={"center"} p={2}>
              <Flex
                width={"full"}
                justifyContent={"flex-start"}
                gap={4}
                alignItems={"center"}>
                <Avatar size={"sm"} name={support && support.userId.fullname} />
                <Text fontSize={17} fontWeight={500}>
                  {support && support.userId.fullname}
                </Text>
              </Flex>
              <Flex
                width={"full"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                gap={3}>
                <Button
                  isDisabled={support && support.status === "Closed"}
                  onClick={onOpen}
                  bg={"nano.blue"}
                  color={"nano.light"}
                  _hover={{}}>
                  Reply
                </Button>
                <>
                  <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Reply </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <form onSubmit={handleReply}>
                          <Textarea
                            placeholder='Reply here'
                            mb={3}
                            onChange={(e) => setReply(e.target.value)}
                          />

                          <Button
                            type='submit'
                            bg={"nano.blue"}
                            color={"nano.light"}
                            _hover={{}}
                            mr={3}
                            onClick={onClose}>
                            Send
                          </Button>
                        </form>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </>
              </Flex>
            </Flex>
            <Text fontSize={22} fontWeight={500} mb={2}>
              {support && support.subject}
            </Text>
            <Box
              width={"full"}
              height={"60vh"}
              p={2}
              rounded={6}
              bg={"gray.200"}>
              <Text fontSize={17} fontWeight={400}>
                {support && support.message}
              </Text>
            </Box>
            <Box width={"full"} height={"fit-content"}>
              <Text fontSize={17} fontWeight={500}>
                Reply:
              </Text>
              <Text fontSize={19} fontWeight={400}>
                {support && support.reply}
              </Text>
            </Box>
            <Flex width={"full"} justifyContent={"flex-end"}>
              <Button
                isDisabled={support && support.status === "Closed"}
                onClick={handleCloseTicket}
                bg={"nano.blue"}
                color={"nano.light"}
                _hover={{}}>
                Close Ticket
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Single_Support;
