import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={style}>
      <PlaceholderLine width={100} style={styles.imageBackground} noMargin />
    </Placeholder>
  );
};

export default Loading;
