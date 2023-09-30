import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import PagesNavigation from './pages-navigation.component';

function MainLayout() {
  return (
    <Flex w="100vw" h="100vh" bg="gray.900" overflow="hidden">
      <PagesNavigation />
      <Outlet />
    </Flex>
  );
}

export default MainLayout;
