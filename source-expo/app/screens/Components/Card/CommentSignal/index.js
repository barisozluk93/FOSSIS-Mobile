import { useState } from 'react';
import { View, Alert } from 'react-native';
import { Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import { Text, CardCommentSignal } from '@/components';

const IMAGES = [
  {
    name: 'news01',
    image: Images.news01,
  },
  {
    name: 'news02',
    image: Images.news02,
  },
  {
    name: 'news03',
    image: Images.news03,
  },
  {
    name: 'news04',
    image: Images.news04,
  },
  {
    name: 'news05',
    image: Images.news05,
  },
  {
    name: 'news06',
    image: Images.news06,
  },
];
const CardCommentSignalReview = () => {
  const [image, setImage] = useState({
    name: 'profile1',
    image: Images.profile1,
  });
  const [imageThumbnail, setImageThumbnail] = useState(IMAGES[0]);
  const [title, setTitle] = useState('Profile information');
  const [subTitle, setSubTitle] = useState('Json Thomas');

  const [tagName, setTagName] = useState('News');
  const [comment, setComment] = useState(
    'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.'
  );
  const [commentUrl, setCommentUrl] = useState(
    'https://fintechmagazine.com/venture-capital/us-israeli-fintech-sunbit-raises-dollar130m-hits-unicorn-status'
  );
  const [titleThumbnail, setTitleThumbnail] = useState('How about your job?');
  const [subTitleThumbnail, setSubTitleThumbnail] = useState('https://fintechmagaz');
  const [titleShare, setTitleShare] = useState('Share');

  const onShare = () => {
    Alert.alert('Go to Share screen');
  };

  const onDetail = () => {
    Alert.alert('Go to Detail screen');
  };

  return (
    <Container title={'CommentSignal Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={[styles.item, { alignContent: 'center', alignItems: 'center' }]}>
          <CardCommentSignal
            image={image.image}
            imageThumbnail={imageThumbnail.image}
            title={title}
            subTitle={subTitle}
            tagName={tagName}
            titleShare={titleShare}
            comment={comment}
            commentUrl={commentUrl}
            titleThumbnail={titleThumbnail}
            subTitleThumbnail={subTitleThumbnail}
            onShare={onShare}
            onDetail={onDetail}
          />
        </View>
        <View style={styles.row}>
          <ImagePicker label="Image" value={image} onChange={(v) => setImage(v)} />
        </View>
        <View style={[styles.row, { marginTop: 15 }]}>
          <ImagePicker
            label="Image Thumbnail"
            images={IMAGES}
            value={imageThumbnail}
            onChange={(v) => setImageThumbnail(v)}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'Title'}
              placeholder="Please input Title"
              onChangeText={(value) => setTitle(value)}
              value={title}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'SubTitle'}
              placeholder="Please input SubTitle"
              onChangeText={(value) => setSubTitle(value)}
              value={subTitle}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'TagName'}
              placeholder="Please input TagName"
              onChangeText={(value) => setTagName(value)}
              value={tagName}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'TitleShare'}
              placeholder="Please input TitleShare"
              onChangeText={(value) => setTitleShare(value)}
              value={titleShare}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              style={{ height: 100 }}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              blurOnSubmit={true}
              label={'Comment'}
              placeholder="Please input Comment"
              onChangeText={(value) => setComment(value)}
              value={comment}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              style={{ height: 50 }}
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              blurOnSubmit={true}
              label={'CommentUrl'}
              placeholder="Please input CommentUrl"
              onChangeText={(value) => setCommentUrl(value)}
              value={commentUrl}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'TitleThumbnail'}
              placeholder="Please input titleThumbnail"
              onChangeText={(value) => setTitleThumbnail(value)}
              value={titleThumbnail}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'SubTitleThumbnail'}
              placeholder="Please input SubTitleThumbnail"
              onChangeText={(value) => setSubTitleThumbnail(value)}
              value={subTitleThumbnail}
            />
          </View>
        </View>
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.row}>
            <CardCommentSignal
              image={Images.coinBitcon}
              imageThumbnail={Images.categoryNews}
              title="Bitcon News"
              subTitle="Json Thomas, Breaking News"
              tagName="Teachnical"
              comment="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt."
              commentUrl="https://fintechmagazine.com/venture-capital/us-israeli-fintech-sunbit-raises-dollar130m-hits-unicorn-status"
              titleThumbnail="US-Israeli fintech Sunbit raises $130m, hits unicorn status"
              subTitleThumbnail="https://fintechmagaz"
              titleShare="Share"
              onDetail={onDetail}
              onShare={onShare}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardCommentSignalReview;
