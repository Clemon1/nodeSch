import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ArchiveNotification from '../components/ArchiveNotification';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import {
  IoIosArrowRoundBack,
  IoIosArrowForward,
  IoIosArrowBack,
} from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectNotificationById,
  selectAllNotifications,
  selectNotificationIds,
  useGetNotificationQuery,
  useGetSingleNotificationQuery,
} from '../features/notificationSlice';
import { useNavigate } from 'react-router-dom';
import { useUpdateNotificationMutation } from '../features/notificationSlice';
import NotificationSingleDetails from '../components/NotificationSingleDetails';
import MarkUnread from '../components/MarkUnread';
import { currentUser } from '../features/authSlice';

const SingleNotification = () => {
  const { id } = useParams();
  const user = useSelector(currentUser);
  const {
    data: nots,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotificationQuery(user._id);
  const {
    data: singleNots,
    isLoading: isLoadingSingle,
    isSuccess: isSuccessSingle,
    isError: isErrorSingle,
    error: errorSingle,
  } = useGetSingleNotificationQuery(id);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [update, setUpdate] = useState(id);
  //archive button expects alls ids in an array
  const data = [id];
  const [updateNotification] = useUpdateNotificationMutation();
  // const notice = useSelector((state) => selectNotificationById(state, id));
  // const ids = useSelector((state) => selectNotificationIds(state));
  // const notifications = useSelector((state) => selectAllNotifications(state));

  let notifications;
  let notice;
  let noticeData;
  let ids;
  if (isLoadingSingle) {
    notice = 'Loading';
  }
  if (isErrorSingle) {
    notice = errorSingle;
  }
  if (isSuccessSingle) {
    notice = Object.values(singleNots?.entities);
    [noticeData] = notice;
    // console.log(noticeData);
  }
  if (isLoading) {
    notifications = 'Loading';
  }
  if (isError) {
    notifications = error;
  }
  if (isSuccess) {
    notifications = Object.values(nots?.entities);
    ids = nots?.ids;
  }

  const handleIds = () => {
    const index = ids?.indexOf(id);
    if (index === -1) {
      return 1;
    }
    return index;
  };
  const handleMarkRead = async (id) => {
    try {
      // console.log('executed mark as read function');
      if (!id) {
        return null;
      }
      const body = { read: true, id };
      return await updateNotification(body);
    } catch (error) {
      console.log(error?.message);
    }
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
          <Flex direction={'column'} w={'100%'} mb={''}>
            <HStack justify={'space-between'}>
              <HStack
                align={'center'}
                w={'20%'}
                h={'50px'}
                gap={{ base: '5px', md: '10px' }}
              >
                <NavLink to={'/notification'}>
                  <Flex
                    w={'40px'}
                    h={'40px'}
                    borderRadius={'100px'}
                    _hover={{ bg: 'gray.100' }}
                    align={'center'}
                    justify={'center'}
                  >
                    <Icon as={IoIosArrowRoundBack} fontSize={'25px'} />
                  </Flex>
                </NavLink>
                <ArchiveNotification ids={data} />
                <MarkUnread id={id} />
              </HStack>

              <HStack>
                <Text fontSize={'12px'} color={'gray.500'}>
                  {handleIds() + 1} of {notifications && notifications?.length}
                </Text>
                <Button
                  w={'30px'}
                  h={'30px'}
                  bg={'none'}
                  isDisabled={handleIds() === 0}
                  cursor={'pointer'}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  borderRadius={100}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={async () => {
                    let backId = ids && ids[handleIds() - 1];
                    await handleMarkRead(backId);
                    return navigate(`/notification/${backId}`);
                  }}
                >
                  <Icon as={IoIosArrowBack} fontSize={'15px'} />
                </Button>
                <Button
                  w={'30px'}
                  h={'30px'}
                  isDisabled={handleIds() + 1 >= ids?.length}
                  cursor={'pointer'}
                  bg={'none'}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  borderRadius={50}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={async () => {
                    let forwardId = ids && ids[handleIds() + 1];
                    await handleMarkRead(forwardId);
                    return navigate(`/notification/${forwardId}`);
                  }}
                >
                  <Icon as={IoIosArrowForward} fontSize={'15px'} />
                </Button>
              </HStack>
            </HStack>
          </Flex>
          <Divider />
          <NotificationSingleDetails details={noticeData} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleNotification;
