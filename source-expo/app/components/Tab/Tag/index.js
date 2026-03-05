import { View } from 'react-native';
import { useTheme, BaseColor } from '@/config';
import Tag from '@/components/Tag';
import styles from './styles';

const TabTag = ({ tabs = [], tab = {}, onChange = () => {}, style = {} }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.tabBar, style]}>
      {tabs.map((item, index) => (
        <Tag
          key={index}
          primary
          style={{
            marginHorizontal: 5,
            flex: 1,
            backgroundColor: tab.id === item.id ? colors.primary : 'transparent',
          }}
          textStyle={{
            color: tab.id === item.id ? BaseColor.whiteColor : colors.border,
          }}
          onPress={() => onChange(item)}
        >
          {item.title}
        </Tag>
      ))}
    </View>
  );
};

export default TabTag;
