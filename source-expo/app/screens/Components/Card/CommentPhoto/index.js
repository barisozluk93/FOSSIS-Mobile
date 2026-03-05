import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { EReviewsData } from '@/data';
import { Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import DatePicker from '@/screens/Components/Common/DatePicker';
import { Text, CardCommentPhoto, PickerSelect } from '@/components';

const IMAGES = [
  {
    key: 'none',
    name: 'None',
    data: [],
  },
  {
    key: 'product01',
    name: 'Product 01',
    data: [
      {
        id: 1,
        image: Images.productView,
      },
      {
        id: 2,
        image: Images.productGrid01,
      },
      {
        id: 3,
        image: Images.productGrid04,
      },
      {
        id: 4,
        image: Images.productGrid03,
      },
      {
        id: 5,
        image: Images.productGrid05,
      },
      {
        id: 6,
        image: Images.productGrid06,
      },
    ],
  },
  {
    key: 'product02',
    name: 'Product 02',
    data: [
      {
        id: 1,
        image: Images.productList13,
      },
      {
        id: 2,
        image: Images.productList12,
      },
      {
        id: 3,
        image: Images.productList11,
      },
      {
        id: 4,
        image: Images.productList10,
      },
      {
        id: 5,
        image: Images.productList09,
      },
      {
        id: 6,
        image: Images.productList08,
      },
    ],
  },
];

const CardCommentPhotoReview = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState({
    name: 'profile1',
    image: Images.profile1,
  });
  const [name, setName] = useState('Steve Garrett');
  const [title, setTitle] = useState('Nice Place');
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState(
    'Lorem ipsum dolor purus in efficitur aliquam, enim enim porttitor lacus, ut sollicitudin nibh neque in metus. adipiscing elit. Aliqam at turpis orci. Mauris nisl, in mollis acu  tincidunt. neque nec turpis aliquet, ut ornare velit molestie. '
  );
  const [rate, setRate] = useState(5);
  const [totalLike, setTotalLike] = useState(100);
  const [images, setImages] = useState(IMAGES[1]);

  return (
    <Container title={'CommentPhoto Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardCommentPhoto
            images={images.data}
            image={image.image}
            name={name}
            rate={rate}
            date={moment(date).format('YYYY MMMM DD')}
            title={title}
            comment={comment}
            totalLike={totalLike}
            openGallery={() => navigation.navigate('PreviewImage', { images: images.data })}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <ImagePicker label="Image" value={image} onChange={(v) => setImage(v)} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'Name'}
              placeholder="Please input Name"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </View>
          <View style={styles.right}>
            <Input
              label={'Title'}
              placeholder="Please input Title"
              onChangeText={(value) => setTitle(value)}
              value={title}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <DatePicker
              label={'Date'}
              placeholder="Please input Date"
              formatDisplay="YYYY MMMM DD"
              value={date}
              onChange={(value) => setDate(value)}
            />
          </View>
          <View style={styles.right}>
            <PickerSelect label="Images" value={images} onChange={(value) => setImages(value)} options={IMAGES} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <RangeSlider label="Max Rate" min={0} max={5} low={rate} onValueChanged={(value) => setRate(value)} />
          </View>
          <View style={styles.right}>
            <RangeSlider
              label="Total like"
              min={0}
              max={100}
              low={totalLike}
              onValueChanged={(value) => setTotalLike(value)}
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
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          {EReviewsData.map((item) => (
            <View key={item.name} style={styles.row}>
              <CardCommentPhoto
                images={item.images}
                image={item.source}
                name={item.name}
                rate={item.rate}
                date={item.date}
                title={item.title}
                comment={item.comment}
                totalLike={item.totalLike}
                openGallery={() => navigation.navigate('PreviewImage', { images: item.images })}
              />
            </View>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default CardCommentPhotoReview;
