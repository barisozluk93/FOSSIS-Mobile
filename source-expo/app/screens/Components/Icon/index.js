import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EFilterColors } from '@/data';
import { BaseStyle, useTheme } from '@/config';
import Input from '@/screens/Components/Common/Input';
import Reference from '@/screens/Components/Common/Reference';
import styles from '@/screens/Components/Common/styles';
import { Header, Icon, PickerSelect, SafeAreaView, GridList, Text, ProductColorPicker } from '@/components';

const ICON = [
  { key: '', name: 'None' },
  {
    key: 'home',
    name: 'Home',
  },
  {
    key: 'camera',
    name: 'Camera',
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

const ICON_DEMO = ICON.slice(1);

const IconReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [icon, setIcon] = useState(ICON[0]);
  const [name, setName] = useState('home');
  const [size, setSize] = useState('30');
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);

  const onChangeIcon = (iconSelected) => {
    setName(iconSelected.key);
    setIcon(iconSelected);
  };

  const onChangeSize = (value) => {
    if (value) {
      setSize(value);
    } else {
      setSize(14);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Icon FontAwesome5'}
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
            <Icon name={name || 'home'} size={size ? parseInt(size, 10) : 14} color={colorChoosed.color} />
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Input
                autoCapitalize="none"
                label="Name"
                placeholder="Please input name"
                containerStyle={{ marginTop: 0 }}
                onChangeText={(value) => setName(value)}
                value={name}
              />
            </View>
            <View style={styles.right}>
              <PickerSelect label="Quick name" value={icon} onChange={onChangeIcon} options={ICON} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Input
                maxLength={2}
                keyboardType="numeric"
                label="Size (Demo from 1 to 99)"
                placeholder="Please input size"
                containerStyle={{ marginTop: 0 }}
                onChangeText={onChangeSize}
                value={size}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text footnote bold>
              Color
            </Text>
            <ProductColorPicker colorChoosed={colorChoosed} onPress={(color) => setColorChoosed(color)} />
          </View>

          <Reference url="https://github.com/oblador/react-native-vector-icons" />
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            <GridList
              columns={5}
              data={ICON_DEMO}
              renderItem={({ item }) => (
                <Icon key={item.key} name={item.key} size={16} style={{ marginVertical: 10 }} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IconReview;
