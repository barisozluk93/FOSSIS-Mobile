import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';
import Loading from './Loading';

const NewsGrid = ({
  title = '',
  style = {},
  image = Images.news,
  onPress = () => {},
  loading,
  imageStyle = {},
  componentTitle,
}) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <ImageBackground source={image} style={[styles.imageBackground, imageStyle]} borderRadius={8} />
        {componentTitle ? (
          componentTitle
        ) : (
          <Text body2 medium style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

NewsGrid.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  onPress: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default NewsGrid;
