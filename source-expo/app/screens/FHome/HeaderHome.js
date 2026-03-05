import { Fragment } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, Images, useTheme } from '@/config';
import { Icon, Image, Text } from '@/components';
import styles from './styles';

const HeaderHome = (props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { onPressRight = () => {}, style = {}, ComponentRight } = props;

  return (
    <Fragment>
      <View style={[styles.header, style]}>
        <Image source={Images.profile1} style={styles.avatar} borderRadius={18} />
        <View style={styles.contentHeader}>
          <Text subhead light>
            {t('hello')}
          </Text>
          <Text body2>Steve Garrett</Text>
        </View>

        {ComponentRight ? (
          ComponentRight
        ) : (
          <TouchableOpacity style={{ position: 'relative' }} onPress={onPressRight}>
            <Icon name={'bell'} solid size={19} color={BaseColor.grayColor} />
            <View
              style={[
                styles.notyHeader,
                {
                  borderColor: BaseColor.whiteColor,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
};

export default HeaderHome;
