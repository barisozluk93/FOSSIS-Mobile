import { View } from 'react-native';
import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <View style={[styles.contain, style]}>
        <PlaceholderLine style={styles.imageWishlist} noMargin />
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={50} noMargin />
        </View>
      </View>
    </Placeholder>
  );
};

export default Loading;
