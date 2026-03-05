import { useState } from 'react';
import { View, Alert } from 'react-native';
import moment from 'moment';
import { EReviewsData } from '@/data';
import { Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import DatePicker from '@/screens/Components/Common/DatePicker';
import { Text, CardCommentSimple } from '@/components';

const CardCommentSimpleReview = () => {
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

  const onAction = () => {
    Alert.alert('The action of Card');
  };

  return (
    <Container title={'CommentSimple Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardCommentSimple
            image={image.image}
            name={name}
            date={moment(date).format('YYYY MMMM DD')}
            title={title}
            comment={comment}
            onAction={onAction}
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
              <CardCommentSimple
                image={item.source}
                name={item.name}
                date={item.date}
                title={item.title}
                comment={item.comment}
                onAction={onAction}
              />
            </View>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default CardCommentSimpleReview;
