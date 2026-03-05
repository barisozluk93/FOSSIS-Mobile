import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import { Header, Icon, PickerSelect, SafeAreaView, Text } from '@/components';

const TYPOGRAPHY = [
  {
    key: 'header',
    name: 'Header',
  },
  {
    key: 'title1',
    name: 'Title1',
  },
  {
    key: 'title2',
    name: 'Title2',
  },
  {
    key: 'headline',
    name: 'Headline',
  },
  {
    key: 'body1',
    name: 'Body1',
  },
  {
    key: 'body2',
    name: 'Body2',
  },
  {
    key: 'callout',
    name: 'Callout',
  },
  {
    key: 'subhead',
    name: 'Subhead',
  },
  {
    key: 'footnote',
    name: 'Footnote',
  },
  {
    key: 'caption1',
    name: 'Caption1',
  },
  {
    key: 'caption2',
    name: 'Caption2',
  },
  {
    key: 'overline',
    name: 'Overline',
  },
];

const WEIGHT = [
  {
    key: 'thin',
    name: 'Thin',
  },
  {
    key: 'ultraLight',
    name: 'UltraLight',
  },
  {
    key: 'light',
    name: 'Light',
  },
  {
    key: 'regular',
    name: 'Regular',
  },
  {
    key: 'medium',
    name: 'Medium',
  },
  {
    key: 'semibold',
    name: 'Semibold',
  },
  {
    key: 'bold',
    name: 'Bold',
  },
  {
    key: 'heavy',
    name: 'Heavy',
  },
  {
    key: 'black',
    name: 'Black',
  },
];

const COLOR = [
  {
    key: 'primaryColor',
    name: 'Primary Color',
  },
  {
    key: 'darkPrimaryColor',
    name: 'Dark Primary Color',
  },
  {
    key: 'lightPrimaryColor',
    name: 'Light Primary Color',
  },
  {
    key: 'accentColor',
    name: 'Accent Color',
  },
  {
    key: 'grayColor',
    name: 'GrayColor',
  },
  {
    key: 'dividerColor',
    name: 'Divider Color',
  },
  {
    key: 'whiteColor',
    name: 'White Color',
  },
  {
    key: 'fieldColor',
    name: 'Field Color',
  },
];

const TEXT_ALIGN = [
  {
    key: 'auto',
    name: 'Auto',
  },
  {
    key: 'center',
    name: 'Center',
  },
  {
    key: 'left',
    name: 'Left',
  },
  {
    key: 'right',
    name: 'Right',
  },
  {
    key: 'justify',
    name: 'Justify',
  },
];

const TextReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [typography, setTypography] = useState(TYPOGRAPHY[0]);
  const [weight, setWeight] = useState(WEIGHT[0]);
  const [color, setColor] = useState(COLOR[0]);
  const [textAlign, setTextAlign] = useState(TEXT_ALIGN[1]);
  const [label, setLabel] = useState('Hello Mazi');

  const onChangeTypography = (typographySelected) => {
    setTypography(typographySelected);
  };

  const onChangeWeight = (weightSelected) => {
    setWeight(weightSelected);
  };

  const onChangeColor = (colorSelected) => {
    setColor(colorSelected);
  };

  const onChangeTextAlign = (alignSelected) => {
    setTextAlign(alignSelected);
  };

  const attrs = {
    [typography.key]: true,
    [weight.key]: true,
    [color.key]: true,
    textAlign: textAlign.key,
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Text Component'}
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
          <Text {...attrs}>{label}</Text>
          <Input
            label={'Label'}
            placeholder="Please input Label"
            onChangeText={(value) => setLabel(value)}
            value={label}
          />
          <View style={styles.row}>
            <View style={styles.left}>
              <PickerSelect label="Typography" value={typography} onChange={onChangeTypography} options={TYPOGRAPHY} />
            </View>
            <View style={styles.right}>
              <PickerSelect label="Weight" value={weight} onChange={onChangeWeight} options={WEIGHT} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <PickerSelect label="Color" value={color} onChange={onChangeColor} options={COLOR} />
            </View>
            <View style={styles.right}>
              <PickerSelect label="TextAlign" value={textAlign} onChange={onChangeTextAlign} options={TEXT_ALIGN} />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            {TYPOGRAPHY.map((item) => (
              <Text key={item.key} {...{ [item.key]: true }}>
                {item.name}
              </Text>
            ))}
          </View>
          <View style={styles.item}>
            {WEIGHT.map((item) => (
              <Text key={item.key} {...{ [item.key]: true }}>
                {item.name}
              </Text>
            ))}
          </View>
          <View style={styles.item}>
            {COLOR.map((item) => (
              <Text key={item.key} {...{ [item.key]: true }}>
                {item.name}
              </Text>
            ))}
          </View>
          <View style={styles.item}>
            {TEXT_ALIGN.map((item) => (
              <Text key={item.key} textAlign={item.key}>
                {item.name}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextReview;
