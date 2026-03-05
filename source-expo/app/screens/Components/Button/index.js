import { useState } from 'react';
import { ScrollView, View, Switch } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import styles from '@/screens/Components/Common/styles';
import Input from '@/screens/Components/Common/Input';
import { Header, Icon, PickerSelect, SafeAreaView, Text, Button } from '@/components';

const TYPE = [
  {
    key: 'round',
    name: 'Round',
  },
  {
    key: 'outline',
    name: 'Outline',
  },
  {
    key: 'full',
    name: 'Full',
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

const ButtonReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [type, setType] = useState(TYPE[0]);
  const [icon, setIcon] = useState(ICON[0]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Button');

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
        title={'Button Component'}
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
          <View style={styles.item}>
            <Button
              {...attrs}
              loading={loading}
              disabled={disabled}
              icon={icon.key && <Icon style={{ marginHorizontal: 5 }} name={icon.key} color="white" size={16} />}
            >
              {label}
            </Button>
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
          <View style={styles.row}>
            <Text footnote bold>
              Disabled
            </Text>
            <Switch onValueChange={() => setDisabled((value) => !value)} value={disabled} />
          </View>
          <View style={styles.row}>
            <Text footnote bold>
              Loading
            </Text>
            <Switch onValueChange={() => setLoading((value) => !value)} value={loading} />
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
              <Button key={item.key} {...{ [item.key]: true }} style={{ marginVertical: 10 }}>
                {item.name}
              </Button>
            ))}
            <Button loading style={{ marginVertical: 4 }}>
              Loading
            </Button>
            <Button
              style={{ marginVertical: 4 }}
              round
              icon={<Icon style={{ marginHorizontal: 5 }} name="home" color="white" size={16} />}
            >
              Icon
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ButtonReview;
