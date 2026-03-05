import { useState } from 'react';
import { View, Alert } from 'react-native';
import { EFilterColors } from '@/data';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import Container from '@/screens/Components/Common/Container';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import { Text, CardFileAttachment, PickerSelect, ProductColorPicker } from '@/components';

const ICON = [
  {
    key: 'file-video',
    name: 'File video',
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

const CardFileAttachmentReview = () => {
  const [icon, setIcon] = useState(ICON[0]);
  const [name, setName] = useState('Video.mp4');
  const [percent, setPercent] = useState(100);
  const [size, setSize] = useState('3.9 KB');
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[3]);

  const onPress = () => {
    Alert.alert('You are press this Card');
  };

  return (
    <Container title={'CardFileAttachment Component'}>
      <View style={styles.container}>
        <Text footnote bold>
          Demo
        </Text>
        <View style={styles.item}>
          <CardFileAttachment
            icon={icon.key}
            name={name}
            percent={percent}
            size={size}
            backgroundIcon={colorChoosed.color}
            onPress={onPress}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text footnote bold>
            Color
          </Text>
          <ProductColorPicker colorChoosed={colorChoosed} onPress={(color) => setColorChoosed(color)} />
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Input
              containerStyle={{ marginTop: 0 }}
              label={'Name'}
              placeholder="Please input Name"
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
              label={'Size'}
              placeholder="Please input Size"
              onChangeText={(value) => setSize(value)}
              value={size}
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

        <View style={styles.example}>
          <Text footnote bold>
            Example
          </Text>
          <View style={styles.item}>
            <CardFileAttachment
              icon={'paperclip'}
              name={'UI-Design-Final.sketch'}
              percent={80}
              size={'3.5 MB'}
              backgroundIcon={EFilterColors[4].color}
              onPress={onPress}
            />
          </View>
          <View style={styles.item}>
            <CardFileAttachment
              icon={'file-word'}
              name={'Document.docs'}
              percent={100}
              size={'2.5 MB'}
              backgroundIcon={EFilterColors[3].color}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default CardFileAttachmentReview;
