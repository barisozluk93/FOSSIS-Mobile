import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseStyle, Images, useTheme } from '@/config';
import { LikedSongs } from '@/data/music';
import { Header, Icon, Image, MusicPlaySong, ProductCard6, ProfileAuthor, SafeAreaView, Text } from '@/components';
import styles from './styles';

const MProfile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const goToPage = (pageName) => () => navigation.navigate(pageName);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('music_liked_songs')}
        subTitle={'126 songs'}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={BaseStyle.bodyPaddingDefault}>
        <View style={styles.cardImage}>
          <Image source={Images.music21} style={styles.image} borderRadius={10} />
          <View style={styles.cardTitle}>
            <Text headline whiteColor>
              {'Discorver Weekly'}
            </Text>
            <Text caption2 whiteColor>
              {'Your weekly mix'}
            </Text>
          </View>
        </View>
        <Text footnote light grayColor style={styles.description}>
          {
            'Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Nulla quis lorem ut ….'
          }
        </Text>
        <ProfileAuthor
          style={{}}
          image={Images.profile2}
          name="Steve Garrett"
          description="1.234.323 likes | 7h 35m"
          textRight={<Icon solid name="heart" size={18} color={colors.primaryLight} />}
          onPress={() => {}}
        />
        {LikedSongs.map((item, index) => (
          <ProductCard6
            key={index.toString()}
            isPlaying={index === 0}
            image={item.image}
            title={item.name}
            dateTime={item.singer}
            onPress={goToPage('MPlay')}
            onMore={() => {}}
          />
        ))}
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

export default MProfile;
