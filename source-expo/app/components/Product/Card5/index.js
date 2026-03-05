import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images, useTheme, BaseColor } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const Card5 = ({
  style,
  image = Images.eProduct,
  title = '',
  dateTime = '',
  hours = '',
  playTime = '',
  price = '',
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.contain, style, { borderBottomColor: colors.border }]} activeOpacity={0.9}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={image} style={styles.imageBackgroundCard3} borderRadius={8} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingLeft: 10, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={onPress}>
              <Text bold subhead numberOfLines={1}>
                {title}
              </Text>
            </TouchableOpacity>
            <Text style={styles.dateTime} caption1 light grayColor>
              {dateTime}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text overline light grayColor style={styles.hours}>
            <Icon name="clock" size={10} color={BaseColor.grayColor} /> {hours}
          </Text>
          <Text overline light grayColor style={styles.play}>
            <Icon name="play-circle" size={10} color={BaseColor.grayColor} /> {playTime}
          </Text>
          <Text overline style={styles.price}>
            {price}
          </Text>
        </View>
      </View>
    </View>
  );
};

Card5.propTypes = {
  image: PropTypes.node.isRequired,
  dateTime: PropTypes.string,
  playTime: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

export default Card5;
