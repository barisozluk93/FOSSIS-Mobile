import { useState } from 'react';
import { View, Alert } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import { Text, CardReport09, PickerSelect } from '@/components';

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

const CardReport09Review = () => {
  const [icon, setIcon] = useState(ICON[3]);
  const [title, setTitle] = useState('How To Spend Investment Money');
  const [textReadMore, setTextReadMore] = useState('Read More');
  const [description, setDescription] = useState('Proin eget tortor risus. Donec sollicitudin molestie malesuada');

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardReport09 Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardReport09
            icon={icon.key}
            title={title}
            description={description}
            textReadMore="Read More"
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
              containerStyle={{ marginTop: 0 }}
              label={'TextReadMore'}
              placeholder="Please input TextReadMore"
              onChangeText={(value) => setTextReadMore(value)}
              value={textReadMore}
            />
          </View>
          <View style={styles.right}>
            <PickerSelect label="Icon name" value={icon} onChange={(v) => setIcon(v)} options={ICON} />
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
          <View style={styles.item}>
            <CardReport09
              icon={'bullhorn'}
              title="Nulla porttitor accumsan tincidunt"
              description="Cras ultricies ligula sed magna dictum porta. Nulla porttitor accumsan tincidunt."
              textReadMore="Detail"
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardReport09Review;
