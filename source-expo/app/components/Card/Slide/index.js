import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Images, useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';
import Loading from './Loading';

const CardSlide = ({ date = '', title = '', image = Images.news, style = {}, onPress, loading }) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}
    >
      <ImageBackground source={image} style={styles.imageBackground} borderTopLeftRadius={8} borderTopRightRadius={8} />

      <Text body2 semibold style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text overline medium grayColor style={styles.description}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

CardSlide.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default CardSlide;
