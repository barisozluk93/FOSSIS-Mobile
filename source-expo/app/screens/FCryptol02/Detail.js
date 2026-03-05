import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Share, Alert } from 'react-native';
import { BaseColor, Images, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import { Button, CardCommentSignal, LineChart, Text } from '@/components';
import LabelUpper2Row from '@/components/Label/Upper2Row';

const data = {
  labels: ['12H', '1D', '3D', '1W', '1M', '3M', '6M', '1Y'],
  datasets: [
    {
      data: [200, 500, 1000, 500, 1000, 250, 2000, 100],
      color: (_opacity = 1) => BaseColor.pinkLightColor,
      strokeWidth: 2, // optional
    },
  ],
};

const Detail = ({ onUnWatch = () => {} }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://codecanyon.net/user/passionui/portfolio',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text title1>{'$98.45'}</Text>
            <Text body2 primaryColor>
              {'-4.25%'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text body2 light>
              {'LOW'}
            </Text>
            <Text body2 style={{ marginLeft: 5 }}>
              {'$39.45'}
            </Text>
            <Text body2 light style={{ marginLeft: 20 }}>
              {'HIGHT'}
            </Text>
            <Text body2 style={{ marginLeft: 5 }}>
              {'$40.45'}
            </Text>
          </View>
          <LineChart
            data={data}
            chartConfig={{
              color: (opacity = 1) => parseHexTransparency(colors.primary, opacity * 100),
            }}
          />
          <Button onPress={() => navigation.navigate('FCrypto060708', { id: 1 })}>{t('buy')}</Button>
          <Text title3 style={{ marginTop: 20 }}>
            {t('overview')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <LabelUpper2Row style={{ flex: 1 }} label={t('volume')} value="$997.39" />
            <LabelUpper2Row style={{ flex: 1 }} label={t('market_cap')} value="$10.89B" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <LabelUpper2Row style={{ flex: 1 }} label={t('rank')} value="15" />
            <LabelUpper2Row style={{ flex: 1 }} label={t('circulating_supply')} value="289.89MM SOL" />
          </View>
          <Text title3 style={{ marginTop: 10, marginBottom: 20 }}>
            {t('signals')}
          </Text>
          <CardCommentSignal
            image={Images.coinBitcon}
            imageThumbnail={Images.categoryNews}
            title="Bitcon News"
            subTitle="Json Thomas, Breaking News"
            tagName="Teachnical"
            comment="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt."
            commentUrl="https://fintechmagazine.com/venture-capital/us-israeli-fintech-sunbit-raises-dollar130m-hits-unicorn-status"
            titleThumbnail="US-Israeli fintech Sunbit raises $130m, hits unicorn status"
            subTitleThumbnail="https://fintechmagaz"
            titleShare="Share"
            onDetail={() => navigation.navigate('NPostDetail')}
            onShare={onShare}
          />
          <CardCommentSignal
            image={Images.coinBitcon}
            imageThumbnail={Images.categoryNews}
            title="Bitcon News"
            subTitle="Json Thomas, Breaking News"
            tagName="Teachnical"
            comment="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt."
            commentUrl="https://fintechmagazine.com/venture-capital/us-israeli-fintech-sunbit-raises-dollar130m-hits-unicorn-status"
            titleThumbnail="US-Israeli fintech Sunbit raises $130m, hits unicorn status"
            subTitleThumbnail="https://fintechmagaz"
            titleShare="Share"
            onDetail={() => navigation.navigate('NPostDetail')}
            onShare={onShare}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Button
          style={{
            flex: 1,
            marginRight: 5,
            backgroundColor: parseHexTransparency(colors.primary, 30),
          }}
          styleText={{
            color: colors.primary,
          }}
          onPress={() => onUnWatch()}
        >
          {t('unwatch')}
        </Button>
        <Button style={{ flex: 1, marginLeft: 5 }} onPress={() => navigation.navigate('FCrypto060708', { id: 2 })}>
          {t('add_transaction')}
        </Button>
      </View>
    </View>
  );
};

export default Detail;
