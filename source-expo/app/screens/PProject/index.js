import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Header, Icon, Project01, SafeAreaView, Tag, Text, ModalOption, ProjectTicket, NotFound } from '@/components';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { pagingProject } from '@/actions/project';
import { deleteRequest } from '@/apis/projectApi';
import Toast from 'react-native-toast-message';

const PProject = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [showAction, setShowAction] = useState(false);
  const { projects, page, totalPages, searchTerm, loading } = useSelector(state => state.project);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector(state => state.user);
  const [selectedItem, setSelectedIdtem] = useState(undefined);

  const fetchProjects = () => {
    dispatch(pagingProject(currentPage, 5, searchTerm, user ? user.id : 0, user ? user.roles.includes(1) : false));
  }

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
      return () => {
        dispatch({ type: 'PROJECT_INIT' });
      };
    }, [currentPage, searchTerm])
  );

  const onFilter = () => {
    navigation.navigate('ProjectFilter');
  };

  const confirmDeleteProject = (item) => {
    Alert.alert(
      "",
      t('sure'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('ok'),
          onPress: () => deleteProject(item),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteProject = (item) => {
    deleteRequest(item.id).then(result => {
      if (result.isSuccess) {
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t('success_message'),
        });
        
        setTimeout(() => {
          fetchProjects();
        }, 250);
      }
      else {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: result?.message || t('pw_didnt_match_message'),
        });
      }
    }).catch(error => {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: result?.message || t('pw_didnt_match_message'),
      });
    })
  }

  const onItemSelected = (item) => {
    setShowAction(false);
    if (item.value === 1) {
      navigation.navigate('PProjectCreate', { item: selectedItem });
    }
    else if (item.value === 2){
      confirmDeleteProject(selectedItem);
    }
    else {
      navigation.navigate('PProjectReport', { item: selectedItem });
    }
  }

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingLeft: 8,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
        }}
      >
        {/* <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Tag
            gray
            style={{
              borderRadius: 3,
              backgroundColor: colors.primary,
              paddingVertical: 3,
            }}
            textStyle={{
              paddingHorizontal: 4,
              fontSize: 15,
              color: BaseColor.whiteColor,
            }}
            icon={<Icon name="filter" color={BaseColor.whiteColor} size={15} />}
            onPress={() => onFilter()}
          >
            {t("filter")}
          </Tag>
        </View> */}

        {projects && projects.length > 0 && !loading && <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setCurrentPage(page - 1)}
            style={{ marginHorizontal: 6, opacity: page === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {page}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => setCurrentPage(page + 1)}
            style={{ marginHorizontal: 6, opacity: page === totalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}
      </View>

      {(loading) && <ActivityIndicator color={colors.primary} size={"large"} style={{ flex: 1 }}></ActivityIndicator>}
        
      {!loading && projects && projects.length === 0 && <NotFound />}

      <FlatList
        contentContainerStyle={{ backgroundColor: colors.card }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={projects}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <ProjectTicket
            id={item.id}
            name={item.name}
            status={!item.isDeleted ? 'active' : 'passive'}
            location={item.location}
            panel={item.panel ? item.panel.model + " - " + item.panel.series : undefined}
            roofArea={item.roofArea}
            margin={item.margin}
            gridSpace={item.gridSpace}
            isDeleted={item.isDeleted}
            onOption={(item) => { setSelectedIdtem(projects.filter(f => f.id == item)[0]); setShowAction(true); }}
            style={{
              paddingBottom: 20,
              marginBottom: 15,
            }}
          />
        )}
      />
      <ModalOption
        value={{}}
        options={selectedItem?.systemPower ? [
          { value: 1, text: t('edit') },
          { value: 2, text: t('delete') },
          { value: 3, text: t('get_report')}
        ] : [
          { value: 1, text: t('edit') },
          { value: 2, text: t('delete') },
        ]}
        isVisible={showAction}
        onSwipeComplete={() => {
          setShowAction(false);
        }}
        onPress={(item) => {
          onItemSelected(item);
        }}
      />
    </SafeAreaView>
  );
};

export default PProject;
