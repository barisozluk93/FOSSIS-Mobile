import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import { Text, CardReport04, PickerSelect } from '@/components';

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

const CardReport04Review = () => {
  const [icon, setIcon] = useState(ICON[0]);
  const [title, setTitle] = useState('Total Hours Spent');
  const [price, setPrice] = useState('412');
  const [subTitle1, setSubTitle1] = useState('Over Time Work');
  const [percent1, setPercent1] = useState(100);
  const [subTitle2, setSubTitle2] = useState('Normal Work');
  const [percent2, setPercent2] = useState(80);
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport04 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport04
            icon={icon.key}
            title={title}
            price={price}
            subTitle1={subTitle1}
            percent1={`${percent1}%`}
            subTitle2={subTitle2}
            percent2={`${percent2}%`}
            description={description}
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
              label={'Price'}
              placeholder="Please input Price"
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              label={'SubTitle1'}
              placeholder="Please input SubTitle1"
              onChangeText={(value) => setSubTitle1(value)}
              value={subTitle1}
            />
          </View>
          <View style={styles.right}>
            <RangeSlider
              label="Percent1"
              min={0}
              max={100}
              low={percent1}
              onValueChanged={(value) => setPercent1(value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              containerStyle={{ marginTop: 0 }}
              label={'SubTitle2'}
              placeholder="Please input SubTitle2"
              onChangeText={(value) => setSubTitle2(value)}
              value={subTitle2}
            />
          </View>
          <View style={styles.right}>
            <RangeSlider
              label="Percent2"
              min={0}
              max={100}
              low={percent2}
              onValueChanged={(value) => setPercent2(value)}
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
              <CardReport04
                icon="credit-card"
                title="Cash Flow"
                price="$2900,98"
                subTitle1="Income"
                percent1="100%"
                subTitle2="Expense"
                percent2="80%"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport04Review;
