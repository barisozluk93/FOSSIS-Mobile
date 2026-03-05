import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder>
      <PlaceholderLine width={100} style={[styles.contain, style]} />
    </Placeholder>
  );
};

export default Loading;
