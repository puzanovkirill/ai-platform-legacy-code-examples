import { HStack, Text } from '@chakra-ui/react';
import FileTitle from './file-title.widget';
import HandlerInfo from './handler-info.widget';

function HeaderTitle() {
  return (
    <HStack spacing={0} px={24}>
      <HandlerInfo />
      <Text color="white" fontWeight="bold" px={2}>
        :
      </Text>
      <FileTitle />
    </HStack>
  );
}

export default HeaderTitle;
