import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export default function CategoryFull({
  style = {},
  image = '',
  icon = '',
  title = '',
  subtitle = '',
  onPress = () => {},
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={{ flex: 1, height: '100%' }} borderRadius={8} />
      <View style={styles.contentIcon}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
          <Icon name={icon} size={18} color={BaseColor.whiteColor} />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text headline bold whiteColor>
            {title}
          </Text>
          <Text body2 bold whiteColor>
            {subtitle} {t('location')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

CategoryFull.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};
