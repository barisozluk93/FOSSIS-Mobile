import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Image, Text, Icon } from '@/components';
import { Images, useTheme } from '@/config';

const Featured = ({
  style,
  avatar = Images.profile1,
  image = Images.profile1,
  name = '',
  description = '',
  onPress = () => {},
}) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[{ height: 200, width: width * 0.7, borderRadius: 10 }, style]} onPress={onPress}>
      <Image
        source={image}
        style={{
          height: '70%',
          width: '100%',
        }}
        borderTopRightRadius={10}
        borderTopLeftRadius={10}
      />
      <View
        style={{
          height: '30%',
          backgroundColor: colors.card,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <Image source={avatar} style={{ width: 35, height: 35 }} borderRadius={25} />
        <View style={{ paddingLeft: 5, flex: 1 }}>
          <Text subhead bold style={{ paddingBottom: 5 }}>
            {name}
          </Text>
          <Text caption1 light grayColor>
            {description}
          </Text>
        </View>
        <Icon name="play-circle" size={24} solid style={{ marginVertical: 5 }} color={colors.text} />
      </View>
    </TouchableOpacity>
  );
};

export default Featured;
