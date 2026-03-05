import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FMarkers } from '@/data';
import { CategoryList, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import styles from './styles';

const regionInit = {
  ...FMarkers[0],
  latitudeDelta: 0.009,
  longitudeDelta: 0.004,
};

export default function FChooseLocation() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [region] = useState(regionInit);
  const [loading] = useState('');
  const [keywork, setKeywork] = useState('');
  const [addressChoosed, setAddressChoosed] = useState(FMarkers[0]);
  const [markers] = useState(FMarkers);
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef({});

  useEffect(() => {
    setTimeout(() => {
      ref?.current?.[0]?.showCallout();
    }, 1000);
  }, []);

  useEffect(() => {
    if (route?.params?.address) {
      setAddressChoosed(route?.params?.address ?? {});
    }
  }, [route?.parmas]);

  /**
   * Called when apply change language
   */
  const saveAddress = () => {
    navigation.navigate({
      name: 'FAddTransaction',
      params: { address: addressChoosed },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('choose_location')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={saveAddress}
      />
      <View style={styles.contain}>
        <View style={{ height: '100%', width: '100%' }}>
          <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
            {markers.map((marker, index) => (
              <Marker
                ref={(refMarker) => (ref.current[index] = refMarker)}
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
                onPress={() => setAddressChoosed(marker)}
              >
                <View
                  style={[
                    styles.marker,
                    {
                      backgroundColor: parseHexTransparency(colors.primary, 30),
                    },
                  ]}
                >
                  <Icon name="map-marker-alt" size={20} color={colors.primary} />
                </View>
                <Callout tooltip={true} style={{ width: 'auto' }}>
                  <CategoryList
                    style={{
                      width: 330,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                    }}
                    isImageRound
                    image={marker.image}
                    title={marker.title}
                    subtitle={marker.description}
                  />
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 20,
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 60,
          }}
        >
          <TextInput
            onChangeText={(text) => setKeywork(text)}
            placeholder={t('Address')}
            value={keywork}
            icon={
              <TouchableOpacity onPress={() => setKeywork('')}>
                <Icon name="search" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
