import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { MusicDemo } from '@/data/music';
import { BaseStyle, Images, useTheme } from '@/config';
import { Header, Icon, Image, ProgressBar, SafeAreaView, Text } from '@/components';
import styles from './styles';

const MPlay = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('music_player')}
        subTitle={t('music_playing_the_song')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => (
          <Text body1 primaryColor numberOfLines={1}>
            {t('music_stop')}
          </Text>
        )}
        onPressRight={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={BaseStyle.bodyPaddingDefault}>
        <View style={styles.cardImage}>
          <Image source={Images.music04} style={styles.image} borderRadius={100} />
          <Text title3>{'Give Me The Reason'}</Text>
          <Text subhead light grayColor style={styles.description}>
            {'Discorver Weekly'}
          </Text>
          <Text body2 style={styles.description}>
            {MusicDemo}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.playSong}>
        <View style={styles.timeView}>
          <Text caption2 light grayColor>
            {'03:34'}
          </Text>
          <Text caption2>{'04:34'}</Text>
        </View>
        <ProgressBar height={3} percent={80} color={colors.primary} />
        <View style={styles.toolView}>
          <TouchableOpacity>
            <Icon solid name="ellipsis-h" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon solid name="caret-square-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon solid name="play-circle" size={48} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon solid name="caret-square-right" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon solid name="redo-alt" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MPlay;
