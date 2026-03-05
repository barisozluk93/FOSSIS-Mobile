import { TouchableOpacity, View } from 'react-native';
import Text from '@/components/Text';
import styles from './styles';

const TitleFintech = ({ style = {}, title = '', textMore = '', onPress = () => {} }) => {
  return (
    <View style={[styles.titleList, style]}>
      <Text title3>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text body2 accentColor>
          {textMore}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TitleFintech;
