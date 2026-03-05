import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from '@/components/Text';

const SpecGrid = ({ style = {}, description = '', title = '', renderTitle }) => {
  return (
    <View style={style}>
      <Text caption1 grayColor>
        {description}
      </Text>
      {renderTitle ? (
        renderTitle()
      ) : (
        <Text body1 style={{ marginTop: 4 }}>
          {title}
        </Text>
      )}
    </View>
  );
};

SpecGrid.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  description: PropTypes.string,
  title: PropTypes.any,
  renderTitle: PropTypes.func,
};

export default SpecGrid;
