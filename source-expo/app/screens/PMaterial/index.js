import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, PSelectOption, SafeAreaView, Tag, Text, NotFound, MaterialTicket } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { pagingPanel } from '@/actions/panel';
import { pagingInverter } from '@/actions/inverter';
import { pagingBattery } from '@/actions/battery';
import { pagingHeatpump } from '@/actions/heatpump';
import { pagingConstruction } from '@/actions/construction';
import { pagingCable } from '@/actions/cable';
import { pagingChargingstation } from '@/actions/chargingstation';

const PMaterial = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { panels, page: panelPage, totalPages: panelTotalPages, searchTerm: panelSearchTerm, loading: panelLoading } = useSelector(state => state.panel);
  const { inverters, page: inverterPage, totalPages: inverterTotalPages, searchTerm: inverterSearchTerm, loading: inverterLoading } = useSelector(state => state.inverter);
  const { batteries, page: batteryPage, totalPages: batteryTotalPages, searchTerm: batterySearchTerm, loading: batteryLoading } = useSelector(state => state.battery);
  const { heatpumps, page: heatpumpPage, totalPages: heatpumpTotalPages, searchTerm: heatpumpSearchTerm, loading: heatpumpLoading } = useSelector(state => state.heatpump);
  const { constructions, page: constructionPage, totalPages: constructionTotalPages, searchTerm: constructionSearchTerm, loading: constructionLoading } = useSelector(state => state.construction);
  const { cables, page: cablePage, totalPages: cableTotalPages, searchTerm: cableSearchTerm, loading: cableLoading } = useSelector(state => state.cable);
  const { chargingstations, page: chargingstationPage, totalPages: chargingstationTotalPages, searchTerm: chargingstationSearchTerm, loading: chargingstationLoading } = useSelector(state => state.chargingstation);

  const [currentPage, setCurrentPage] = useState(1);
  const createTypes = () => [
    {
      value: 1,
      iconName: 'solar-panel',
      text: t('panels'),
    },
    {
      value: 2,
      iconName: 'bolt',
      text: t('inverters'),
    },
    {
      value: 3,
      iconName: 'battery-full',
      text: t('batteries'),
    },
    {
      value: 4,
      iconName: 'temperature-high',
      text: t('heatpumps'),
    },
    {
      value: 5,
      iconName: 'tools',
      text: t('constructions'),
    },
    {
      value: 6,
      iconName: 'plug',
      text: t('cables'),
    },
    {
      value: 7,
      iconName: 'charging-station',
      text: t('evchargingstations'),
    }
  ];

  const [types, setTypes] = useState(createTypes());
  const [type, setType] = useState([createTypes()[0]]);

  const fetchPanels = () => {
    dispatch(pagingPanel(currentPage, 5, panelSearchTerm));
  }

  const fetchInverters = () => {
    dispatch(pagingInverter(currentPage, 5, inverterSearchTerm));
  }

  const fetchBatTeries = () => {
    dispatch(pagingBattery(currentPage, 5, batterySearchTerm));
  }

  const fetchHeatpumps = () => {
    dispatch(pagingHeatpump(currentPage, 5, heatpumpSearchTerm));
  }

  const fetchConstructions = () => {
    dispatch(pagingConstruction(currentPage, 5, constructionSearchTerm));
  }

  const fetchCables = () => {
    dispatch(pagingCable(currentPage, 5, cableSearchTerm));
  }

  const fetchChargingStation = () => {
    dispatch(pagingChargingstation(currentPage, 5, chargingstationSearchTerm));
  }

  useEffect(() => {
    setTypes([]);
    setTypes(createTypes());
    setType([createTypes()[0]])
  }, [i18n.language]);

  useFocusEffect(
    useCallback(() => {

      if (type && type[0] && type[0].value === 1) {
        fetchPanels();
      }
      else if (type && type[0] && type[0].value === 2) {
        fetchInverters();
      }
      else if (type && type[0] && type[0].value === 3) {
        fetchBatTeries();
      }
      else if (type && type[0] && type[0].value === 4) {
        fetchHeatpumps();
      }
      else if (type && type[0] && type[0].value === 5) {
        fetchConstructions();
      }
      else if (type && type[0] && type[0].value === 6) {
        fetchCables();
      }
      else if (type && type[0] && type[0].value === 7) {
        fetchChargingStation();
      }

      return () => {
        dispatch({ type: 'PANEL_INIT' });
        dispatch({ type: 'INVERTER_INIT' });
        dispatch({ type: 'BATTERY_INIT' });
        dispatch({ type: 'HEATPUMP_INIT' });
        dispatch({ type: 'CONSTRUCTION_INIT' });
        dispatch({ type: 'CABLE_INIT' });
        dispatch({ type: 'CHARGINGSTATION_INIT' });
      };
    }, [currentPage, panelSearchTerm, inverterSearchTerm, batterySearchTerm, heatpumpSearchTerm, constructionSearchTerm, cableSearchTerm, chargingstationSearchTerm, type])
  );

  const onFilter = () => {
    navigation.navigate('MaterialFilter', { item: type[0].value });
  };

  const onChangeType = (typeInline) => {
    setType([typeInline]);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('materialmanagement')}
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
        {type && type[0] && type[0].value === 1 && panels && panels.length > 0 && !panelLoading && <View
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
            disabled={panelPage === 1}
            onPress={() => setCurrentPage(panelPage - 1)}
            style={{ marginHorizontal: 6, opacity: panelPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {panelPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={panelPage === panelTotalPages}
            onPress={() => setCurrentPage(panelPage + 1)}
            style={{ marginHorizontal: 6, opacity: panelPage === panelTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 2 && inverters && inverters.length > 0 && !inverterLoading && <View
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
            disabled={inverterPage === 1}
            onPress={() => setCurrentPage(inverterPage - 1)}
            style={{ marginHorizontal: 6, opacity: inverterPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {inverterPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={inverterPage === inverterTotalPages}
            onPress={() => setCurrentPage(inverterPage + 1)}
            style={{ marginHorizontal: 6, opacity: inverterPage === inverterTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 3 && batteries && batteries.length > 0 && !batteryLoading && <View
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
            disabled={batteryPage === 1}
            onPress={() => setCurrentPage(batteryPage - 1)}
            style={{ marginHorizontal: 6, opacity: batteryPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {batteryPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={batteryPage === batteryTotalPages}
            onPress={() => setCurrentPage(batteryPage + 1)}
            style={{ marginHorizontal: 6, opacity: batteryPage === batteryTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 4 && heatpumps && heatpumps.length > 0 && !heatpumpLoading && <View
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
            disabled={heatpumpPage === 1}
            onPress={() => setCurrentPage(heatpumpPage - 1)}
            style={{ marginHorizontal: 6, opacity: heatpumpPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {heatpumpPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={heatpumpPage === heatpumpTotalPages}
            onPress={() => setCurrentPage(heatpumpPage + 1)}
            style={{ marginHorizontal: 6, opacity: heatpumpPage === heatpumpTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 5 && constructions && constructions.length > 0 && !constructionLoading && <View
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
            disabled={constructionPage === 1}
            onPress={() => setCurrentPage(constructionPage - 1)}
            style={{ marginHorizontal: 6, opacity: constructionPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {constructionPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={constructionPage === constructionTotalPages}
            onPress={() => setCurrentPage(constructionPage + 1)}
            style={{ marginHorizontal: 6, opacity: constructionPage === constructionTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 6 && cables && cables.length > 0 && !cableLoading && <View
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
            disabled={cablePage === 1}
            onPress={() => setCurrentPage(cablePage - 1)}
            style={{ marginHorizontal: 6, opacity: cablePage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {cablePage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={cablePage === cableTotalPages}
            onPress={() => setCurrentPage(cablePage + 1)}
            style={{ marginHorizontal: 6, opacity: cablePage === cableTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}

        {type && type[0] && type[0].value === 7 && chargingstations && chargingstations.length > 0 && !chargingstationLoading && <View
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
            disabled={cablePage === 1}
            onPress={() => setCurrentPage(chargingstationPage - 1)}
            style={{ marginHorizontal: 6, opacity: chargingstationPage === 1 ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>‹ {t('prev')}</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={true}>
            <Text style={{ paddingVertical: 1.75, borderRadius: 8, width: 30, height: 25, textAlign: "center", color: BaseColor.whiteColor, backgroundColor: colors.primary, fontSize: 16 }}>
              {chargingstationPage}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={chargingstationPage === chargingstationTotalPages}
            onPress={() => setCurrentPage(chargingstationPage + 1)}
            style={{ marginHorizontal: 6, opacity: chargingstationPage === chargingstationTotalPages ? 0.4 : 1 }}
          >
            <Text style={{ paddingVertical: 2.5, borderRadius: 8, height: 25, textAlign: "center", color: colors.text, fontSize: 16 }}>{t('next')} ›</Text>
          </TouchableOpacity>
        </View>}
      </View>

      {(panelLoading || inverterLoading || batteryLoading || heatpumpLoading || cableLoading || chargingstationLoading || constructionLoading) && <ActivityIndicator color={colors.primary} size={"large"} style={{ flex: 1 }}></ActivityIndicator>}

      {type && type[0] && (type[0].value === 1 && !panelLoading && panels && panels.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 1 && !panelLoading && panels && panels.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={panels}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              maximumDCPower={item.maximumDCPower}
              width={item.width}
              height={item.length}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 2 && !inverterLoading && inverters && inverters.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 2 && !inverterLoading && inverters && inverters.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={inverters}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              nominalACPower={item.nominalACPower}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 3 && !batteryLoading && batteries && batteries.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 3 && !batteryLoading && batteries && batteries.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={batteries}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              technology={item.technology}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              nominalCapacity={item.nominalCapacity}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 4 && !heatpumpLoading && heatpumps && heatpumps.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 4 && !heatpumpLoading && heatpumps && heatpumps.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={heatpumps}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              structureType={item.structureType}
              nominalCapacity={item.nominalCapacity}
              cop={item.cop}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 5 && !constructionLoading && constructions && constructions.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 5 && !constructionLoading && constructions && constructions.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={constructions}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              panelOrientation={item.panelOrientation}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 6 && !cableLoading && cables && cables.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 6 && !cableLoading && cables && cables.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={cables}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}

      {type && type[0] && (type[0].value === 7 && !chargingstationLoading && chargingstations && chargingstations.length === 0) && <NotFound />}

      {type && type[0] && type[0].value === 7 && !chargingstationLoading && chargingstations && chargingstations.length > 0 &&
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={chargingstations}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <MaterialTicket
              title={item.model + " - " + item.series}
              manufacturer={item.manufacturer}
              status={!item.isDeleted ? "active" : "passive"}
              type={item.type}
              power={item.power}
              style={{
                marginVertical: 10,
              }}
            />
          )}
        />}
    </SafeAreaView>
  );
};

export default PMaterial;
