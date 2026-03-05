import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';
import Loading from './Loading';

export default function CategoryIcon(props) {
  const { colors } = useTheme();
  const { style, icon, title = '', subtitle = '', onPress = () => {}, loading } = props;

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity
      style={[styles.contain, { backgroundColor: colors.backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.iconContent, { backgroundColor: colors.primaryLight }]}>
        <Icon name={icon} size={32} color={BaseColor.whiteColor} solid />
      </View>
      <View style={{ padding: 10 }}>
        <Text headline semibold>
          {title}
        </Text>
        <Text footnote semibold grayColor style={{ marginTop: 5 }}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CategoryIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};
