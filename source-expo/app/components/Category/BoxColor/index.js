import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';
import Loading from './Loading';

const CategoryBoxColor = (props) => {
  const { loading, onPress = () => {}, style = {}, title = '', icon = 'book', color = '#FF8A65' } = props;

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: color,
          },
        ]}
        borderRadius={8}
      >
        <View style={styles.viewIcon}>
          <Icon solid name={icon} size={18} style={styles.icon} />
        </View>
        <Text whiteColor bold style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default CategoryBoxColor;
