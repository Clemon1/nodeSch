import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { date } from './TableRow';
import { useUpdateNotificationMutation } from '../features/notificationSlice';

const NotificationModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const unread = data && data.filter((status) => status.read === false);
  let display = unread && unread.slice(0, 5);
  console.log('display', display);
  const navigate = useNavigate();
  const [updateNotification] = useUpdateNotificationMutation();

  return (
    <>
      <Button onClick={onOpen}>modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack align={'center'} h={'40px'}>
              <Heading as={'h4'} size={'sm'}>
                Notifications
              </Heading>
              <Text fontSize={'12px'} color={'gray.500'}>
                {unread && unread.length} / {data && data.length}
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
};

export default NotificationModal;
