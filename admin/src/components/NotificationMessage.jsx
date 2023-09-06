import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Heading,
} from '@chakra-ui/react';
import { useGetNotificationQuery } from '../features/notificationSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../features/authSlice';
import { useSelector } from 'react-redux';
import { selectAllNotifications } from '../features/notificationSlice';

const NotificationMessage = (prop) => {
  const notifications = useSelector((state) => selectAllNotifications(state));
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [content, setContent] = useState([]);
  let modal;

  useEffect(() => {
    notifications && setContent(notifications);
    notifications && setCount(notifications.length);
  }, [notifications]);
  // console.log(content);

  return (
    <>
      {prop.visible && (
        <Flex
          transition={' .6s ease-in-out all '}
          position={'absolute'}
          width={['75%', '70%', '47%', '35%', '30%']}
          height={'50%'}
          justifyContent={'center'}
          rounded={13}
          top={16}
          bg={'gray.50'}
          border={'3px solid #ffffff'}
          zIndex={1000}
          right={[4, 10, 10, 10, 10]}
        >
          <VStack width={'100%'} height={'fit-content'}>
            <Flex
              width={'100%'}
              alignItems={'center'}
              padding={2}
              justifyContent={'space-between'}
            >
              <Text fontSize={15} fontWeight={500}>
                Notifications - {count}
              </Text>
            </Flex>
            <Divider colorScheme='blackAlpha' />
            <VStack w={'full'} height={'fit-content'} padding={2}>
              <Box
                width={'100%'}
                height={'80px'}
                padding={2}
                borderRadius={6}
                bg={'gray.100'}
                display={'flex'}
                alignItems={'center'}
              >
                <Text noOfLines={[1]} fontSize={'md'} fontWeight={500}>
                  {content[0]?.subject}
                </Text>
              </Box>
              <Box
                width={'100%'}
                height={'70px'}
                padding={2}
                borderRadius={6}
                bg={'gray.100'}
                display={'flex'}
                alignItems={'center'}
              >
                <Text noOfLines={[1]} fontSize={'md'} fontWeight={500}>
                  {content[1]?.subject}
                </Text>
              </Box>
            </VStack>
            <Button
              fontSize={15}
              fontWeight={500}
              bg={'transparent'}
              onClick={() => navigate('/notification')}
            >
              See all
            </Button>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default NotificationMessage;

{
  /*  
     // modal = (
      //   <Modal
      //     transition={' .6s ease-in-out all '}
      //     position={'absolute'}
      //     width={['75%', '70%', '47%', '35%', '30%']}
      //     height={'50%'}
      //     // justifyContent={'center'}
      //     rounded={13}
      //     top={16}
      //     bg={'gray.50'}
      //     // border={'3px solid #ffffff'}
      //     zIndex={1000}
      //     right={[4, 10, 10, 10, 10]}
      //   >
      //     <ModalContent>
      //       <ModalHeader>
      //         <Heading as={'h4'} size={'sm'}>
      //           Notification - {count}
      //         </Heading>
      //         <Divider colorScheme='blackAlpha' />
      //       </ModalHeader>
      //       <ModalCloseButton />
      //       <ModalBody></ModalBody>
      //       <ModalFooter>
      //         <Button
      //           fontSize={15}
      //           fontWeight={500}
      //           bg={'transparent'}
      //           onClick={() => navigate('/notification')}
      //         >
      //           See all
      //         </Button>
      //       </ModalFooter>
      //     </ModalContent>
      //   </Modal>
      // );
  */
}
