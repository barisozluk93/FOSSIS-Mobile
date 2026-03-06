import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { Button, CheckBox, Header, Icon, SafeAreaView, Tag, Text, TextInput } from '@/components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { isNullOrEmpty } from '@/utils/utility';

const MaterialFilter = (props) => {
  const { navigation, route } = props;
  const { item } = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { searchTerm: panelSearchTerm } = useSelector(state => state.panel);
  const { searchTerm: inverterSearchTerm } = useSelector(state => state.inverter);
  const { searchTerm: batterySearchTerm } = useSelector(state => state.battery);
  const { searchTerm: heatpumpSearchTerm } = useSelector(state => state.heatpump);
  const { searchTerm: constructionSearchTerm } = useSelector(state => state.construction);
  const { searchTerm: cableSearchTerm } = useSelector(state => state.cable);
  const { searchTerm: chargingstationSearchTerm } = useSelector(state => state.chargingstation);

  useEffect(() => {
    if(panelSearchTerm && !isNullOrEmpty(panelSearchTerm)) {
      setSearch(panelSearchTerm);
    }

    if(inverterSearchTerm && !isNullOrEmpty(inverterSearchTerm)) {
      setSearch(inverterSearchTerm);
    }

    if(batterySearchTerm && !isNullOrEmpty(batterySearchTerm)) {
      setSearch(batterySearchTerm);
    }

    if(heatpumpSearchTerm && !isNullOrEmpty(heatpumpSearchTerm)) {
      setSearch(heatpumpSearchTerm);
    }

    if(constructionSearchTerm && !isNullOrEmpty(constructionSearchTerm)) {
      setSearch(constructionSearchTerm);
    }

    if(cableSearchTerm && !isNullOrEmpty(cableSearchTerm)) {
      setSearch(cableSearchTerm);
    }

    if(chargingstationSearchTerm && !isNullOrEmpty(chargingstationSearchTerm)) {
      setSearch(chargingstationSearchTerm);
    }
  }, [panelSearchTerm, inverterSearchTerm, batterySearchTerm, heatpumpSearchTerm, constructionSearchTerm, cableSearchTerm, chargingstationSearchTerm]);

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

    if(item === 1) {
      dispatch({ type: 'PANEL_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 2) {
      dispatch({ type: 'INVERTER_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 3) {
      dispatch({ type: 'BATTERY_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 4) {
      dispatch({ type: 'HEATPUMP_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 5) {
      dispatch({ type: 'CONSTRUCTION_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 6) {
      dispatch({ type: 'CABLE_SET_FILTER', payload: filter ? filter : null });
    }
    else if(item === 7) {
      dispatch({ type: 'CHARGINGSTATION_SET_FILTER', payload: filter ? filter : null });
    }

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

export default MaterialFilter;
