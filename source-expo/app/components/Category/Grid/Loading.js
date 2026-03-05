import { Placeholder, PlaceholderLine } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.container, style]}>
      <PlaceholderLine style={styles.imageBackground} />
      <PlaceholderLine width={100} noMargin />
    </Placeholder>
  );
};

export default Loading;
