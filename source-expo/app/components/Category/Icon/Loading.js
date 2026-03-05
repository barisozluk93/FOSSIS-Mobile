import { View } from 'react-native';
import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <View style={[styles.contain, style]}>
        <PlaceholderLine style={styles.iconContent} noMargin />
        <View style={{ flex: 1, padding: 10 }}>
          <PlaceholderLine width={80} />
          <PlaceholderLine width={40} noMargin />
        </View>
      </View>
    </Placeholder>
  );
};

export default Loading;
