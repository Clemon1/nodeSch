import React from 'react';
import { LuMailOpen } from 'react-icons/lu';
import { Flex, Icon } from '@chakra-ui/react';

const MarkRead = () => {
  return (
    <Flex>
      <Icon as={LuMailOpen} />
    </Flex>
  );
};

export default MarkRead;
