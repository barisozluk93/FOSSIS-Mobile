import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View, Platform } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import { Button, Icon, ProgressBar, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

const MUpload = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const goToPage = (pageName) => () => navigation.navigate(pageName);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={40}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.flex1}>
              <Text title3 bold>
                {t('music_upload')}
              </Text>
            </View>
            <TouchableOpacity
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="times" solid color={BaseColor.grayColor} size={18} style={styles.cog} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.containerScrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.cardBorder, { borderColor: colors.primary }]}>
              <View style={[BaseStyle.row, { marginBottom: 30 }]}>
                <View style={{ flex: 1 }}>
                  <Text headline style={{ marginBottom: 10 }}>
                    {t('music_new_album_song')}
                  </Text>
                  <Text footnote>{t('music_upload_description')}</Text>
                </View>
                <Icon name="assistive-listening-systems" size={48} color={colors.text} />
              </View>
              <TouchableOpacity
                style={[
                  BaseStyle.row,
                  styles.uploadBtn,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <Icon name="cloud-upload-alt" size={24} color={BaseColor.whiteColor} />
                <Text footnote whiteColor style={{ paddingHorizontal: 10 }}>
                  {t('music_upload')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.progress, { backgroundColor: parseHexTransparency(colors.primary, 75) }]}>
              <Text footnote whiteColor>
                Audio_Music_File_10202.mp3
              </Text>
              <ProgressBar
                style={{ paddingVertical: 5 }}
                height={3}
                percent={90}
                backgroundColor={BaseColor.dividerColor}
                color={BaseColor.whiteColor}
              />
              <View style={[BaseStyle.row, { justifyContent: 'space-between', marginTop: 5 }]}>
                <Text footnote whiteColor>
                  1.4MB / 7.9MB
                </Text>
                <Text footnote whiteColor>
                  90%
                </Text>
              </View>
            </View>
            <Text subhead bold style={{ marginBottom: 5 }}>
              {t('music_title')}
            </Text>
            <TextInput placeholder={t('music_title_description')} />
            <Text subhead bold style={{ marginBottom: 5, marginTop: 10 }}>
              {t('music_comments')}
            </Text>
            <TextInput placeholder={t('music_comments_description')} multiline style={{ height: 100 }} />
            <Text subhead bold style={{ marginBottom: 5, marginTop: 10 }}>
              {t('music_privacy_settings')}
            </Text>
            <TextInput placeholder={'Public'} />
          </ScrollView>
        </View>
        <View style={{ padding: 20 }}>
          <Button onPress={goToPage('MProfile')}>{t('music_submit')}</Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MUpload;
