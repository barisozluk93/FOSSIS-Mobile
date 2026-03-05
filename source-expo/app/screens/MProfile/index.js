import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { BestSongsInProfile, NotificationEarlier, NotificationRecent } from '@/data/music';
import { BaseStyle, Images, useTheme } from '@/config';
import {
  Header,
  Icon,
  MusicPlaySong,
  SafeAreaView,
  Text,
  ProductCard5,
  Button,
  ThumbSquareSmall,
  GridList,
} from '@/components';
import * as Utils from '@/utils';
import Overview from './Overview';
import styles from './styles';

const TABS = [
  {
    id: 'completed',
    keyLanguage: 'completed',
  },
  {
    id: 'activity',
    keyLanguage: 'music_activity',
  },
];

const MLikedSongs = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const url = 'https://www.facebook.com/passionui';
  const [tab, setTab] = useState('completed');

  const goToPage = (pageName) => () => navigation.navigate(pageName);

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  const onChangeTab = (id) => {
    setTab(id);
    Utils.enableExperimental();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={t('profile')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={BaseStyle.bodyPaddingDefault}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Overview image={Images.profile1} name="Steve Garrett" nickName="#steve.garrett" onMore={() => {}} />
        <Text body2>
          Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget
          tortor risus.
        </Text>
        <View style={styles.groupIcon}>
          <TouchableOpacity style={styles.icon} onPress={handlePress}>
            <Icon name="twitter" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={handlePress}>
            <Icon name="facebook" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.groupButton}>
          {TABS.map((item) => (
            <Button
              onPress={() => onChangeTab(item.id)}
              key={item.id}
              style={item.id === tab ? { height: 35, flex: 1 } : { height: 35, flex: 1, backgroundColor: colors.card }}
              styleText={item.id === tab ? { fontWeight: 'normal' } : { fontWeight: 'normal', color: '#D8D8D8' }}
            >
              {t(item.keyLanguage)}
            </Button>
          ))}
          {/* <Button
            style={{height: 35, flex: 1}}
            styleText={{fontWeight: 'normal'}}>
            {t('completed')}
          </Button>
          <Button
            style={{height: 35, flex: 1, backgroundColor: colors.card}}
            styleText={{fontWeight: 'normal', color: '#D8D8D8'}}>
            {t('music_activity')}
          </Button> */}
        </View>

        {tab === TABS[0].id && (
          <>
            <Text title3>{t('music_best_songs')}</Text>
            {BestSongsInProfile.map((item, index) => (
              <ProductCard5
                key={index.toString()}
                image={item.image}
                title={item.name}
                dateTime={item.createdAt}
                hours={item.time}
                playTime={item.playTime}
                price={item.price}
                onPress={goToPage('MPlay')}
              />
            ))}
          </>
        )}
        {tab === TABS[1].id && (
          <>
            <Text title3>{t('music_recents')}</Text>
            <GridList
              columns={1}
              data={NotificationRecent}
              renderItem={({ item }) => (
                <ThumbSquareSmall
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  image={item.image}
                  txtLeftTitle={item.name}
                  txtContent={item.description}
                  txtRight={item.time}
                  onPress={() => {}}
                />
              )}
            />
            <Text title3 style={{ paddingTop: 20 }}>
              {t('music_earlier')}
            </Text>
            <GridList
              columns={1}
              data={NotificationEarlier}
              renderItem={({ item }) => (
                <ThumbSquareSmall
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  image={item.image}
                  txtLeftTitle={item.name}
                  txtContent={item.description}
                  txtRight={item.time}
                  onPress={() => {}}
                />
              )}
            />
          </>
        )}
      </ScrollView>
      <View style={styles.playSong}>
        <MusicPlaySong
          image={Images.music12}
          name="In The Star Light - Kyle Coline"
          description="Vivamus magna justo, lacinia eget consectetur …"
          percent={80}
        />
      </View>
    </SafeAreaView>
  );
};

export default MLikedSongs;
