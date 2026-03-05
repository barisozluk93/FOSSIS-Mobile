import { useEffect } from 'react';
import { StatusBar, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Text from '@/components/Text';
import styles from './styles';

export default function Header(props) {
  const forceDark = useSelector((state) => state.application.force_dark);
  const {
    style = {},
    styleLeft = {},
    styleContentLeft = {},
    styleContentCenter = {},
    styleRight = {},
    styleRightSecond = {},
    styleContentRight = {},
    renderLeft = () => {},
    renderRight = () => {},
    renderRightSecond = () => {},
    onPressLeft = () => {},
    onPressRight = () => {},
    onPressRightSecond = () => {},
    title = 'Title',
    subTitle = '',
    barStyle = '',
  } = props;
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    let option = isDarkMode ? 'light-content' : 'dark-content';
    if (forceDark) {
      option = 'light-content';
    }
    if (forceDark === false) {
      option = 'dark-content';
    }
    if (barStyle) {
      option = barStyle;
    }
    StatusBar.setBarStyle(option, true);
  }, [forceDark, isDarkMode]);

  return (
    <View style={[styles.contain, style]}>
      <View style={[{ flex: 1 }, styleLeft]}>
        <TouchableOpacity style={[styles.contentLeft, styleContentLeft]} onPress={onPressLeft}>
          {renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleContentCenter]}>
        <Text headline numberOfLines={1}>
          {title}
        </Text>

        {subTitle !== '' && (
          <Text caption2 light>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={[styles.right, styleRight]}>
        <TouchableOpacity style={[styles.contentRightSecond, styleRightSecond]} onPress={onPressRightSecond}>
          {renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.contentRight, styleContentRight]} onPress={onPressRight}>
          {renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContentRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};
