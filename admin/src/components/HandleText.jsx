import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

const HandleText = ({ message }) => {
  let content;
  if (message) {
    const parts = message.split('\n');
    content = (
      <VStack align={'start'} w={'100%'}>
        {parts.map((text) => (
          <Text key={text[0]}>{text}</Text>
        ))}
      </VStack>
    );
  } else content = 'No valid data';

  return content;
};

export default HandleText;
