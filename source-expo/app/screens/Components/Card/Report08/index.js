import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import { Text, CardReport08 } from '@/components';

const CardReport08Review = () => {
  const [title, setTitle] = useState('Current Goal');
  const [subTitle, setSubTitle] = useState('Accumulate $29,000');
  const [percent, setPercent] = useState(50);
  const [description, setDescription] = useState('Proin eget tortor risus. Donec sollicitudin molestie malesuada');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport08 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport08
            percent={parseInt(percent, 10)}
            title={title}
            subTitle={subTitle}
            description={description}
            onPress={onPress}
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
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'SubTitle'}
              placeholder="Please input SubTitle"
              onChangeText={(value) => setSubTitle(value)}
              value={subTitle}
            />
          </View>
          <View style={styles.right}>
            <RangeSlider
              label="Percent"
              min={0}
              max={100}
              low={percent}
              onValueChanged={(value) => setPercent(value)}
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
              label={'Description'}
              placeholder="Please input Description"
              onChangeText={(value) => setDescription(value)}
              value={description}
            />
          </View>
        </View>
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <CardReport08
                percent={80}
                title="Target"
                subTitle="Total $29,000"
                description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport08Review;
