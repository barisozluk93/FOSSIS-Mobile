import { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { BaseStyle, useTheme, Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import { Header, Icon, SafeAreaView, Text, CardSlide } from '@/components';
import stylesInline from './styles';

const CardSlideReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [image, setImage] = useState({
    name: 'profile1',
    image: Images.profile1,
  });
  const [title, setTitle] = useState('Mr.Navata');
  const [date, setDate] = useState('22-05-1992');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'CardSlide Component'}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text footnote bold>
            Demo
          </Text>
          <View style={[styles.item, { alignContent: 'center', alignItems: 'center' }]}>
            <CardSlide image={image.image} title={title} date={date} onPress={onPress} />
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <ImagePicker label="Image" value={image} onChange={(v) => setImage(v)} />
            </View>
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
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Input
                label={'Date'}
                placeholder="Please input Subtile"
                onChangeText={(value) => setDate(value)}
                value={date}
              />
            </View>
          </View>
          <View style={stylesInline.example}>
            <Text footnote bold>
              Example
            </Text>
            <View style={styles.row}>
              <CardSlide style={{}} image={Images.news02} title="News" date="28-04-2020" onPress={onPress} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardSlideReview;
