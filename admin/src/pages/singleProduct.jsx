import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import microbt from "../assets/microbt.png";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../features/productSlice";
import { useParams } from "react-router-dom";
// import { fetchProducts } from '../features/productSlice';
import { useState, useRef, useEffect } from "react";

// const user = localStorage.getItem("userInfo");
const SingleProduct = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { data: product, isLoading } = useGetSingleProductQuery({ id });
  const [updateProduct] = useUpdateProductMutation();
  const [name, setName] = useState("");
  const [miningHashrate, setMiningHashrate] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [powerConsumption, setPowerConsumption] = useState("");
  const [fee, setFee] = useState("");

  const body = {
    id,
    name,
    specification: {
      miningHashrate,
      lifeSpan,
      powerConsumption,
      fee,
    },
  };
  useEffect(() => {
    if (product) {
      setName(product && product.name);
      setMiningHashrate(product && product.specification.miningHashrate);
      setPowerConsumption(product && product.specification.powerConsumption);
      setFee(product && product.specification.fee);
    }
  }, [product]);

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(body).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex width={"100%"} height={"100vh"}>
      <Sidebar />
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Flex w={"100%"} h={"85%"} align={"center"} justify={"center"}>
          <Box
            w={"90%"}
            bg={"white"}
            p={"20px"}
            h={"90%"}
            borderRadius={10}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}>
            <Flex w={"100%"} gap={20} direction={{ base: "column", lg: "row" }}>
              <Image
                src={microbt}
                w={{ base: "250px", md: "300px", lg: "400px" }}
              />
              <Card
                borderTop={"8px"}
                borderColor='blue.600'
                width={{ base: "100%", lg: "400px" }}>
                <Card>
                  <CardHeader>
                    <Heading as={"h4"} size={"md"}>
                      {product && product.name}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Heading as={"h4"} size={"sm"}>
                      Specification
                    </Heading>
                    <HStack gap={2} mt={"20px"}>
                      <Text>Mining Hashrate:</Text>
                      <Text>
                        {product && product.specification.miningHashrate}
                      </Text>
                    </HStack>
                    <HStack gap={2} mt={"20px"}>
                      <Text>Power Consumption:</Text>
                      <Text>
                        {product && product.specification?.powerConsumption}w
                      </Text>
                    </HStack>
                    <HStack gap={2} mt={"20px"}>
                      <Text>Fee:</Text>
                      <Text>$ {product && product.specification?.fee}</Text>
                    </HStack>
                  </CardBody>
                  <CardFooter>
                    <HStack gap={3}>
                      <Button colorScheme='blue' onClick={onOpen}>
                        Edit Product
                      </Button>
                    </HStack>
                  </CardFooter>
                </Card>
              </Card>
            </Flex>
          </Box>
          <Modal
            size={"xl"}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={2}>
                  <form onSubmit={handleProduct}>
                    <Flex gap={4} width={"100%"}>
                      <FormControl>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          placeholder='Product name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Mining Hashrate</FormLabel>
                        <Input
                          value={miningHashrate}
                          placeholder='Mining Hashrate'
                          onChange={(e) => setMiningHashrate(e.target.value)}
                        />
                      </FormControl>
                    </Flex>
                    <Flex width={"100%"} gap={4}>
                      <FormControl>
                        <FormLabel>Power Consumption</FormLabel>
                        <Input
                          value={powerConsumption}
                          placeholder='Power Consumption'
                          onChange={(e) => setPowerConsumption(e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Fee ($)</FormLabel>
                        <Input
                          value={fee}
                          placeholder='Fee'
                          onChange={(e) => setFee(e.target.value)}
                        />
                      </FormControl>
                    </Flex>
                    <Flex width={"100%"}>
                      <FormControl>
                        <FormLabel>Life Span</FormLabel>
                        <Input
                          placeholder='Life Span'
                          onChange={(e) => setLifeSpan(e.target.value)}
                        />
                      </FormControl>
                    </Flex>
                    <Button
                      type='submit'
                      onClick={onClose}
                      bg={"#0067C1"}
                      isDisabled={isLoading}
                      color={"nano.light"}>
                      Update Product
                    </Button>
                  </form>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleProduct;
