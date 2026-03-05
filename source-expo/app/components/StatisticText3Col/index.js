import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Text from '@/components/Text';
import styles from './styles';

const StatisticText3Col = ({
  style = {},
  topLeft = '',
  centerLeft = '',
  bottomLeft = '',
  topCenter = '',
  centerCenter = '',
  bottomCenter = '',
  topRight = '',
  centerRight = '',
  bottomRight = '',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text subhead light>
          {topLeft}
        </Text>
        <Text headline style={styles.textMarginCenter}>
          {centerLeft}
        </Text>
        <Text footnote lightPrimaryColor>
          {bottomLeft}
        </Text>
      </View>

      <View>
        <Text subhead light style={styles.textCenter}>
          {topCenter}
        </Text>
        <Text headline style={[styles.textCenter, styles.textMarginCenter]}>
          {centerCenter}
        </Text>
        <Text footnote lightPrimaryColor style={styles.textCenter}>
          {bottomCenter}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text subhead light style={styles.text}>
          {topRight}
        </Text>
        <Text headline style={[styles.text, styles.textMarginCenter]}>
          {centerRight}
        </Text>
        <Text footnote lightPrimaryColor style={styles.text}>
          {bottomRight}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

StatisticText3Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  topLeft: PropTypes.string,
  centerLeft: PropTypes.string,
  bottomLeft: PropTypes.string,
  topCenter: PropTypes.string,
  centerCenter: PropTypes.string,
  bottomCenter: PropTypes.string,
  topRight: PropTypes.string,
  centerRight: PropTypes.string,
  bottomRight: PropTypes.string,
  onPress: PropTypes.func,
};

export default StatisticText3Col;
