import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import Input from '@/screens/Components/Common/Input';
import styles from '@/screens/Components/Common/styles';
import { Header, Icon, PickerSelect, SafeAreaView, Tag, Text } from '@/components';

const TYPE = [
  {
    key: 'primary',
    name: 'Primary',
  },
  {
    key: 'outline',
    name: 'Outline',
  },
  {
    key: 'outlineIcon',
    name: 'Outline Icon',
  },
  {
    key: 'outlineSecondary',
    name: 'Outline Secondary',
  },
  {
    key: 'small',
    name: 'Small',
  },
  {
    key: 'light',
    name: 'Light',
  },
  {
    key: 'gray',
    name: 'Gray',
  },
  {
    key: 'chip',
    name: 'Chip',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'rate',
    name: 'Rate',
  },
  {
    key: 'rateSmall',
    name: 'Rate Small',
  },
  {
    key: 'sale',
    name: 'Sale',
  },
  {
    key: 'iconRight',
    name: 'Icon Right',
  },
  {
    key: 'primaryIcon',
    name: 'Primary Icon',
  },
];

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

const TagReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [type, setType] = useState(TYPE[0]);
  const [icon, setIcon] = useState(ICON[0]);
  const [label, setLabel] = useState('Tag');

  const onChangeType = (typographySelected) => {
    setType(typographySelected);
  };

  const onChangeIcon = (weightSelected) => {
    setIcon(weightSelected);
  };
  const attrs = {
    [type.key]: true,
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Tag Component'}
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
          <View
            style={[
              styles.item,
              // {backgroundColor: colors.card, padding: 10, borderRadius: 10},
            ]}
          >
            <Tag
              {...attrs}
              icon={icon.key && <Icon style={{ marginHorizontal: 5 }} name={icon.key} color="white" size={12} />}
            >
              {label}
            </Tag>
          </View>
          <Input
            label={'Label'}
            placeholder="Please input Label"
            onChangeText={(value) => setLabel(value)}
            value={label}
          />
          <View style={styles.row}>
            <View style={styles.left}>
              <PickerSelect label="Type" value={type} onChange={onChangeType} options={TYPE} />
            </View>
            <View style={styles.right}>
              <PickerSelect label="Icon (Example Fontawesome)" value={icon} onChange={onChangeIcon} options={ICON} />
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
            {TYPE.map((item) => (
              <Tag key={item.key} {...{ [item.key]: true }} style={{ marginVertical: 10 }}>
                {item.name}
              </Tag>
            ))}
            <Tag primary icon={<Icon style={{ marginHorizontal: 5 }} name={'home'} color="white" size={12} />}>
              Icon
            </Tag>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TagReview;
