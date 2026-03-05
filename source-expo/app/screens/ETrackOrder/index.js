import { useTranslation } from 'react-i18next';
import { ScrollView, View, Linking } from 'react-native';
import { ProductOrderItemList, ProfileCall, SafeAreaView, Text, TimeLine, Header, Icon, Button } from '@/components';
import { BaseStyle, Images, useTheme } from '@/config';
import { OrderDetail } from '@/data';
import styles from './styles';

const dataInit = [
  {
    title: 'Order Placed',
    description: '28 Apr 2020 09:00',
    isDone: true,
  },
  {
    title: 'Order Accepted',
    description: '29 Apr 2020 09:00',
    isDone: true,
  },
  {
    title: 'Order Shipping',
    description: '30 Apr 2020 09:00',
    isDone: true,
  },
  {
    title: 'Completed',
    description: '1 May 2020 09:00',
    isDone: false,
  },
];

const ETrackOrder = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const renderContent = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={[{ flex: 1, paddingBottom: 10 }]}>
            <View style={{ paddingHorizontal: 20 }}>
              <ProductOrderItemList
                style={[
                  {
                    paddingVertical: 20,
                    backgroundColor: colors.background,
                  },
                ]}
                orderData={OrderDetail}
              />
              <View style={[styles.header, { borderBottomColor: colors.border, marginBottom: 16 }]} />
              <ProfileCall
                style={{ marginBottom: 16 }}
                image={Images.profile1}
                name={'Steve Garrett'}
                description={'Shipper'}
                onPressRight={() => Linking.openURL(`tel:+6512345678`)}
              />
              <TimeLine data={dataInit} style={{ paddingHorizontal: 12 }} />
              <View style={[styles.header, { borderBottomColor: colors.border, marginVertical: 24 }]} />
              <Text headline>Payment & Shipping</Text>
              <View style={{ marginTop: 16 }}>
                <Text capption1 grayColor>
                  Payment Method
                </Text>
                <Text body1 style={{ paddingTop: 4 }}>
                  Cash On Delivery
                </Text>
              </View>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text capption1 grayColor>
                    User Information
                  </Text>
                  <Text body1 style={{ paddingTop: 4 }}>
                    Steve Grarrett
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text capption1 grayColor>
                    Phone Number
                  </Text>
                  <Text body1 style={{ paddingTop: 4 }}>
                    +65 1234 5678
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 16 }}>
                <Text capption1 grayColor>
                  Shipping Address
                </Text>
                <Text body1 style={{ paddingTop: 4 }}>
                  35 Mandalay Road # 13–37 Mandalay Towers Singapore 308215 SINGAPORE
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('track_order')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {renderContent()}
      <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        <Button onPress={() => navigation.navigate('EHome')}>{t('home')}</Button>
      </View>
    </SafeAreaView>
  );
};

export default ETrackOrder;
