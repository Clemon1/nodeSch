import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { date } from './TableRow';
import HandleText from './HandleText';

const NotificationSingleDetails = ({ details }) => {
  return (
    <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
      <Flex
        w={{ base: '97%', sm: '95%', md: '90%' }}
        h={'90%'}
        overflow={'auto'}
      >
        <VStack align={'start'} gap={5}>
          <VStack align={'start'}>
            <Heading as={'h4'} size={'md'}>
              {details?.subject}
            </Heading>
            <Text fontSize={'14px'} color={'gray.600'}>
              {date(details && details?.createdAt)?.formDate} (
              {date(details && details?.createdAt)?.formatDate})
            </Text>
          </VStack>
          <HandleText message={details?.message} />
        </VStack>
      </Flex>
    </Flex>
  );
};

export default NotificationSingleDetails;
