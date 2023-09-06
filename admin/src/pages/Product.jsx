import {
  Avatar,
  Box,
  Button,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import {
  useGetProductQuery,
  useAddProductMutation,
} from '../features/productSlice';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Product = () => {
  const [name, setName] = useState('');
  const [miningHashrate, setMiningHashrate] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [powerConsumption, setPowerConsumption] = useState('');
  const [fee, setFee] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { data: product } = useGetProductQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  // console.log(product);

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        name,
        miningHashrate,
        lifeSpan,
        powerConsumption,
        fee,
      }).unwrap();
      toast({
        title: 'Product added successfully',
        position: 'top-right',
        variant: 'left-accent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: error.message,
        position: 'top-right',
        variant: 'left-accent',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex width={'100%'} height={'100vh'}>
      <Sidebar />
      <Box width={'full'} height={'100%'} bg={'nano.light'}>
        <Navbar />

        <Flex
          w={'full'}
          height={'87vh'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          px={[2, 2, 4, 8, 16]}
          py={3}
        >
          <Flex
            w={'full'}
            padding={2}
            gap={5}
            height={'4vh'}
            justifyContent={'flex-end'}
            align={'flex-end'}
          >
            <Button
              bg={'#0067C1'}
              color={'nano.light'}
              rounded={10}
              onClick={onOpen}
              _hover={{}}
            >
              + Add
            </Button>

            <>
              <Modal
                size={'xl'}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add new product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <VStack spacing={2}>
                      <form onSubmit={handleProduct}>
                        <Flex gap={4} width={'100%'}>
                          <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                              placeholder='Product name'
                              onChange={(e) => setName(e.target.value)}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Mining Hashrate</FormLabel>
                            <Input
                              placeholder='Mining Hashrate'
                              onChange={(e) =>
                                setMiningHashrate(e.target.value)
                              }
                            />
                          </FormControl>
                        </Flex>
                        <Flex width={'100%'} gap={4}>
                          <FormControl>
                            <FormLabel>Power Consumption</FormLabel>
                            <Input
                              placeholder='Power Consumption'
                              onChange={(e) =>
                                setPowerConsumption(e.target.value)
                              }
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Fee ($)</FormLabel>
                            <Input
                              placeholder='Fee'
                              onChange={(e) => setFee(e.target.value)}
                            />
                          </FormControl>
                        </Flex>
                        <Flex width={'100%'}>
                          <FormControl>
                            <FormLabel>Life Span</FormLabel>
                            <Input
                              placeholder='Life Span'
                              onChange={(e) => setLifeSpan(e.target.value)}
                            />
                          </FormControl>
                        </Flex>
                        <ModalFooter>
                          <Button
                            onClick={onClose}
                            type='submit'
                            bg={'#0067C1'}
                            isDisabled={isLoading}
                            color={'nano.light'}
                          >
                            Add Product
                          </Button>
                        </ModalFooter>
                      </form>
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          </Flex>

          <TableContainer
            bg={'nano.white'}
            height={'100%'}
            padding={2}
            rounded={12}
          >
            <Table variant='striped' colorScheme='blue' size={'sm'}>
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Mining Hashrate</Th>
                  <Th>Power Consumption</Th>
                  <Th isNumeric>Fee</Th>
                  <Th> Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {product &&
                  product
                    .map((product, i) => (
                      <Tr key={i}>
                        <Td>
                          <Avatar size={'sm'} name={product.name} />
                        </Td>
                        <Td>{product.name}</Td>
                        <Td>{product.specification.miningHashrate}</Td>
                        <Td>{product.specification.powerConsumption}w</Td>
                        <Td isNumeric>${product.specification.fee}</Td>
                        <Td>
                          <Link to={`/products/${product._id}`}>
                            <Button
                              bg={'#0067C1'}
                              color={'nano.light'}
                              rounded={'full'}
                              width={'23%'}
                              height={'32px'}
                              _hover={{}}
                            >
                              <Icon
                                as={HiOutlineViewfinderCircle}
                                fontSize={20}
                                fontWeight={500}
                              />
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                    .slice(indexOfFirstItem, indexOfLastItem)}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={product && product.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Product;
