import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { CardFileAttachment, Icon, Text } from '@/components';
import { useTheme } from '@/config';
import { PAttachments } from '@/data';

const ChooseFile = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Fragment>
      <View
        style={{
          backgroundColor: colors.card,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <Icon name="cloud-upload-alt" size={48} color={colors.primaryLight} />
        <Text headline>{t('upload_your_files')}</Text>
        <Text footnote light>
          {t('description_upload_file')}
        </Text>
      </View>
      {PAttachments.map((item, index) => (
        <CardFileAttachment
          key={index}
          icon={item.icon}
          name={item.name}
          percent={item.percent}
          size={item.size}
          backgroundIcon={item.backgroundIcon}
          onPress={() => {}}
        />
      ))}
    </Fragment>
  );
};

export default ChooseFile;
