import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { Button, CheckBox, Header, Icon, SafeAreaView, Tag, Text, TextInput } from '@/components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { isNullOrEmpty } from '@/utils/utility';

const ProjectFilter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { searchTerm } = useSelector(state => state.project);

  useEffect(() => {
    if(searchTerm && !isNullOrEmpty(searchTerm)) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const onClear = () => {
    setSearch('');
  };

  const onFilter = () => {
    var filter = {};
    if(search) {
      filter.searchTerm = search;
    }
    else{
      filter.searchTerm = undefined;
    }

    dispatch({ type: 'PROJECT_SET_FILTER', payload: filter ? filter : null });
    navigation.goBack();
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
        onPressRight={() => onClear()}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text headline semibold style={{ marginTop: 20 }}>
            {t('search')}
          </Text>
          <View style={[styles.wrapContent, { marginTop: 8 }]}>
            <TextInput
              value={search}
              onChangeText={(val) => setSearch(val)}
              placeholder={t('search')}
              iconLeft={<Icon name="search" color={colors.border} style={{ marginRight: 8 }} size={18} />}
            />
          </View>
          
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={onFilter}
        >
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProjectFilter;
