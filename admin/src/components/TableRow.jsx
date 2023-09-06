import {
  Tr,
  Td,
  Checkbox,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useUpdateNotificationMutation } from '../features/notificationSlice';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';
export const date = (date) => {
  if (!date) {
    return 'Invalid date';
  }
  const dt = parseISO(date);
  const formDate = format(dt, 'PP');
  const formatDate = formatDistanceToNow(dt, { addSuffix: true });
  const datas = { formDate, formatDate };
  return datas;
};
const TableRow = ({ data }) => {
  const navigate = useNavigate();
  const [updateNotification] = useUpdateNotificationMutation();
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
    <Tr
      key={data._id}
      bg={data.read === true ? 'gray.50' : null}
      // bg={'nano.light'}
      _hover={{ bg: 'gray.50', cursor: 'pointer' }}
      p={'5px'}
    >
      <Td p={{ base: '0px', md: '16px' }}>
        <Checkbox
          value={data._id}
          color={'gray.400'}
          _control={{ color: 'gray.500' }}
        ></Checkbox>
      </Td>
      <Td
        onClick={async () => {
          try {
            await handleMarkRead(data._id);
            return navigate(`/notification/${data._id}`);
          } catch (error) {
            console.log(error?.message);
          }
        }}
      >
        <HStack justify={'space-between'}>
          <VStack w={{ base: '70%', md: '20%' }} align={'start'}>
            <Heading
              as={'h6'}
              fontSize={{ base: '12px', sm: '13px', md: '14px', lg: '15px' }}
            >
              {data.subject}
            </Heading>
            <Text
              mt={'10px'}
              display={{ md: 'block', lg: 'none' }}
              fontSize={{ base: '12px', sm: '13px', md: '14px', lg: '15px' }}
            >
              {data.message.length > 50
                ? data.message.substr(0, 40) + '...'
                : data.message}
            </Text>
          </VStack>
          <Text
            display={{ base: 'none', lg: 'block' }}
            fontSize={{ base: '10px', lg: '15px' }}
            // fontFamily={'sans-serif'}
          >
            {data.message.length > 50
              ? data.message.substr(0, 80) + '...'
              : data.message}
          </Text>
          <Text fontSize={{ base: '12px', sm: '13px', md: '14px', lg: '15px' }}>
            {date(data.createdAt).formDate.split(',')[0]}
          </Text>
        </HStack>
      </Td>
    </Tr>
  );
};

export default TableRow;
