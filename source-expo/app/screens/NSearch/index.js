import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { BookingTime, Button, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

const NSearch = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState('');
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(1);
  const [night, setNight] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (modal) => {
    setModalVisible(modal);
  };

  const setValue = (mode, value) => {
    switch (value) {
      case 'adult':
        if (mode === 'up') {
          setAdult(adult + 1);
        } else {
          setAdult(adult - 1 > 0 ? adult - 1 : 0);
        }
        break;
      case 'children':
        if (mode === 'up') {
          setChildren(children + 1);
        } else {
          setChildren(children - 1 > 0 ? children - 1 : 0);
        }
        break;
      case 'night':
        if (mode === 'up') {
          setNight(night + 1);
        } else {
          setNight(night - 1 > 0 ? night - 1 : 0);
        }
        break;
    }
  };

  const renderModal = () => {
    return (
      <View>
        <Modal
          isVisible={modalVisible === 'quest'}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            <View style={styles.contentActionModalBottom}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text body1>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text body1 primaryColor>
                  {t('save')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineRow}>
              <View>
                <Text body1>Adults</Text>
                <Text caption1 grayColor>
                  16+ {t('years')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'adult')}>
                  <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
                </TouchableOpacity>
                <Text title1>{adult}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'adult')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineRow}>
              <View>
                <Text body1>Children</Text>
                <Text caption1 grayColor>
                  2-11 {t('years')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'children')}>
                  <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
                </TouchableOpacity>
                <Text title1>{children}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'children')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={modalVisible === 'duration'}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          style={styles.bottomModal}
        >
          <View style={styles.contentFilterBottom}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>
            <View style={styles.contentActionModalBottom}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text body1>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text body1 primaryColor>
                  {t('save')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.lineRow, { marginBottom: 40 }]}>
              <View>
                <Text body1>{t('duration')}</Text>
                <Text caption1 grayColor>
                  {t('night')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'night')}>
                  <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
                </TouchableOpacity>
                <Text title1>{night}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'night')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.whiteColor }]}
      edges={['right', 'top', 'left']}
    >
      {renderModal()}
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <TextInput
          style={BaseStyle.textInput}
          onChangeText={(text) => setKeyword(text)}
          autoCorrect={false}
          placeholder="What're you looking for ?"
          placeholderTextColor={BaseColor.grayColor}
          value={keyword}
          selectionColor={colors.primary}
        />
        <BookingTime style={{ marginTop: 15 }} />
        <View style={styles.contentQuest}>
          <TouchableOpacity style={styles.total} onPress={() => openModal('quest')}>
            <Text caption1 grayColor style={{ marginBottom: 5 }}>
              Total Guest(s)
            </Text>
            <Text body1 semibold>
              2 Adults, 1 Children
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.duration} onPress={() => openModal('duration')}>
            <Text caption1 grayColor style={{ marginBottom: 5 }}>
              {t('duration')}
            </Text>
            <Text body1 semibold>
              1 {t('night')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.navigate('Hotel');
              setLoading(false);
            }, 500);
          }}
          loading={loading}
        >
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NSearch;
