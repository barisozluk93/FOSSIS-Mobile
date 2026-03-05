import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { PTaskPriority, PTaskStatus, PTaskType, PTeamMembersInCreate } from '@/data';
import {
  Button,
  FormDoubleSelectOption,
  Header,
  Icon,
  PaymentOption,
  PButtonAddUser,
  ProfileGridSmall,
  SafeAreaView,
  Tag,
  Text,
} from '@/components';
import styles from './styles';

const PFilter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [status, setStatus] = useState(PTaskStatus[0]);
  const [type, setType] = useState(PTaskType[0]);
  const [priority, setPriority] = useState(PTaskPriority[0]);
  const [loading, setLoading] = useState(false);

  const onClear = () => {
    setStatus(PTaskStatus[0]);
    setType(PTaskType[0]);
    setPriority(PTaskPriority[0]);
  };

  const renderItem = ({ item, checked, onPress }) => {
    return (
      <Tag
        key={item.id}
        icon={checked ? <Icon style={{ marginRight: 5 }} name="check" color={BaseColor.whiteColor} size={16} /> : null}
        primary={checked}
        outline={!checked}
        style={{
          marginTop: 8,
          marginRight: 8,
          height: 28,
          minWidth: 100,
        }}
        onPress={onPress}
      >
        {item.text}
      </Tag>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('filtering')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('clear')}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={onClear}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text headline semibold>
            {t('status')}
          </Text>
          <View style={styles.wrapContent}>
            {PTaskStatus.map((item, index) => (
              <Fragment key={index}>
                {renderItem({
                  item,
                  index,
                  checked: item.value === status.value,
                  onPress: () => setStatus(item),
                })}
              </Fragment>
            ))}
          </View>
          <Text headline semibold style={{ marginTop: 20 }}>
            {t('type')}
          </Text>
          <View style={styles.wrapContent}>
            {PTaskType.map((item, index) => (
              <Fragment key={index}>
                {renderItem({
                  item,
                  index,
                  checked: item.value === type.value,
                  onPress: () => setType(item),
                })}
              </Fragment>
            ))}
          </View>
          <Text headline semibold style={{ marginTop: 20, marginBottom: 5 }}>
            {t('priority')}
          </Text>
          <View>
            {PTaskPriority.map((item, index) => (
              <PaymentOption
                key={index}
                style={{}}
                isIcon={false}
                checked={item.value === priority.value}
                title={item.text}
                onPress={() => setPriority(item)}
              />
            ))}
          </View>
          <Text headline semibold style={{ marginTop: 20 }}>
            {t('assignee')}
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
          <Text headline style={{ marginTop: 10, marginBottom: 5 }}>
            {t('schedule')}
          </Text>
          <FormDoubleSelectOption titleLeft={t('start_date')} titleRight={t('end_date')} />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
              setLoading(false);
            }, 300);
          }}
          loading={loading}
        >
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PFilter;
