import { View } from 'react-native';
import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[style]}>
      <PlaceholderLine style={[styles.imageBackground, { borderRadius: 0 }]} />
      <View style={{ paddingHorizontal: 16 }}>
        <PlaceholderLine width={100} />
        <PlaceholderLine width={80} />
        <View style={{ flexDirection: 'row' }}>
          <PlaceholderLine width={20} style={{ marginRight: 5 }} />
          <PlaceholderLine width={20} style={{ marginLeft: 5 }} />
        </View>
      </View>
    </Placeholder>
  );
};

export default Loading;
