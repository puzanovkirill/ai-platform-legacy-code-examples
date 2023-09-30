import { Box, Flex, IconButton, Image, Link } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../../components';
import { NAVIGATION_ITEMS, PATHNAMES } from '../../_const';
import logo from '../../static/logo.svg';

function PagesNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex flexDir="column" justifyContent="space-between" bg="gray.800" w={12}>
      <Box>
        <Link
          display="flex"
          alignItems="center"
          justifyContent="center"
          href={`${PATHNAMES.dashboard}`}
          w={12}
          h={12}
        >
          <Image w={8} h={8} src={logo} alt="AI" />
        </Link>
        {NAVIGATION_ITEMS.map((item) => (
          <IconButton
            key={item.path}
            w={12}
            h={12}
            borderRadius="none"
            bg={location.pathname === item.path ? 'gray.600' : 'gray.800'}
            color="white"
            aria-label="navigate"
            icon={item.icon}
            onClick={() => navigate(item.path, { replace: true })}
            _hover={{ bg: 'gray.700' }}
          />
        ))}
      </Box>
      <Logout />
    </Flex>
  );
}

export default PagesNavigation;
