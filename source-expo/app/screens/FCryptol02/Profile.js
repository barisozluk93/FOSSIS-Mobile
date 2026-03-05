import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import LabelUpper2Row from '@/components/Label/Upper2Row';
import { Image, ListMenuIcon, Text } from '@/components';
import { Images, useTheme } from '@/config';
import { FLinks } from '@/data';

const Profile = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

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
              marginBottom: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text title1>Bitcoin (BTC)</Text>
              <Text title3 style={{ marginTop: 10 }}>
                A peer-to-peer electric cash system
              </Text>
            </View>
            <Image source={Images.coinBitcon} style={{ width: 40, height: 40 }} />
          </View>
          <Text body2>
            Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be
            sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.
          </Text>
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 15,
              paddingBottom: 10,
            }}
          >
            <Text title3>{t('organization')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('incorporated_in')} value="Bitcoin" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('consensus_method')} value="Proof-of-Work" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('token_type')} value="Native" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('token_use')} value="Payments" />
            </View>
          </View>
          <Text title3>{t('links')}</Text>
          {FLinks.map((item) => (
            <ListMenuIcon key={item.id} icon={item.icon} title={item.title} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
