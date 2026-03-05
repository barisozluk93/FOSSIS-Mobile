import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Images } from '@/config';
import ProfileAuthor from '@/components/Profile/Author';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const News169 = ({
  style = {},
  image = Images.news,
  avatar = Images.profile2,
  name = '',
  description = '',
  title = '',
  onPress = () => {},
  loading,
}) => {
  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground} borderRadius={8} />
      <ProfileAuthor image={avatar} name={name} description={description} />
      <Text title3 semibold>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

News169.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

export default News169;
