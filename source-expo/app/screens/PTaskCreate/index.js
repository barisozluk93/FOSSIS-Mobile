import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import {
  FormDoubleSelectOption,
  Header,
  Icon,
  PButtonAddUser,
  SafeAreaView,
  Text,
  TextInput,
  ListOptionSelected,
  ModalOption,
  ModalFilter,
  ProfileAuthor,
} from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { PTaskStatus, PTaskType, PTaskPriority, FFriends } from '@/data';
import ChooseFile from './ChooseFile';
import styles from './styles';

const assignee = FFriends[0];

const PTaskCreate = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [headerName, setHeaderName] = useState(t('create_task'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState(PTaskStatus[0]);
  const [openType, setOpenType] = useState(false);
  const [type, setType] = useState(PTaskType[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sort, setSort] = useState(PTaskPriority[0]);
  const [sortChose, setSortChose] = useState(PTaskPriority[0]);

  useEffect(() => {
    if (route?.params?.item) {
      const item = route?.params?.item;
      setTitle(item.title);
      setDescription(item.description);
      setHeaderName(t('edit_task'));
    }
  }, [route?.params?.item]);

  const onApply = () => {
    setSortChose(sort);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={headerName}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('save')}
            </Text>
          );
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.contain}>
          <Text headline style={styles.title}>
            {t('title')}
          </Text>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setTitle(text)}
            autoCorrect={false}
            placeholder={'App Design and Development'}
            placeholderTextColor={BaseColor.grayColor}
            value={title}
          />

          <Text headline style={styles.title}>
            {t('description')}
          </Text>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10, height: 120 }]}
            onChangeText={(text) => setDescription(text)}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder={'Enter some brief about task'}
            placeholderTextColor={BaseColor.grayColor}
            value={description}
          />
          <Text headline style={styles.title}>
            {t('schedule')}
          </Text>
          <FormDoubleSelectOption titleLeft={t('start_date')} titleRight={t('end_date')} />
          <Text headline style={styles.title}>
            {t('status')}
          </Text>
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('priority')}
            textRight={t(sortChose.text)}
            onPress={() => setModalVisible(true)}
          />
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('status')}
            textRight={status.text}
            onPress={() => setOpenStatus(true)}
          />
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('type')}
            textRight={type.text}
            onPress={() => setOpenType(true)}
          />
          <Text headline style={styles.title}>
            {t('assignee')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <ProfileAuthor
                image={assignee.image}
                name={assignee.name}
                description={assignee.total}
                onPress={() => {}}
              />
            </View>
            <PButtonAddUser
              onPress={() =>
                navigation.navigate('PSelectAssignee', {
                  members: [assignee],
                })
              }
            />
          </View>
        </View>
        <ChooseFile />
      </ScrollView>
      <ModalOption
        options={PTaskStatus}
        isVisible={openStatus}
        onSwipeComplete={() => {
          setOpenStatus(false);
        }}
        onPress={(item) => {
          setStatus(item);
          setOpenStatus(false);
        }}
      />
      <ModalOption
        options={PTaskType}
        isVisible={openType}
        onSwipeComplete={() => {
          setOpenType(false);
        }}
        onPress={(item) => {
          setType(item);
          setOpenType(false);
        }}
      />
      <ModalFilter
        options={PTaskPriority.map((item) => ({
          ...item,
          checked: item.value === sort.value,
        }))}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setSort(sortChose);
          setModalVisible(false);
        }}
        onApply={onApply}
        onSelectFilter={(item) => setSort(item)}
      />
    </SafeAreaView>
  );
};

export default PTaskCreate;
