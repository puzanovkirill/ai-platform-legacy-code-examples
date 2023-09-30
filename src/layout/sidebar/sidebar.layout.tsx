import { Flex } from '@chakra-ui/react';

type TProps = {
  content: JSX.Element;
};

function Sidebar({ content }: TProps): JSX.Element {
  return (
    <Flex direction="column" align="flex-start" h="full">
      <Flex w="full" overflowY="auto" flexDir="column" gap={2} minW={32}>
        {content}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
