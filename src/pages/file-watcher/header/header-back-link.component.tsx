import { useTranslation } from 'react-i18next';
import { Center, Icon, Image, Link, Tooltip } from '@chakra-ui/react';
import { ArrowLeft } from 'phosphor-react';
import { PATHNAMES } from '../../../_const';
import logoAI from '../../../static/logo-ai.svg';

function HeaderBackLink() {
  const { t } = useTranslation('common');

  return (
    <Tooltip label={t('GoBack')} openDelay={500}>
      <Center w={24} pos="absolute" left={0}>
        <Link
          display="flex"
          alignItems="center"
          href={PATHNAMES.dashboard}
          gap={2}
        >
          <Icon as={ArrowLeft} color="white" h={5} w={5} />
          <Image src={logoAI} />
        </Link>
      </Center>
    </Tooltip>
  );
}

export default HeaderBackLink;
