import { useTranslation } from 'react-i18next';
import { Header, Text } from '@/components';

function HeaderText() {
  const { t } = useTranslation();

  return (
    <Header
      renderLeft={() => (
        <Text header bold>
          {t('Report')}
        </Text>
      )}
      title={''}
      styleLeft={{
        flex: 1,
      }}
      styleContentLeft={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}
      styleContentCenter={{
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      styleRight={{ flex: 0 }}
      onPressRight={() => {}}
    />
  );
}

export default HeaderText;
