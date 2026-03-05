import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import { Text, CardReport10, PickerSelect } from '@/components';

const ICON = [
  {
    key: 'chart-line',
    name: 'Chart Line',
  },
  {
    key: 'arrow-up',
    name: 'Arrow Up',
  },
  {
    key: 'arrow-down',
    name: 'Arrow Down',
  },
  {
    key: 'wallet',
    name: 'Wallet',
  },
  {
    key: 'bitcoin',
    name: 'Bitcoin',
  },

  {
    key: 'shopping-cart',
    name: 'Shopping Cart',
  },
  {
    key: 'newspaper',
    name: 'Newspaper',
  },
  {
    key: 'project-diagram',
    name: 'Project Diagram',
  },
  {
    key: 'music',
    name: 'Music',
  },
];

const CardReport10Review = () => {
  const [icon, setIcon] = useState(ICON[4]);
  const [name, setName] = useState('Bitcoin');
  const [price, setPrice] = useState('-$129');
  const [percent, setPercent1] = useState(65);

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport10 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport10 icon={icon.key} name={name} percent={percent} price={price} onPress={onPress} />
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              containerStyle={{ marginTop: 0 }}
              label={'Title'}
              placeholder="Please input Title"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </View>
          <View style={styles.right}>
            <PickerSelect label="Icon name" value={icon} onChange={(v) => setIcon(v)} options={ICON} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'Price'}
              placeholder="Please input Price"
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.right}>
            <RangeSlider
              label="Percent"
              min={0}
              max={100}
              low={percent}
              onValueChanged={(value) => setPercent1(value)}
            />
          </View>
        </View>

        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <CardReport10 icon={'home'} name={'Utilities'} percent={25.5} price={'$600'} onPress={onPress} />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport10Review;
