import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { PProjectHome } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { PieChart, Project02, SafeAreaView, TabTag } from '@/components';
import styles from './styles';

const PHome = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const tabs = [
    {
      id: 'all',
      title: t('all_project'),
    },
    {
      id: 'on_going',
      title: t('on_going'),
    },
    {
      id: 'completed',
      title: t('completed'),
    },
    {
      id: 'on_hold',
      title: t('on_hold'),
    },
  ];
  const [tab, setTab] = useState(tabs[0]);
  const data = [
    {
      name: t('pending'),
      population: 70,
      color: colors.primaryLight,
      legendFontColor: '#7F7F7F',
    },
    {
      name: t('todo'),
      population: 20,
      color: BaseColor.kashmir,
      legendFontColor: '#7F7F7F',
    },
    {
      name: t('completed'),
      population: 10,
      color: colors.accent,
      legendFontColor: '#7F7F7F',
    },
  ];

  const projects = useMemo(() => {
    Utils.enableExperimental();
    if (tab.id === 'all') {
      return PProjectHome;
    } else {
      return PProjectHome.filter((project) => project.status === tab.id);
    }
  }, [tab]);

  const goProjectDetail = (item) => () => {
    navigation.navigate('PProjectView', { item: item });
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                    <Text header bold>
                        {t("overview")}
                    </Text>
                    <Text subhead grayColor style={{ marginTop: 5 }}>
                        {t("discover_last_news_today")}
                    </Text>
                </View> */}
        <PieChart data={data} />
        <TabTag
          style={{ paddingHorizontal: 10, paddingBottom: 20 }}
          tabs={tabs}
          tab={tab}
          onChange={(tabData) => setTab(tabData)}
        />
        <FlatList
          contentContainerStyle={styles.paddingFlatList}
          data={projects}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <Project02
              title={item.title}
              description={item.description}
              days={item.days}
              members={item.members}
              progress={item.progress}
              onPress={goProjectDetail(item)}
              style={{
                marginBottom: 20,
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default PHome;
