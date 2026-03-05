import { Placeholder, PlaceholderLine } from '@/components/Placeholder';
import ProfileAuthor from '@/components/Profile/Author';
import styles from './styles';

const Loading = (props) => {
  const { style } = props;
  return (
    <Placeholder style={style}>
      <PlaceholderLine style={styles.imageBackground} noMargin />
      <ProfileAuthor loading={true} />
      <PlaceholderLine width={100} noMargin />
    </Placeholder>
  );
};

export default Loading;
