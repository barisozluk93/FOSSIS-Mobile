import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, View } from 'react-native';
import { PProject, PProjectType, PTaskPriority, PTaskStatus, PProjectAction } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { Header, Icon, Project01, PSelectOption, SafeAreaView, Tag, Text, ModalOption } from '@/components';
import styles from './styles';

const PHome = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [sort, setSort] = useState('sort');
  const [projects, setProjects] = useState(PProject);
  const [showAction, setShowAction] = useState(false);

  const goProjectDetail = (item) => {
    navigation.navigate('PProjectView', { item: item });
  };

  const handleSort = () => {
    const projectsInline = [...PProject];
    projectsInline.sort((a, b) => {
      var priorityA = a.id;
      var priorityB = b.id;
      if (priorityB < priorityA) {
        return sort === 'caret-down' ? -1 : 1;
      }
      if (priorityB > priorityA) {
        return sort === 'caret-down' ? 1 : -1;
      }

      return 0;
    });
    return projectsInline;
  };

  const onSort = () => {
    Utils.enableExperimental();
    switch (sort) {
      case 'sort':
        setProjects(handleSort());
        setSort('caret-down');
        break;
      case 'caret-down':
        setProjects(handleSort());
        setSort('caret-up');
        break;
      case 'caret-up':
        setProjects(PProject);
        setSort('sort');
        break;
      default:
        setProjects(PProject);
        setSort('sort');
        break;
    }
  };

  const onFilter = (data) => {
    if (data.length > 0) {
      setProjects(PProject.filter((item) => item.id <= data.length));
    } else {
      setProjects(PProject);
    }
  };

  const onChangeType = (typeInline) => {
    onFilter(typeInline);
    setType(typeInline);
  };
  const onChangePriority = (typeInline) => {
    onFilter(typeInline);
    setPriority(typeInline);
  };
  const onChangeStatus = (typeInline) => {
    onFilter(typeInline);
    setStatus(typeInline);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { backgroundColor: colors.card }]} edges={['right', 'top', 'left']}>
      <Header
        style={{ backgroundColor: colors.card }}
        title={t('project')}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('create')}
            </Text>
          );
        }}
        onPressRight={() => {
          navigation.navigate('PProjectCreate');
        }}
      />
      <View style={[styles.filter, { borderColor: colors.border }]}>
        <Tag
          gray
          style={{
            borderRadius: 3,
            backgroundColor: BaseColor.kashmir,
            marginHorizontal: 5,
            paddingVertical: 3,
          }}
          textStyle={{
            paddingHorizontal: 4,
            color: BaseColor.whiteColor,
          }}
          icon={<Icon name={sort} color={BaseColor.whiteColor} size={10} />}
          onPress={onSort}
        >
          {t('sort')}
        </Tag>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <PSelectOption title={t('type')} options={PProjectType} value={type} onPress={(item) => onChangeType(item)} />
          <PSelectOption
            title={t('priority')}
            options={PTaskPriority}
            value={priority}
            onPress={(item) => onChangePriority(item)}
          />
          <PSelectOption
            title={t('status')}
            options={PTaskStatus}
            value={status}
            onPress={(item) => onChangeStatus(item)}
          />
        </ScrollView>
      </View>
      <FlatList
        contentContainerStyle={{ backgroundColor: colors.card }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={projects}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <Project01
            title={item.title}
            description={item.description}
            status={item.status}
            tasks={item.tasks}
            comments={item.comments}
            tickets={item.tickets}
            completedTickets={item.completedTickets}
            members={item.members}
            onPress={() => goProjectDetail(item)}
            onOption={() => setShowAction(true)}
            style={{
              paddingBottom: 20,
              marginBottom: 15,
              backgroundColor: 'white',
            }}
          />
        )}
      />
      <ModalOption
        value={{}}
        options={PProjectAction}
        isVisible={showAction}
        onSwipeComplete={() => {
          setShowAction(false);
        }}
        onPress={() => {
          setShowAction(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PHome;
