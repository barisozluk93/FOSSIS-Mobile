import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import Input from '@/screens/Components/Common/Input';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import Reference from '@/screens/Components/Common/Reference';
import styles from '@/screens/Components/Common/styles';
import { Header, Icon, Image, PickerSelect, SafeAreaView, Text } from '@/components';

const NAME = [
  {
    key: 'https://passionui.com/wp-content/uploads/2020/06/Codecanyon-Banner-v1.0.4-1x.png',
    name: 'Thumbnail Mazi',
  },
  {
    key: 'https://passionui.com/wp-content/uploads/2020/06/mazi-simulator-ios-demo.png',
    name: 'Build Mazi',
  },
  {
    key: 'https://passionui.com/wp-content/uploads/2020/06/mazi-color-palette.png',
    name: 'Color Mazi',
  },
];

const RESIZE_MODE = [
  {
    key: 'cover',
    name: 'Cover',
  },
  {
    key: 'contain',
    name: 'Contain',
  },
  {
    key: 'stretch',
    name: 'Stretch',
  },
  {
    key: 'center',
    name: 'Center',
  },
];

const UNIT = [
  {
    key: '%',
    name: 'percent',
  },
  {
    key: '',
    name: 'pixel',
  },
];

const ImageReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [resizeMode, setResizeMode] = useState(RESIZE_MODE[0]);
  const [name, setName] = useState(NAME[0].key);
  const [nameQuick, setNameQuick] = useState(NAME[0]);
  const [width, setWidth] = useState(100);
  const [unitWidth, setUnitWidth] = useState(UNIT[0]);
  const [height, setHeight] = useState(100);
  const [unitHeight, setUnitHeight] = useState(UNIT[1]);
  const [radius, setRadius] = useState(10);

  const onChangeName = (nameSelected) => {
    setName(nameSelected.key);
    setNameQuick(nameSelected);
  };

  const onChangeWidth = (value) => {
    setWidth(value);
  };

  const onChangeHeight = (value) => {
    setHeight(value);
  };

  const onChangeRadius = (value) => {
    setRadius(value);
  };

  const getWidth = () => {
    if (width) {
      if (unitWidth.key === '%') {
        return `${width}${unitWidth.key}`;
      } else {
        try {
          return parseInt(width, 10);
        } catch (error) {
          return 0;
        }
      }
    }
  };

  const getHeight = () => {
    if (height) {
      if (unitHeight.key === '%') {
        return `${height}${unitHeight.key}`;
      } else {
        try {
          return parseInt(height, 10);
        } catch (error) {
          return 0;
        }
      }
    }
  };

  const getRadius = () => {
    if (radius) {
      try {
        return parseInt(radius, 10);
      } catch (error) {
        return 0;
      }
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Image Component'}
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
          <View style={[styles.item, { alignContent: 'center', alignItems: 'center', height: 105 }]}>
            <Image
              resizeMode={resizeMode.key}
              source={{
                uri: name,
              }}
              style={{
                width: getWidth(),
                height: getHeight(),
              }}
              borderRadius={getRadius()}
              borderWidth={1}
              borderColor={colors.border}
            />
          </View>
          <View>
            <Input
              autoCapitalize="none"
              label="URL"
              placeholder="Please input name"
              containerStyle={{ marginTop: 0 }}
              onChangeText={(value) => setName(value)}
              value={name}
              multiline
              style={{ height: 50 }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <PickerSelect label="Quick URL" value={nameQuick} onChange={onChangeName} options={NAME} />
            </View>
            <View style={styles.right}>
              <PickerSelect
                label="Resize mode"
                value={resizeMode}
                onChange={(value) => setResizeMode(value)}
                options={RESIZE_MODE}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Width" low={width} onValueChanged={onChangeWidth} />
            </View>
            <View style={styles.right}>
              <PickerSelect
                label="Unit width"
                value={unitWidth}
                onChange={(value) => setUnitWidth(value)}
                options={UNIT}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Height" low={height} onValueChanged={onChangeHeight} />
            </View>
            <View style={styles.right}>
              <PickerSelect
                label="Unit height"
                value={unitHeight}
                onChange={(value) => setUnitHeight(value)}
                options={UNIT}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Border radius" max={50} low={radius} onValueChanged={onChangeRadius} />
            </View>
          </View>

          <Reference url="https://github.com/DylanVann/react-native-fast-image" />
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            <Image
              resizeMode={'cover'}
              source={{
                uri: NAME[0].key,
              }}
              style={{
                width: '100%',
                height: 100,
                marginVertical: 5,
              }}
              borderRadius={10}
              borderWidth={1}
              borderColor={colors.border}
            />
            <Image
              resizeMode={'cover'}
              source={{
                uri: NAME[0].key,
              }}
              style={{
                width: 100,
                height: 100,

                marginVertical: 5,
              }}
              borderRadius={50}
              borderWidth={1}
              borderColor={colors.border}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageReview;
