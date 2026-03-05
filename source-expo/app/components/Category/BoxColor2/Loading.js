import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.containerLoading, style]}>
      <PlaceholderLine style={styles.loading} noMargin />
    </Placeholder>
  );
};

export default Loading;
