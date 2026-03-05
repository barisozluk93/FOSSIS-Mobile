import { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { BaseStyle, useTheme, Images } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import ImagePicker from '@/screens/Components/Common/ImagePicker';
import { Header, Icon, SafeAreaView, Text, Card } from '@/components';
import stylesInline from './styles';

const CardReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [image, setImage] = useState({
    name: 'profile1',
    image: Images.profile1,
  });
  const [label, setLabel] = useState('Hello Mazi');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Card Component'}
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
            <Card image={image.image} style={{ height: 100 }} onPress={onPress}>
              <Text footnote whiteColor>
                {label}
              </Text>
            </Card>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <ImagePicker label="Image" value={image} onChange={(v) => setImage(v)} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Input
                label={'Children'}
                placeholder="Please input Label"
                onChangeText={(value) => setLabel(value)}
                value={label}
              />
            </View>
          </View>
          <View style={styles.example}>
            <Text footnote bold>
              Example
            </Text>
            <View style={styles.row}>
              <Card style={stylesInline.cardDemo} image={Images.Profile2} onPress={onPress} />
            </View>
            <View style={styles.row}>
              <Card style={stylesInline.cardDemo2} image={Images.profile3} onPress={onPress}>
                <Text footnote whiteColor>
                  {'Mr.NavaTa'}
                </Text>
                <Text headline whiteColor semibold>
                  {'Nguyen Van Thai'}
                </Text>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardReview;
