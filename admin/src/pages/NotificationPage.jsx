import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
  useArchiveNotificationMutation,
} from '../features/notificationSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
  Divider,
  Flex,
  Heading,
  Icon,
  HStack,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import NotificationTable from '../components/NotificationTable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllNotifications } from '../features/notificationSlice';
import { currentUser } from '../features/authSlice';

const Notification = () => {
  const [page, setPage] = useState(1);
  const user = useSelector(currentUser);
  // console.log(user);
  const { data, isLoading, isSuccess, isError, error } =
    useGetNotificationQuery(user._id, {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  // const notifications = useSelector((state) => selectAllNotifications(state));
  let notifications;
  if (isLoading) {
    notifications = 'Loading';
  }
  if (isError) {
    notifications = error;
  }
  if (isSuccess) {
    notifications = Object.values(data?.entities).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }
  let perPage = 20;
  let paginatedData;
  const start = (page - 1) * perPage;

  const end = () => {
    let end = start + perPage;
    if (end >= notifications.length) {
      end = notifications.length;
    }
    return end;
  };

  if (notifications) paginatedData = notifications.slice(start, end());

  const handlePagination = (page) => {
    setPage(page);
  };

  return (
    <Flex w={'100%'} height={'100vh'} bg={'nano.light'}>
      <Sidebar />

      <Flex
        w={'100%'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Navbar />
        <Flex
          w={'95%'}
          height={'85%'}
          bg={'white'}
          borderRadius={'8px'}
          align={'start'}
          p={'10px'}
          direction={'column'}
          overflow={'auto'}
        >
          <Flex direction={'column'} w={'100%'}>
            <HStack justify={'space-between'}>
              <Heading as={'h4'} size={{ base: 'sm', md: 'md' }} p={'10px'}>
                Notifications
              </Heading>
              <HStack>
                <Box
                  _hover={{ bg: 'gray.50' }}
                  p={'4px 10px'}
                  borderRadius={'4px'}
                >
                  <Text fontSize={{ base: '11px', sm: '12px' }}>
                    {start + 1} - {end()} of{' '}
                    {notifications && notifications?.length}
                  </Text>
                </Box>
                <Button
                  w={'30px'}
                  h={'30px'}
                  bg={'none'}
                  isDisabled={page === 1}
                  cursor={'pointer'}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  borderRadius={100}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() => handlePagination(page - 1)}
                >
                  <Icon as={IoIosArrowBack} fontSize={'15px'} />
                </Button>
                <Button
                  w={'30px'}
                  h={'30px'}
                  isDisabled={end() >= notifications.length}
                  cursor={'pointer'}
                  bg={'none'}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  borderRadius={50}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() => handlePagination(page + 1)}
                >
                  <Icon as={IoIosArrowForward} fontSize={'15px'} />
                </Button>
              </HStack>
            </HStack>
            <Divider orientation='horizontal' bg={'gray.50'} />
          </Flex>
          <Box h={'90%'} w={'100%'} overflow={'auto'}>
            <NotificationTable notification={paginatedData} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Notification;
