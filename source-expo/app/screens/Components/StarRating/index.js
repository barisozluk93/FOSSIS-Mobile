import { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { EFilterColors } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import styles from '@/screens/Components/Common/styles';
import { Header, Icon, PickerSelect, ProductColorPicker, SafeAreaView, StarRating, Text } from '@/components';

const ANIMATION_TYPES = [
  {
    key: undefined,
    name: 'None',
  },
  {
    key: 'bounce',
    name: 'Bounce',
  },
  {
    key: 'flash',
    name: 'Flash',
  },
  {
    key: 'jello',
    name: 'Jello',
  },
  {
    key: 'pulse',
    name: 'Pulse',
  },
  {
    key: 'rotate',
    name: 'Rotate',
  },
  {
    key: 'rubberBand',
    name: 'RubberBand',
  },
  {
    key: 'shake',
    name: 'Shake',
  },
  {
    key: 'swing',
    name: 'Swing',
  },
  {
    key: 'tada',
    name: 'Tada',
  },
  {
    key: 'wobble',
    name: 'Wobble',
  },
];

const ICON = [
  {
    key: 'star',
    name: 'Star',
    emptyStar: 'star-o',
    fullStar: 'star',
    halfStar: 'star-half-o',
  },
  {
    key: 'battery',
    name: 'Battery',
    emptyStar: 'battery-empty',
    fullStar: 'battery',
    halfStar: 'battery-half',
  },
];

const StarRatingReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [animationType, setAnimationType] = useState(ANIMATION_TYPES[0]);
  const [rate, setRate] = useState(2.5);
  const [icon, setIcon] = useState(ICON[0]);
  const [halfStarEnabled, setHalfStarEnabled] = useState(true);
  const [max, setMax] = useState(5);
  const [size, setSize] = useState(35);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);

  const onChangeIcon = (weightSelected) => {
    setIcon(weightSelected);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'StartRating Component'}
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
            <StarRating
              fullStar={icon.fullStar}
              halfStar={icon.halfStar}
              emptyStar={icon.emptyStar}
              starSize={size}
              maxStars={max}
              rating={rate}
              selectedStar={(rating) => {
                setRate(rating);
              }}
              fullStarColor={colorChoosed.color}
              containerStyle={{ padding: 5 }}
              halfStarEnabled={halfStarEnabled}
              animation={animationType.key}
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
              <PickerSelect label="Icon (Example Fontawesome)" value={icon} onChange={onChangeIcon} options={ICON} />
            </View>
            <View style={styles.right}>
              <PickerSelect
                label="Animation type"
                value={animationType}
                onChange={(value) => setAnimationType(value)}
                options={ANIMATION_TYPES}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Size" min={20} max={50} low={size} onValueChanged={(value) => setSize(value)} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Max Rate" min={0} max={5} low={max} onValueChanged={(value) => setMax(value)} />
            </View>
          </View>
          <View style={styles.row}>
            <Text footnote bold>
              HalfStarEnabled
            </Text>
            <Switch onValueChange={() => setHalfStarEnabled((value) => !value)} value={halfStarEnabled} />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            {ICON.map((item) => (
              <StarRating
                key={item.key}
                fullStar={item.fullStar}
                halfStar={item.halfStar}
                emptyStar={item.emptyStar}
                starSize={30}
                maxStars={5}
                rating={4.5}
                selectedStar={() => {}}
                fullStarColor={item.key === 'star' ? BaseColor.pinkLightColor : BaseColor.accentColor}
                containerStyle={{ padding: 5 }}
                halfStarEnabled={true}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StarRatingReview;
