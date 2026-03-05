import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[style]}>
      <PlaceholderLine style={[styles.container]} noMargin />
    </Placeholder>
  );
};

export default Loading;
