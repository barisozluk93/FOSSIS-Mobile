import { View } from 'react-native';
import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style, styleLeft, styleThumb, styleRight } = props;
  return (
    <Placeholder style={style}>
      <View style={[styles.contain, style]}>
        <View style={[styles.contentLeft, styleLeft]}>
          <PlaceholderLine style={[styles.thumb, styleThumb]} noMargin />
          <View style={{ width: '100%' }}>
            <PlaceholderLine width={80} />
            <PlaceholderLine width={50} noMargin />
          </View>
        </View>
        <View style={[styles.contentRight, styleRight]}>{/* <PlaceholderLine width={80}/> */}</View>
      </View>
    </Placeholder>
  );
};

export default Loading;
