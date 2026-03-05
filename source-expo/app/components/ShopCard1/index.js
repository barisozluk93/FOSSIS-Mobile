import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { BaseColor, Images, useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import StarRating from '@/components/StarRating';
import styles from './styles';
import Loading from './Loading';

const ShopCard1 = ({
  style = {},
  image = Images.eProduct,
  title = 'Apple',
  rating = 4.5,
  totalRating = '(10)',
  description = '300 products',
  isVerified = false,
  onPress = () => {},
  loading = false,
}) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity
      style={[
        styles.contain,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View>
        <ImageBackground source={image} style={styles.imageBackgroundCard3} borderRadius={8} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text headline>{title}</Text>
            {isVerified && (
              <Icon solid name="check-circle" style={{ paddingHorizontal: 4, color: BaseColor.blueColor }} />
            )}
          </View>

          <Text footnote grayColor style={{ marginTop: 2 }}>
            {description}
          </Text>
        </View>
        <View
          style={{
            width: 160,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <StarRating starSize={14} maxStars={5} rating={rating} fullStarColor={BaseColor.yellowColor} />
          <Text
            footnote
            grayColor
            style={{
              marginLeft: 5,
              textAlign: 'center',
            }}
          >
            {totalRating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopCard1;
