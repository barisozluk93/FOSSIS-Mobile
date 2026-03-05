import { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { BaseStyle, useTheme, Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import { Header, Icon, SafeAreaView, Text, CardList } from '@/components';
import stylesInline from './styles';

const CardListReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [image, setImage] = useState({
    name: 'profile1',
    image: Images.profile1,
  });
  const [title, setTitle] = useState('Mr.Navata');
  const [subtitle, setSubtitle] = useState('I am a developer');
  const [rate, setRate] = useState(5);

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'CardList Component'}
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
            <CardList image={image.image} title={title} subtitle={subtitle} rate={rate} onPress={onPress} />
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
                label={'SubTitle'}
                placeholder="Please input Subtile"
                onChangeText={(value) => setSubtitle(value)}
                value={subtitle}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Rate" min={1} max={5} low={rate} onValueChanged={(value) => setRate(value)} />
            </View>
          </View>

          <View style={stylesInline.example}>
            <Text footnote bold>
              Example
            </Text>
            <View style={styles.row}>
              <CardList image={Images.news01} title="News" subtitle="Description news" rate={4.5} onPress={onPress} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardListReview;
