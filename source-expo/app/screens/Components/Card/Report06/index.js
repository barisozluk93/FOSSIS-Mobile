import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import { Text, CardReport06, PickerSelect } from '@/components';

const ICON = [
  {
    key: 'arrow-up',
    name: 'Arrow Up',
  },
  {
    key: 'arrow-down',
    name: 'Arrow Down',
  },
  {
    key: 'cog',
    name: 'Cog',
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

const CardReport06Review = () => {
  const [icon, setIcon] = useState(ICON[0]);
  const [title, setTitle] = useState('Income');
  const [price, setPrice] = useState('$1000');
  const [percent, setPercent] = useState('+8,99%');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport06 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport06 icon={icon.key} title={title} price={price} percent={percent} onPress={onPress} />
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
          <View style={styles.left}>
            <Input
              label={'Percent'}
              placeholder="Please input Percent"
              onChangeText={(value) => setPercent(value)}
              value={percent}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              containerStyle={{ marginTop: 0 }}
              label={'Price'}
              placeholder="Please input Price"
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.right}>
            <PickerSelect label="Icon name" value={icon} onChange={(v) => setIcon(v)} options={ICON} />
          </View>
        </View>
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.item}>
            <CardReport06 icon="arrow-up" title="BTC" price="$0.68" percent="+8,99%" onPress={onPress} />
          </View>
          <View style={styles.item}>
            <CardReport06 icon="arrow-down" title="BTC" price="$0.68" percent="-1,99%" onPress={onPress} />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport06Review;
