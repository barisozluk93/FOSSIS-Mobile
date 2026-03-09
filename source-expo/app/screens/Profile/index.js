import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseStyle, Images, useTheme } from '@/config';
// Load sample data
import { Button, Icon, ProfileDetail, ProfilePerformance, SafeAreaView, Tag, Text } from '@/components';
import { AuthActions } from '@/actions';
import styles from './styles';
import { logout } from '@/actions/auth';
import { avatarUploadFolderUrl } from '@/utils/utility';


const Profile = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigation } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onLogOut = () => {
    setLoading(true);
    dispatch(logout());
    dispatch({ type: "AUTH_INIT" });
    dispatch({ type: "USER_INIT" });
    dispatch({ type: "ROLE_INIT" });
    dispatch({ type: 'PERMISSION_INIT' });
    dispatch({ type: 'PANEL_INIT' });
    dispatch({ type: 'INVERTER_INIT' });
    dispatch({ type: 'BATTERY_INIT' });
    dispatch({ type: 'HEATPUMP_INIT' });
    dispatch({ type: 'CONSTRUCTION_INIT' });
    dispatch({ type: 'CABLE_INIT' });
    dispatch({ type: 'CHARGINGSTATION_INIT' });

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignIn');
    }, 250);
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
            {user && (
              <ProfileDetail
                image={user.fileId ? "data:" + user.fileResult.contentType + ";base64," + user.fileResult.fileContents : Images.avata5}
                isAvatarExist={user.fileId ? true : false}
                textFirst={user.name + " " + user.surname}
                textSecond={user.username}
                textThird={user.email}
                onPress={() => { }}
              />
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
              {user && (
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
              {user && (
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
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        {user ? (
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
