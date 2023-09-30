import { Flex, Text, useClipboard } from '@chakra-ui/react';

type TIdAndClass = {
  objectId: string;
  objectClass: string;
  prefix?: string;
};

function IdAndClass({ objectId, objectClass, prefix }: TIdAndClass) {
  const { onCopy } = useClipboard(objectId);

  return (
    <Flex
      w={36}
      cursor="pointer"
      onClick={onCopy}
      title={`${objectId} ${objectClass}`}
      h="full"
      color="white"
    >
      <Text
        fontSize={16}
        w={36}
        overflowX="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >{`${prefix || ''}${objectId} ${objectClass}`}</Text>
    </Flex>
  );
}

export default IdAndClass;
