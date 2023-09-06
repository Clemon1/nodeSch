import React from 'react';
import { BiArchiveIn } from 'react-icons/bi';
import { Flex, Icon, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useArchiveNotificationMutation } from '../features/notificationSlice';
import { useNavigate } from 'react-router-dom';

const ArchiveNotification = ({ ids }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [archiveNotification, { isLoading }] = useArchiveNotificationMutation();
  const toast = useToast();
  const handleArchive = async () => {
    try {
      if (ids.length === 1) {
        await archiveNotification(ids[0]);
      } else if (ids.length > 1) {
        //for every ids to be archived the method loops over the array and makes a single network request at a time till it iterates over all ids, this might result in significant network cost. this logic would be reviewed as soon as possible
        for (let i = 0; i < ids.length; i++) {
          await archiveNotification(ids[i]);
        }
      }
      toast({
        title: 'Notification archived',
        position: 'top-right',
        variant: 'left-accent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      //   console.log('handled archrive');
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
          as={BiArchiveIn}
          fontSize={'15px'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleArchive}
        />
        <Text
          display={isHovered ? 'block' : 'none'}
          bg={'gray.700'}
          color={'white'}
          p={'3px 7px'}
          borderRadius={'5px'}
          height={'fit-content'}
          fontSize={'12px'}
          m={'0px'}
          position={'absolute'}
          top={'33px'}
          zIndex={'1000'}
        >
          Archive
        </Text>
      </VStack>
    </Flex>
  );
};

export default ArchiveNotification;
