import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, PSelectOption, SafeAreaView, Tag, Text, PermissionTicket, NotFound, RoleTicket, Ticket, UserTicket } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { pagingUser } from '@/actions/user';
import { pagingRole } from '@/actions/role';
import { pagingPermission } from '@/actions/permission';

const PUser = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { users, page: userPage, totalPages: userTotalPages, searchTerm: userSearchTerm, loading: userLoading } = useSelector(state => state.user);
  const { permissions, page: permissionPage, totalPages: permissionTotalPages, searchTerm: permissionSearchTerm, loading: permissionLoading } = useSelector(state => state.permission);
  const { roles, page: rolePage, totalPages: roleTotalPages, searchTerm: roleSearchTerm, loading: roleLoading } = useSelector(state => state.role);
  const [currentPage, setCurrentPage] = useState(1);

  const createTypes = () => [
    {
      value: 1,
      iconName: 'users',
      text: t('users'),
    },
    {
      value: 2,
      iconName: 'user-tag',
      text: t('roles'),
    },
    {
      value: 3,
      iconName: 'user-shield',
      text: t('permissions'),
    }
  ];

  const [types, setTypes] = useState(createTypes());
  const [type, setType] = useState([createTypes()[0]]);

  const fetchUsers = () => {
    dispatch(pagingUser(currentPage, 5, userSearchTerm));
  }

  const fetchRoles = () => {
    dispatch(pagingRole(currentPage, 5, roleSearchTerm));
  }

  const fetchPermissions = () => {
    dispatch(pagingPermission(currentPage, 5, permissionSearchTerm));
  }

  useEffect(() => {
      setTypes([]);
      setTypes(createTypes());
      setType([createTypes()[0]])
    }, [i18n.language]);

  useFocusEffect(
    useCallback(() => {
      if(type && type[0]) {
        if (type[0].value === 1) {
          fetchUsers();
        }
        else if (type[0].value === 2) {
          fetchRoles();
        }
        else if (type[0].value === 3) {
          fetchPermissions();
        }
      }

      return () => {
        dispatch({ type: 'USER_LIST_INIT' });
        dispatch({ type: 'ROLE_INIT' });
        dispatch({ type: 'PERMISSION_INIT' });
      };
    }, [currentPage, userSearchTerm, roleSearchTerm, permissionSearchTerm, type])
  );

  const onFilter = () => {
    navigation.navigate('UserFilter', { item : type[0].value });
  };

  const onChangeType = (typeInline) => {
    setType([typeInline]);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('usermanagement')}
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
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            {types && types.length > 0 && (
            <PSelectOption
              key={i18n.language}
              title={t('type')}
              options={types}
              value={type}
              onPress={onChangeType}
            />
          )}    
          </View>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <TouchableOpacity disabled={true}>
              {type && type[0] && <Text header style={{ paddingVertical: 1.75, borderRadius: 8, textAlign: "center", color: BaseColor.whiteColor, fontSize: 16 }}>
              <Icon name={type[0].iconName} solid />&nbsp;{type[0].text}
            </Text>}
            </TouchableOpacity>
           
          </View>
        </View>
      
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
          <View style={{ flex: 1, alignItems: "flex-start" }}>
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
          </View>
          {type && type[0] &&  type[0].value === 1 && users && users.length > 0 && !userLoading && <View
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
              disabled={userPage === 1}
              onPress={() => setCurrentPage(userPage - 1)}
              style={{ marginHorizontal: 6, opacity: userPage === 1 ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={true}>
              <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
                {userPage}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={userPage === userTotalPages}
              onPress={() => setCurrentPage(userPage + 1)}
              style={{ marginHorizontal: 6, opacity: userPage === userTotalPages ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
            </TouchableOpacity>
          </View>}

          {type && type[0] && type[0].value === 2 && roles && roles.length > 0 && !roleLoading && <View
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
              disabled={rolePage === 1}
              onPress={() => setCurrentPage(rolePage - 1)}
              style={{ marginHorizontal: 6, opacity: rolePage === 1 ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={true}>
              <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
                {rolePage}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={rolePage === roleTotalPages}
              onPress={() => setCurrentPage(rolePage + 1)}
              style={{ marginHorizontal: 6, opacity: rolePage === roleTotalPages ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
            </TouchableOpacity>
          </View>}

          {type && type[0] && type[0].value === 3 && permissions && permissions.length > 0 && !permissionLoading && <View
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
              disabled={permissionPage === 1}
              onPress={() => setCurrentPage(permissionPage - 1)}
              style={{ marginHorizontal: 6, opacity: permissionPage === 1 ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={true}>
              <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
                {permissionPage}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={permissionPage === permissionTotalPages}
              onPress={() => setCurrentPage(permissionPage + 1)}
              style={{ marginHorizontal: 6, opacity: permissionPage === permissionTotalPages ? 0.4 : 1 }}
            >
              <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
            </TouchableOpacity>
          </View>}
        </View>

      {(userLoading || roleLoading || permissionLoading) && <ActivityIndicator color={colors.primary} size={"large"} style={{ flex: 1 }}></ActivityIndicator>}

      {type && type[0] && (type[0].value === 1 && !userLoading && users && users.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 1 && !userLoading && users && users.length > 0 && 
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <UserTicket
            title={item.name + " " + item.surname}
            description={item.username}
            phone={item.phone}
            email={item.email}
            status={!item.isDeleted ? "active" : "passive"}
            style={{
              marginVertical: 10,
            }}
          />
        )}
      />}

      {type && type[0] && (type[0].value === 2 && !roleLoading && roles && roles.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 2 && !roleLoading && roles && roles.length > 0 && <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={roles}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <RoleTicket
            title={item.name}
            description={item.code}
            status={!item.isDeleted ? "active" : "passive"}
            style={{
              marginVertical: 10,
            }}
          />
        )}
      />}

      
      {type && type[0] && (type[0].value === 3 && !permissionLoading && permissions && permissions.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 3 && !permissionLoading && permissions && permissions.length > 0 && <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={permissions}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <PermissionTicket
            title={item.name}
            description={item.code}
            status={!item.isDeleted ? "active" : "passive"}
            style={{
              marginVertical: 10,
            }}
          />
        )}
      />}
    </SafeAreaView>
  );
};

export default PUser;
