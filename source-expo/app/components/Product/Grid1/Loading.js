import { View } from 'react-native';
import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[style]}>
      <PlaceholderLine style={[styles.imageBackgroundGrid1, styles.imageLoading]} />
      <PlaceholderLine width={100} />
      <PlaceholderLine width={80} />
      <View style={{ flexDirection: 'row' }}>
        <PlaceholderLine width={20} style={{ marginRight: 5 }} />
        <PlaceholderLine width={20} style={{ marginLeft: 5 }} />
      </View>
    </Placeholder>
  );
};

export default Loading;
