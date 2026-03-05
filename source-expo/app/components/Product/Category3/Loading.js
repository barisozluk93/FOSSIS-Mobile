import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.container, style]}>
      <PlaceholderLine style={[styles.imageBackground]} noMargin />
    </Placeholder>
  );
};

export default Loading;
