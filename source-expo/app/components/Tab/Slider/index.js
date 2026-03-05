import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { BaseColor, useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

const initialLayout = { width: Dimensions.get('window').width };

const TabSlider = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const renderTabBar = (propsTab) => (
    <TabBar
      {...propsTab}
      renderIndicator={() => null}
      scrollEnabled
      style={[styles.tabbar, { backgroundColor: colors.background }, props?.tabBarProps?.style]}
      tabStyle={styles.tab}
      activeColor={BaseColor.whiteColor}
      inactiveColor={colors.text}
      renderLabel={({ route, focused }) => {
        return (
          <View
            style={[
              styles.viewLabel,
              {
                borderBottomColor: focused ? colors.primary : 'transparent',
              },
            ]}
          >
            <Text style={{ width: '100%' }} subhead bold={focused} grayColor={!focused}>
              {t(route.title)}
            </Text>
          </View>
        );
      }}
    />
  );

  return <TabView scrollEnabled={true} initialLayout={initialLayout} renderTabBar={renderTabBar} {...props} />;
};

export default TabSlider;
