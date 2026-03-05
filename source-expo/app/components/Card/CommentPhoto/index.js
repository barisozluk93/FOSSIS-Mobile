import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BaseColor, Images, useTheme } from '@/config';
import Tag from '@/components/Tag';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import StarRating from '@/components/StarRating';
import Text from '@/components/Text';
import ProductGallery from '@/components/Product/Gallery';
import styles from './styles';

export default function CardCommentPhoto({
  style = {},
  image = Images.profile2,
  name = '',
  rate = 0,
  date = '',
  title = '',
  comment = '',
  images = [],
  onYes = () => {},
  onNo = () => {},
  totalLike = 0,
  openGallery = () => {},
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.contain, { backgroundColor: colors.background }, style]}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Image source={image} style={styles.thumb} borderRadius={20} />
        <View style={{ flex: 1 }}>
          <Text headline numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.contentRate}>
            <StarRating
              disabled={true}
              starSize={14}
              maxStars={5}
              rating={rate}
              selectedStar={() => {}}
              fullStarColor={BaseColor.yellowColor}
            />
            <Text footnote grayColor numberOfLines={1} style={{ paddingHorizontal: 4 }}>
              {date}
            </Text>
          </View>
        </View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Tag
              outlineIcon
              icon={<Icon name="heart" solid />}
              textStyle={{ color: colors.text, paddingHorizontal: 4 }}
              style={{
                height: 20,
                paddingTop: 0,
                paddingVertical: 0,
                paddingHorizontal: 10,
                padding: 0,
                borderColor: colors.border,
                marginHorizontal: 8,
                borderRadius: 4,
              }}
            >
              {totalLike}
            </Tag>
            <Icon name="ellipsis-v" />
          </View>
        </View>
      </View>
      <View>
        <Text headline>{title}</Text>
        <Text
          body2
          style={{
            marginTop: 10,
          }}
        >
          {comment}
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <ProductGallery images={images} onPress={openGallery} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Text body2 grayColor>
          Helpful?
        </Text>
        <Tag
          chip
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 16,
            borderWidth: 0,
          }}
          onPress={onYes}
        >
          Yes
        </Tag>
        <Tag chip style={{ paddingHorizontal: 16, borderWidth: 0 }} onPress={onNo}>
          No
        </Tag>
      </View>
    </View>
  );
}

CardCommentPhoto.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  comment: PropTypes.string,
  images: PropTypes.array,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  totalLike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openGallery: PropTypes.func,
};
