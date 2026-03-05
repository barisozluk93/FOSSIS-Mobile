import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import { Text, CardReport03, PickerSelect } from '@/components';

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

const CardReport03Review = () => {
  const [icon, setIcon] = useState(ICON[0]);
  const [title, setTitle] = useState('Balance');
  const [subTitle, setSubTitle] = useState('Bitcoin');
  const [percent, setPercent] = useState('8,99%');
  const [price, setPrice] = useState('$1000');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport03 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport03
            icon={icon.key}
            title={title}
            price={price}
            subTitle={subTitle}
            percent={percent}
            onPress={onPress}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <PickerSelect label="Icon name" value={icon} onChange={(v) => setIcon(v)} options={ICON} />
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
              containerStyle={{ marginTop: 0 }}
              label={'Price'}
              placeholder="Please input Price"
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.right}>
            <Input
              containerStyle={{ marginTop: 0 }}
              label={'Percent'}
              placeholder="Please input Percent"
              onChangeText={(value) => setPercent(value)}
              value={percent}
            />
          </View>
        </View>
        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <CardReport03
                icon="chart-line"
                title="Profits"
                price="$98,99"
                subTitle="Bitcoin"
                percent="8,99%"
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport03Review;
