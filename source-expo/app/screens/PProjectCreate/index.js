import { Fragment, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import {
  FormDoubleSelectOption,
  Header,
  Icon,
  PButtonAddUser,
  ProfileGridSmall,
  SafeAreaView,
  Text,
  TextInput,
} from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { PTeamMembersInCreate } from '@/data';
import ChooseFile from './ChooseFile';
import styles from './styles';

const PProjectCreate = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [headerName, setHeaderName] = useState(t('create_project'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route?.params?.item) {
      const item = route?.params?.item;
      setTitle(item.title);
      setDescription(item.description);
      setHeaderName(t('edit_project'));
      setBudget('$50,000');
    }
  }, [route?.params?.item]);

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
            {t('project_name')}
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
            placeholder={'Enter some brief about project'}
            placeholderTextColor={BaseColor.grayColor}
            value={description}
          />
          <Text headline style={styles.title}>
            {t('schedule')}
          </Text>
          <FormDoubleSelectOption titleLeft={t('start_date')} titleRight={t('end_date')} />
          <Text headline style={styles.title}>
            {t('budget')}
          </Text>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setBudget(text)}
            autoCorrect={false}
            placeholder={'$30,000'}
            placeholderTextColor={BaseColor.grayColor}
            value={budget}
          />
          <Text headline style={styles.title}>
            {t('team_members')}
          </Text>
          <View style={styles.wrapContent}>
            {PTeamMembersInCreate.map((item, index) => {
              return (
                <Fragment key={index}>
                  <View
                    style={{
                      width: '25%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ProfileGridSmall image={item.image} name={item.name} onPress={() => {}} />
                  </View>
                  {index === PTeamMembersInCreate.length - 1 && (
                    <View
                      key={index}
                      style={{
                        width: '25%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PButtonAddUser
                        onPress={() =>
                          navigation.navigate('PSelectAssignee', {
                            members: PTeamMembersInCreate,
                          })
                        }
                      />
                    </View>
                  )}
                </Fragment>
              );
            })}
          </View>
        </View>
        <ChooseFile />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PProjectCreate;
