import React from 'react';
import ArchiveNotification from '../components/ArchiveNotification';
import MarkUnread from '../components/MarkUnread';
import { Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import NotificationModal from '../components/NotificationModal';
import { useGetNotificationQuery } from '../features/notificationSlice';
import { useSelector } from 'react-redux';
import { currentUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import HandleText from '../components/HandleText';
const Test = () => {
  // const user = useSelector(currentUser);
  // const navigate = useNavigate();
  // const { data, isLoading, isSuccess, isError, error } =
  //   useGetNotificationQuery(user._id);
  // let read;
  // let content;
  // if (isLoading) {
  //   content = 'Loading';
  // }
  // if (isError) {
  //   content = error;
  // }
  // if (isSuccess) {
  //   content = data;
  //   read = Object.values(content?.entities);
  // }
  // console.log(read);
  const message =
    'Hello, \nA client has requested for the following hardware subscription, Start frontend ui/ux design using figma, master all figma tools. build several projects to gain experience of figma. also use other tools such as Photoshop and illustrator for design of projects. Use figma for any new projects you receive going forward  the details are:\n\n Productname: Antminer S9I (Signatured)\nMining Hashrate: 15.2Th/s\nPower Consumption: 2375\nSubcription Fee: 15\nQuantity: 4\nCurrent Status: Pending\nYou will be notified as soon as admin approves your request. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ducimus sequi tempore. Alias tenetur unde, distinctio libero est aliquid fuga?\n\nWarmest Regards,\nNanohostng Team.';
  return (
    <Flex align={'center'} justify={'center'} h={'100vh'} w={'100vw'}>
      <HandleText message={message} />
    </Flex>
  );
};

export default Test;
