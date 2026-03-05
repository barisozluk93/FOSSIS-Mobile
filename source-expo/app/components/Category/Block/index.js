import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const CategoryBlock = ({ style = {}, image = Images.location1, title = '', subtitle = '', onPress, loading }) => {
  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.5}>
      <Image source={image} style={styles.image} borderRadius={8} />
      <View style={styles.contentIcon}>
        <View style={{ paddingLeft: 10 }}>
          <Text headline bold whiteColor>
            {title}
          </Text>
          <Text body2 bold whiteColor>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBlock.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

export default CategoryBlock;
