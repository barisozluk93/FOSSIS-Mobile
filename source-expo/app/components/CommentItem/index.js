import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BaseColor, Images, useTheme } from '@/config';
import Image from '@/components/Image';
import StarRating from '@/components/StarRating';
import Text from '@/components/Text';
import styles from './styles';

export default function CommentItem({
  style = {},
  image = Images.profile2,
  name = '',
  rate = 0,
  date = '',
  title = '',
  comment = '',
}) {
  const { colors } = useTheme();
  const cardColor = colors.card;

  return (
    <View style={[styles.contain, { backgroundColor: cardColor }, style]}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.contentLeft}>
          <Image source={image} style={styles.thumb} borderRadius={20} />
          <View>
            <Text headline semibold numberOfLines={1}>
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
            </View>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text caption2 grayColor numberOfLines={1}>
            {date}
          </Text>
        </View>
      </View>
      <View>
        <Text subhead semibold>
          {title}
        </Text>
        <Text
          body2
          grayColor
          style={{
            marginTop: 10,
          }}
        >
          {comment}
        </Text>
      </View>
    </View>
  );
}

CommentItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  comment: PropTypes.string,
};
