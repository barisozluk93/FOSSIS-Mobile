import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Text from '@/components/Text';
import Image from '@/components/Image';
import Tag from '@/components/Tag';
import Icon from '@/components/Icon';
import styles from './styles';

const CardCommentSignal = ({
  style = {},
  image = Images.news,
  imageThumbnail = Images.news,
  title = '',
  subTitle = '',
  tagName = '',
  comment = '',
  commentUrl = '',
  titleThumbnail = '',
  subTitleThumbnail = '',
  titleShare = '',
  onDetail = () => {},
  onShare = () => {},
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.viewContainer, { borderTopColor: colors.border }]}>
      <TouchableOpacity style={[styles.container, style]} onPress={onDetail}>
        <Image source={image} style={styles.image} borderRadius={20} />
        <View style={{ paddingLeft: 8, flex: 1 }}>
          <Text headline>{title}</Text>
          <Text footnote light>
            {subTitle}
          </Text>
        </View>
        <View style={{ height: '100%' }}>
          <Tag primary small>
            {tagName}
          </Tag>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text body2>{comment}</Text>
        <Text body2 accentColor style={{ marginTop: 10 }}>
          {commentUrl}
        </Text>
        <View
          style={[
            styles.contentThumbnail,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <Image
            source={imageThumbnail}
            style={styles.thumbnail}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            resizeMode="stretch"
          />
          <View style={{ padding: 10 }}>
            <Text subhead bold>
              {titleThumbnail}
            </Text>
            <Text footnote light style={{ marginTop: 5 }}>
              {subTitleThumbnail}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onShare}>
          <Text body2 style={{ textAlign: 'right', paddingVertical: 10 }}>
            <Icon name="share-alt-square" size={14} /> {titleShare}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CardCommentSignal.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  imageThumbnail: PropTypes.node.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  tagName: PropTypes.string,
  comment: PropTypes.string,
  commentUrl: PropTypes.string,
  titleThumbnail: PropTypes.string,
  subTitleThumbnail: PropTypes.string,
  onShare: PropTypes.func,
};

export default CardCommentSignal;
