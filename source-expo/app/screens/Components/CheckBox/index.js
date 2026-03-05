import { useState } from 'react';
import { ScrollView, View, Switch } from 'react-native';
import { EFilterColors } from '@/data';
import { BaseStyle, useTheme } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import { Header, Icon, PickerSelect, SafeAreaView, Text, CheckBox, ProductColorPicker } from '@/components';

const ICON = [
  {
    key: 'check-square',
    name: 'Square',
    checkedIcon: 'check-square',
    uncheckedIcon: 'square',
  },
  {
    key: 'check-circle',
    name: 'Circle',
    checkedIcon: 'check-circle',
    uncheckedIcon: 'check-circle',
  },
  {
    key: 'smile',
    name: 'Face',
    checkedIcon: 'smile',
    uncheckedIcon: 'frown',
  },
];

const CheckBoxReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [icon, setIcon] = useState(ICON[0]);
  const [checked, setChecked] = useState(false);
  const [label, setLabel] = useState('CheckBox');
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);

  const onChangeIcon = (weightSelected) => {
    setIcon(weightSelected);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'CheckBox Component'}
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
          <View style={[styles.item, { alignItems: 'center' }]}>
            <CheckBox
              checkedIcon={icon.checkedIcon}
              uncheckedIcon={icon.uncheckedIcon}
              checked={checked}
              title={label}
              color={colorChoosed.color}
            />
          </View>
          <Input
            label={'Label'}
            placeholder="Please input Label"
            onChangeText={(value) => setLabel(value)}
            value={label}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <PickerSelect label="Icon (Example Fontawesome)" value={icon} onChange={onChangeIcon} options={ICON} />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text footnote bold>
              Color
            </Text>
            <ProductColorPicker colorChoosed={colorChoosed} onPress={(color) => setColorChoosed(color)} />
          </View>
          <View style={styles.row}>
            <Text footnote bold>
              Checked
            </Text>
            <Switch onValueChange={() => setChecked((value) => !value)} value={checked} />
          </View>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            <View style={styles.row}>
              <View style={styles.left}>
                {ICON.map((item) => (
                  <View key={item.checkedIcon} style={{ paddingVertical: 5 }}>
                    <CheckBox
                      checkedIcon={item.checkedIcon}
                      uncheckedIcon={item.uncheckedIcon}
                      checked={true}
                      title={item.name}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.right}>
                {ICON.map((item) => (
                  <View key={item.checkedIcon} style={{ paddingVertical: 5 }}>
                    <CheckBox
                      checkedIcon={item.checkedIcon}
                      uncheckedIcon={item.uncheckedIcon}
                      checked={false}
                      title={item.name}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckBoxReview;
