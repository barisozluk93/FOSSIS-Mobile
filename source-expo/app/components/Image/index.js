import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function Index({ style = {}, ...props }) {
  return (
    <View style={[styles.container, style]}>
      <Image {...props} style={styles.content} />
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resizeMode: PropTypes.string,
};
