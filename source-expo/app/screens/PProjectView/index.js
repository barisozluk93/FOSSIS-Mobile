import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Avatars,
  CardReport02,
  CardReport03,
  CardReport04,
  Header,
  Icon,
  PButtonAddUser,
  ProductSpecGrid,
  SafeAreaView,
  Tag,
  Text,
} from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { PProject } from '@/data';
import styles from './styles';

const TAGS = [
  { id: '1', icon: 'wifi', name: 'HTML', checked: true },
  { id: '2', icon: 'bath', name: 'Bootstrap' },
  { id: '3', icon: 'paw', name: 'CSS3' },
  { id: '4', icon: 'bus', name: 'Jquery' },
];

const PProjectView = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [members, setMembers] = useState(PProject[0].members);
  const [item, setItem] = useState(PProject[0]);

  useEffect(() => {
    if (route?.params?.members) {
      setMembers(route?.params?.members);
    }
  }, [route?.params?.members]);

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route?.params?.item);
    }
  }, [route?.params?.item]);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        title={t('project_view')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('edit')}
            </Text>
          );
        }}
        onPressRight={() => {
          navigation.navigate('PProjectCreate', { item: item });
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text title3>{item.title}</Text>
          <Text body2 light style={{ paddingVertical: 10 }}>
            {
              'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.'
            }
          </Text>
          <View style={styles.specifications}>
            <ProductSpecGrid style={{ flex: 1 }} title={'17 March 2019'} description={t('start_date')} />
            <ProductSpecGrid style={{ flex: 1 }} title={'17 March 2019'} description={t('end_date')} />
          </View>
          <View style={styles.specifications}>
            <ProductSpecGrid style={{ flex: 1 }} title={'$30,000'} description={t('budget')} />
            <ProductSpecGrid
              style={{ flex: 1 }}
              title={
                <Tag
                  light
                  style={{
                    backgroundColor: BaseColor.grayColor,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                  }}
                  textStyle={{ color: BaseColor.whiteColor }}
                >
                  On Going
                </Tag>
              }
              description={t('status')}
            />
          </View>
          <Text
            headline
            style={{
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            {t('tags')}
          </Text>
          <View style={styles.wrapContent}>
            {TAGS.map((itemData) => {
              return (
                <Tag
                  chip
                  key={itemData.id}
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    paddingHorizontal: 10,
                    borderColor: colors.card,
                  }}
                >
                  {itemData.name}
                </Tag>
              );
            })}
          </View>
          <View style={[styles.specifications, { justifyContent: 'space-between' }]}>
            <Text headline>{t('team_members')}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PSelectAssignee', {
                  members: members,
                })
              }
            >
              <Text body2 accentColor>
                {t('view_all')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.specifications}>
            <Avatars users={members} limit={3} isShowMore={false} />
            <PButtonAddUser
              onPress={() =>
                navigation.navigate('PSelectAssignee', {
                  members: members,
                })
              }
            />
          </View>
          <Text caption1 grayColor>{`and ${members.length <= 3 ? 0 : members.length - 3} other members`}</Text>
        </View>

        <Text
          headline
          style={{
            paddingTop: 20,
            paddingBottom: 5,
          }}
        >
          {t('project_overview')}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <CardReport02
              style={{ marginBottom: 7 }}
              icon="chart-bar"
              title="Total Task"
              price="1021"
              onPress={() => navigation.navigate('Dashboard5')}
            />
            <CardReport03
              style={{ marginTop: 7 }}
              icon="chart-line"
              title="Completed"
              price="5001"
              subTitle="Bitcoin"
              percent="50,01%"
              onPress={() => navigation.navigate('FCryptol02')}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 7 }}>
            <CardReport04
              contentStyle={{ paddingBottom: 27 }}
              icon="credit-card"
              title="Total Hours Spent"
              price="412"
              subTitle1="Over Time Work"
              percent1="100%"
              subTitle2="Normal Work"
              percent2="80%"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              onPress={() => navigation.navigate('Dashboard4')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PProjectView;
