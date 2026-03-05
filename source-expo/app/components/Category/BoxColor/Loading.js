import { PlaceholderLine, Placeholder } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={[styles.container, style]}>
      <PlaceholderLine width={100} style={[styles.imageBackgroundLoading]} noMargin />
    </Placeholder>
  );
};

export default Loading;
