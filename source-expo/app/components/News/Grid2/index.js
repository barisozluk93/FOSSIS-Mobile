import NewsGrid from '@/components/News/Grid';
import Text from '@/components/Text';
import styles from './styles';

const NewsGrid2 = (props) => {
  let { title, style, ...attrs } = props;
  return (
    <NewsGrid
      style={[styles.style, style]}
      componentTitle={
        <Text footnote regular style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      }
      {...attrs}
    />
  );
};

export default NewsGrid2;
