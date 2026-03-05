import { Placeholder, PlaceholderLine } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.loading, style]}>
      <PlaceholderLine style={styles.imageWishlist} />
      <PlaceholderLine width={100} />
      {/* <PlaceholderLine width={50} /> */}
    </Placeholder>
  );
};

export default Loading;
