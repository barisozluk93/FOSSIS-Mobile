import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import LabelUpper2Row from '@/components/Label/Upper2Row';
import { Text } from '@/components';

export default () => {
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
              marginBottom: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text title3>{t('overview')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('market_value')} value="$997.39" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('holdings')} value="100B" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('net_cost')} value="$99739" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('avg_net_cost')} value="$5000" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('profit_lost')} value="-" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('percent_change')} value="-" />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
