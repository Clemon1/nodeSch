import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { IoIosNotifications } from 'react-icons/io';
import NotificationMessage from './NotificationMessage';
import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} from '../features/notificationSlice';
import { useSelector } from 'react-redux';
import { currentUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { selectAllNotifications } from '../features/notificationSlice';
import { date } from './TableRow';

const Notification = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const [updateNotification] = useUpdateNotificationMutation();
  const { data, isLoading, isSuccess, isError, error } =
    useGetNotificationQuery(user._id, {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();
  let display;
  const [visible, setVisible] = useState(false);
  // const notifications = useSelector((state) => selectAllNotifications(state));
  // const read = notifications.filter((nots) => nots.read === false);
  const handleClick = () => {
    navigate('/notification');
  };
  let read;
  let content;
  if (isLoading) {
    content = 'Loading';
  }
  if (isError) {
    content = error;
  }
  let total;
  if (isSuccess) {
    content = data;
    total = Object.values(content?.entities);
    read = Object.values(content?.entities).filter(
      (nots) => nots.read === false
    );
    // console.log(content);
    display = read && read.slice(0, 5);
  }

  const modal = (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack align={'center'} h={'40px'}>
              <Heading as={'h4'} size={'sm'}>
                Notifications
              </Heading>
              <Text fontSize={'12px'} color={'gray.500'}>
                {read && read.length} / {total && total.length}
              </Text>
            </HStack>
            <ModalCloseButton />
            <Divider />
          </ModalHeader>
          <ModalBody>
            {display &&
              display.map((nots) => (
                <Flex
                  key={nots._id}
                  w={'100%'}
                  h={'70px'}
                  //   bg={'gray.50'}
                  align={'center'}
                  mb={'10px'}
                  borderRadius={'10px'}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={async () => {
                    try {
                      const id = nots.id;
                      const body = { read: true, id };
                      await updateNotification(body);
                      return navigate(`/notification/${nots._id}`);
                    } catch (error) {
                      console.log(error?.message);
                    }
                  }}
                >
                  <VStack
                    align={'start'}
                    ml={'10px'}
                    borderBottom={'1px solid gray.100'}
                  >
                    <HStack gap={{ base: 18, sm: 40, md: 40 }}>
                      <Heading as={'h6'} size={'sm'}>
                        {nots && nots?.subject}
                      </Heading>
                      <Text fontSize={'14px'} color={'gray.500'}>
                        {date(nots && nots?.createdAt).formDate?.split(',')[0]}
                      </Text>
                    </HStack>
                    <Text fontSize={'14px'}>
                      {nots?.message?.substr(0, 40)}...
                    </Text>
                  </VStack>
                </Flex>
              ))}
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <Button
              onClick={() => navigate('/notification')}
              colorScheme='blue'
            >
              see all
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  // console.log(content);
  // console.log(read);
  return (
    <Box>
      <Button
        onClick={onOpen}
        fontSize={19}
        bg={'transparent !important'}
        _focus={{}}
        _hover={{}}
      >
        <Icon as={IoIosNotifications} boxSize={'30px'} />
        <Flex
          w={5}
          h={5}
          rounded={'full'}
          bg={'#ff1654'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
          top={2}
          right={3}
          bottom={0}
        >
          <Text fontSize={10} color={'nano.light'} fontWeight={600}>
            {read && read.length}
          </Text>
        </Flex>
      </Button>
      {modal}
    </Box>
  );
};

export default Notification;
