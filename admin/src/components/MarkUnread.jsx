import React from 'react';
import { FiMail } from 'react-icons/fi';
import { Flex, Icon, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useUpdateNotificationMutation } from '../features/notificationSlice';
import { useNavigate } from 'react-router-dom';

const MarkUnread = ({ id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [updateNotification] = useUpdateNotificationMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const handleUpdate = async () => {
    try {
      const body = { read: false, id };
      await updateNotification(body).unwrap();
      toast({
        title: 'Notification marked as unread',
        position: 'top-right',
        variant: 'left-accent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err?.message);
    } finally {
      navigate('/notification');
    }
  };
  return (
    <Flex>
      <VStack
        w={'40px'}
        h={'40px'}
        borderRadius={50}
        align={'center'}
        justify={'center'}
        position={'relative'}
        _hover={{ bg: 'gray.200' }}
        cursor={'pointer'}
      >
        <Icon
          as={FiMail}
          fontSize={'15px'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleUpdate}
        />
        <Text
          display={isHovered ? 'block' : 'none'}
          bg={'gray.700'}
          w={'95px'}
          color={'white'}
          p={'3px 7px'}
          borderRadius={'5px'}
          height={'fit-content'}
          fontSize={'11px'}
          m={'0px'}
          position={'absolute'}
          top={'33px'}
          zIndex={'1000'}
        >
          Mark as unread
        </Text>
      </VStack>
    </Flex>
  );
};

export default MarkUnread;
