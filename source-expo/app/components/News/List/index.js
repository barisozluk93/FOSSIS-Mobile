import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const NewsList = ({
  style = {},
  onPress = () => {},
  image = Images.news,
  title = '',
  subtitle = '',
  date = '',
  loading,
}) => {
  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={styles.image} borderRadius={8} />
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          paddingVertical: 5,
        }}
      >
        <Text light footnote semibold grayColor>
          {subtitle}
        </Text>
        <Text headline semibold numberOfLines={2} style={styles.marginVertical5}>
          {title}
        </Text>
        <Text caption1 light grayColor>
          {date}
        </Text>
        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

NewsList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  loading: PropTypes.bool,
};

export default NewsList;
