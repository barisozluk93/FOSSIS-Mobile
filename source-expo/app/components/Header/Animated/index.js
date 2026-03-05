import { Animated, View } from 'react-native';
import styles from './styles';

const HeaderAnimated = ({
  componentRight = null,
  componentLeft = null,
  componentBottom = null,
  scrollY = 0,
  widthRight = 80,
  heightScroll = 140,
  styleRight = {},
  style = {},
}) => {
  // const scrollY = useRef(new Animated.Value(0)).current;

  //For header background color from transparent to header color
  const positionTopInput = scrollY.interpolate({
    inputRange: [0, heightScroll],
    outputRange: [75, 16],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const paddingInput = scrollY.interpolate({
    inputRange: [0, heightScroll],
    outputRange: [0, widthRight],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const heightView = scrollY.interpolate({
    inputRange: [0, heightScroll],
    outputRange: [45, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const opacityHeader = scrollY.interpolate({
    inputRange: [0, heightScroll],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  return (
    <View style={[styles.paddingSrollView, { position: 'relative', paddingBottom: 0 }, style]}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
          alignItems: 'center',
          marginRight: widthRight,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            opacity: opacityHeader,
            justifyContent: 'center',
          }}
        >
          {componentLeft}
        </Animated.View>
      </View>
      <Animated.View
        style={{
          height: heightView,
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: positionTopInput,
          left: 20,
          width: '100%',
          paddingRight: paddingInput,
        }}
      >
        {componentBottom}
      </Animated.View>
      <View
        style={[
          styles.componentRight,
          {
            width: widthRight,
          },
          styleRight,
        ]}
      >
        {componentRight}
      </View>
    </View>
  );
};

export default HeaderAnimated;
