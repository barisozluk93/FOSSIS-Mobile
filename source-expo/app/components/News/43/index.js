import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { BaseColor, Images } from '@/config';
import ProfileAuthor from '@/components/Profile/Author';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const News43 = ({
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
      <ImageBackground source={image} style={styles.imageBackground} borderRadius={8}>
        <View style={styles.viewBackground}>
          <View style={styles.viewItem}>
            <ProfileAuthor
              styleThumb={styles.styleThumb}
              image={avatar}
              styleName={{ color: BaseColor.whiteColor }}
              styleDescription={{
                color: BaseColor.whiteColor,
              }}
              name={name}
              description={description}
            />
          </View>
          <Text title3 whiteColor semibold>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

News43.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

export default News43;
