import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseStyle, useTheme } from '@/config';
// Load sample data
import { UserData } from '@/data';
import { Button, Icon, ProfileDetail, ProfilePerformance, SafeAreaView, Tag, Text } from '@/components';
import { AuthActions } from '@/actions';
import styles from './styles';

const { authentication } = AuthActions;

const Profile = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const auth = useSelector((state) => state.auth);
  const login = auth.login.success;

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onLogOut = () => {
    setLoading(true);
    dispatch(
      authentication(false, () => {
        setLoading(false);
      })
    );
  };

  const onLogIn = () => {
    navigation.navigate('SignIn');
  };

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View style={[BaseStyle.container, { flex: 1 }]}>
        <View style={{ marginBottom: 20 }}>
          <Text header bold>
            {t('setting')}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {login && (
              <ProfileDetail
                image={userData.image}
                textFirst={userData.name}
                point={userData.point}
                textSecond={userData.address}
                textThird={userData.id}
                onPress={() => {}}
              />
            )}
            {login && (
              <View style={styles.viewFollow}>
                <View style={{ flex: 3 }}>
                  <Tag primary style={styles.follow} styleText={{}}>
                    + {t('follow')}
                  </Tag>
                </View>

                <View style={{ flex: 5 }}>
                  <ProfilePerformance data={userData.performance} />
                </View>
              </View>
            )}
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('Setting');
                }}
              >
                <Text body1>{t('setting')}</Text>
                <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
              </TouchableOpacity>
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('ProfileEdit');
                  }}
                >
                  <Text body1>{t('edit_profile')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}
              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}
                >
                  <Text body1>{t('change_password')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}

              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('EBank');
                  }}
                >
                  <Text body1>{t('payments')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}

              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('EAddress');
                  }}
                >
                  <Text body1>{t('billing_address')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}

              {login && (
                <TouchableOpacity
                  style={styleItem}
                  onPress={() => {
                    navigation.navigate('EWishlist');
                  }}
                >
                  <Text body1>{t('product_wishlist')}</Text>
                  <Icon
                    name="angle-right"
                    size={18}
                    color={colors.primary}
                    style={{ marginLeft: 5 }}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('PreviewComponent');
                }}
              >
                <Text body1>{t('preview_component')}</Text>
                <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('ContactUs');
                }}
              >
                <Text body1>{t('contact_us')}</Text>
                <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styleItem}
                onPress={() => {
                  navigation.navigate('AboutUs');
                }}
              >
                <Text body1>{t('about_us')}</Text>
                <Icon name="angle-right" size={18} color={colors.primary} style={{ marginLeft: 5 }} enableRTL={true} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        {login ? (
          <Button full loading={loading} onPress={() => onLogOut()}>
            {t('sign_out')}
          </Button>
        ) : (
          <Button full loading={loading} onPress={() => onLogIn()}>
            {t('sign_in')}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
