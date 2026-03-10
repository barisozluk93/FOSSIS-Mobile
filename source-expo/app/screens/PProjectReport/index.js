import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useTranslation } from "react-i18next";
import { LineChart } from "react-native-chart-kit";
import { BarChart } from "react-native-gifted-charts";
import { Header, Icon, SafeAreaView, PickerSelect, Text } from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import styles from "./styles";
import { getPvCalcRequest, getSeriesCalcRequest } from "@/apis/projectApi";

const screenWidth = Dimensions.get("window").width;
const CARD_HORIZONTAL_MARGIN = 16;
const CARD_WIDTH = screenWidth - CARD_HORIZONTAL_MARGIN * 2;

const SERIES_COLORS = {
  production: BaseColor.greenColor,
  clippedEnergy: BaseColor.blueColor,
  consumption: BaseColor.pinkDarkColor,
  selfConsumption: BaseColor.pinkColor,
  systemCapacity: BaseColor.orangeColor,
};

const PProjectReport = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const [item, setItem] = useState(route?.params?.item || {});
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [systemPower, setSystemPower] = useState(null);

  const [selectedMonthId, setSelectedMonthId] = useState(0);

  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [dailyLoading, setDailyLoading] = useState(false);

  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route.params.item);
    }
  }, [route?.params?.item]);

  useEffect(() => {
    if (!item) return;

    const locationText = String(item?.location || "");
    const parts = locationText.split(",").map((x) => x.trim());

    if (parts.length >= 2) {
      const parsedLat = parseFloat(parts[0]);
      const parsedLon = parseFloat(parts[1]);

      if (!Number.isNaN(parsedLat) && !Number.isNaN(parsedLon)) {
        setLat(parsedLat);
        setLon(parsedLon);
      }
    }

    setSystemPower(Number(item?.systemPower || 0));
  }, [item]);

  const monthsInTurkish = useMemo(
    () => ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
    []
  );

  const monthsInEnglish = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  const monthOptions = useMemo(
    () => [
      { key: 0, name: i18n.language === "tr" ? "Ay Seçiniz" : "Select Month" },
      { key: 1, name: i18n.language === "tr" ? "Ocak" : "January" },
      { key: 2, name: i18n.language === "tr" ? "Şubat" : "February" },
      { key: 3, name: i18n.language === "tr" ? "Mart" : "March" },
      { key: 4, name: i18n.language === "tr" ? "Nisan" : "April" },
      { key: 5, name: i18n.language === "tr" ? "Mayıs" : "May" },
      { key: 6, name: i18n.language === "tr" ? "Haziran" : "June" },
      { key: 7, name: i18n.language === "tr" ? "Temmuz" : "July" },
      { key: 8, name: i18n.language === "tr" ? "Ağustos" : "August" },
      { key: 9, name: i18n.language === "tr" ? "Eylül" : "September" },
      { key: 10, name: i18n.language === "tr" ? "Ekim" : "October" },
      { key: 11, name: i18n.language === "tr" ? "Kasım" : "November" },
      { key: 12, name: i18n.language === "tr" ? "Aralık" : "December" },
    ],
    [i18n.language]
  );

  const monthsShort = useMemo(() => {
    return i18n.language === "tr" ? monthsInTurkish : monthsInEnglish;
  }, [i18n.language, monthsInEnglish, monthsInTurkish]);

  const chartConfig = useMemo(
    () => ({
      backgroundGradientFrom: colors.background,
      backgroundGradientTo: colors.background,
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(120, 120, 120, ${opacity})`,
      propsForDots: {
        r: "2.5",
        strokeWidth: "1",
        stroke: colors.border,
      },
      propsForBackgroundLines: {
        strokeDasharray: "",
        stroke: colors.border,
      },
      propsForLabels: {
        fontSize: 9,
      },
      style: {
        borderRadius: 12,
      },
    }),
    [colors.background, colors.border]
  );

  const fetchMonthlyData = useCallback(async () => {
    if (lat == null || lon == null || !systemPower) return;

    try {
      setMonthlyLoading(true);

      const params = {
        lat: Number(lat),
        lon: Number(lon),
        peakpower: Number(systemPower),
        loss: 14,
        outputformat: "json",
        usehorizon: 1,
      };

      const result = await getPvCalcRequest(params);

      if (result?.isSuccess) {
        setMonthlyData(Array.isArray(result.data) ? result.data : []);
      } else {
        setMonthlyData([]);
      }
    } catch (error) {
      setMonthlyData([]);
    } finally {
      setMonthlyLoading(false);
    }
  }, [lat, lon, systemPower]);

  const fetchDailyData = useCallback(
    async (monthId) => {
      if (lat == null || lon == null || !systemPower || !monthId || monthId <= 0) {
        setDailyData([]);
        return;
      }

      try {
        setDailyLoading(true);

        const params = {
          lat: Number(lat),
          lon: Number(lon),
          startyear: 2010,
          endyear: 2020,
          pvcalculation: 1,
          peakpower: Number(systemPower),
          loss: 14,
          outputformat: "json",
          usehorizon: 1,
          mountNumber: monthId,
        };

        const result = await getSeriesCalcRequest(params);
        if (result?.isSuccess) {
          setDailyData(Array.isArray(result.data) ? result.data : []);
        } else {
          setDailyData([]);
        }
      } catch (error) {
        setDailyData([]);
      } finally {
        setDailyLoading(false);
      }
    },
    [lat, lon, systemPower]
  );

  useEffect(() => {
    fetchMonthlyData();
  }, [fetchMonthlyData]);

  const onMonthChange = useCallback(
    (value) => {
      const monthId = Number(value?.key || 0);
      setSelectedMonthId(monthId);
      fetchDailyData(monthId);
    },
    [fetchDailyData]
  );

  const monthlyStackData = useMemo(() => {
    return monthsShort.map((monthLabel, index) => {
      const source = monthlyData[index] || {};

      return {
        label: monthLabel,
        stacks: [
          {
            value: Number(source?.productionkWh || 0),
            color: SERIES_COLORS.production,
          },
          {
            value: Number(source?.clippedEnergy || 0),
            color: SERIES_COLORS.clippedEnergy,
          },
          {
            value: Number(source?.consumption || 0),
            color: SERIES_COLORS.consumption,
          },
          {
            value: Number(source?.selfConsumption || 0),
            color: SERIES_COLORS.selfConsumption,
          },
        ],
      };
    });
  }, [monthlyData, monthsShort]);

  const maxMonthlyValue = useMemo(() => {
    const values = monthlyData.flatMap((x) => [
      Number(x?.productionkWh || 0),
      Number(x?.clippedEnergy || 0),
      Number(x?.consumption || 0),
      Number(x?.selfConsumption || 0),
    ]);

    const max = Math.max(...values, 0);
    return max > 0 ? max : 10;
  }, [monthlyData]);

  const dailyChartData = useMemo(() => {
    const fullLabels = dailyData.map((x) => `${x?.hour}:00`);

    const labels = fullLabels.map((label, index) => {
      const step =
        fullLabels.length > 20 ? 4 : fullLabels.length > 14 ? 3 : fullLabels.length > 10 ? 2 : 1;
      return index % step === 0 ? label : "";
    });

    const production = dailyData.map((x) => Number(x?.pvSystemPowerW || 0));
    const consumption = dailyData.map((x) => Number(x?.consumption || 0));
    const systemCapacity = dailyData.map((x) => Number(x?.systemCapacity || 0));
    const clippedEnergy = dailyData.map((x) => Number(x?.clippedEnergy || 0));

    return {
      labels: labels.length ? labels : [""],
      datasets: [
        {
          data: production.length ? production : [0],
          color: () => SERIES_COLORS.production,
          strokeWidth: 2,
        },
        {
          data: consumption.length ? consumption : [0],
          color: () => SERIES_COLORS.consumption,
          strokeWidth: 2,
        },
        {
          data: systemCapacity.length ? systemCapacity : [0],
          color: () => SERIES_COLORS.systemCapacity,
          strokeWidth: 2,
        },
        {
          data: clippedEnergy.length ? clippedEnergy : [0],
          color: () => SERIES_COLORS.clippedEnergy,
          strokeWidth: 2,
        },
      ],
    };
  }, [dailyData]);

  const chartPages = useMemo(
    () => [
      {
        id: "monthly",
        title: i18n.language === "tr" ? "Aylık Üretim Analizi" : "Monthly Yield Analysis",
      },
      {
        id: "daily",
        title: i18n.language === "tr" ? "Aylık Günlük Detay" : "Monthly Daily Detail",
      },
    ],
    [i18n.language]
  );

  const monthlyLegendItems = useMemo(
    () => [
      {
        label: i18n.language === "tr" ? "Üretim kWh" : "Production kWh",
        color: SERIES_COLORS.production,
      },
      {
        label: i18n.language === "tr" ? "Kırpılmış Enerji" : "Clipped Energy",
        color: SERIES_COLORS.clippedEnergy,
      },
      {
        label: i18n.language === "tr" ? "Tüketim" : "Consumption",
        color: SERIES_COLORS.consumption,
      },
      {
        label: i18n.language === "tr" ? "Öz Tüketim" : "Self Consumption",
        color: SERIES_COLORS.selfConsumption,
      },
    ],
    [i18n.language]
  );

  const dailyLegendItems = useMemo(
    () => [
      {
        label: i18n.language === "tr" ? "Üretim kWh" : "Production kWh",
        color: SERIES_COLORS.production,
      },
      {
        label: i18n.language === "tr" ? "Tüketim" : "Consumption",
        color: SERIES_COLORS.consumption,
      },
      {
        label: i18n.language === "tr" ? "Sistem Kapasitesi" : "System Capacity",
        color: SERIES_COLORS.systemCapacity,
      },
      {
        label: i18n.language === "tr" ? "Kırpılmış Enerji" : "Clipped Energy",
        color: SERIES_COLORS.clippedEnergy,
      },
    ],
    [i18n.language]
  );

  const renderLegend = (items) => {
    return (
      <View style={styles.legendContainer}>
        {items.map((legendItem, index) => (
          <View key={`${legendItem.label}-${index}`} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: legendItem.color },
              ]}
            />
            <Text style={[styles.legendText, { color: colors.text }]}>
              {legendItem.label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderMonthlyBarChart = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.barChartWrapper}>
          <BarChart
            stackData={monthlyStackData}
            width={Math.max(CARD_WIDTH - 24, monthlyStackData.length * 42)}
            height={280}
            barWidth={22}
            spacing={18}
            initialSpacing={10}
            endSpacing={10}
            noOfSections={5}
            maxValue={maxMonthlyValue}
            yAxisThickness={1}
            xAxisThickness={1}
            yAxisColor={colors.border}
            xAxisColor={colors.border}
            rulesColor={colors.border}
            yAxisTextStyle={{ color: colors.text, fontSize: 10 }}
            xAxisLabelTextStyle={{ color: colors.text, fontSize: 10 }}
            hideRules={false}
            showVerticalLines={false}
            disablePress
            isAnimated
            showGradient={false}
            barBorderRadius={4}
          />
        </View>
      </ScrollView>
    );
  };

  const renderChartCard = ({ item: page }) => {
    if (page.id === "monthly") {
      return (
        <View
          style={[
            styles.card,
            {
              width: CARD_WIDTH,
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderWidth: StyleSheet.hairlineWidth,
            },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {page.title}
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: colors.text }]}>
              {t("longitude")} : {lon ?? "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: colors.text }]}>
              {t("latitude")} : {lat ?? "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: colors.text }]}>
              {i18n.language === "tr" ? "Sistem Gücü" : "System Power"} : {systemPower ?? "-"} kWp
            </Text>
          </View>

          {monthlyLoading ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <View style={styles.chartSection}>
              {renderMonthlyBarChart()}
              {renderLegend(monthlyLegendItems)}
            </View>
          )}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.card,
          {
            width: CARD_WIDTH,
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {page.title}
        </Text>

        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {t("longitude")} : {lon ?? "-"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {t("latitude")} : {lat ?? "-"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {i18n.language === "tr" ? "Sistem Gücü" : "System Power"} : {systemPower ?? "-"} kWp
          </Text>
        </View>

        <PickerSelect
          label={i18n.language === "tr" ? "Ay Seçiniz" : "Select Month"}
          value={monthOptions.find((x) => x.key === selectedMonthId)}
          onChange={onMonthChange}
          options={monthOptions}
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.primary,
            marginBottom: 12,
          }}
        />

        {selectedMonthId <= 0 ? (
          <View style={styles.emptyBox}>
            <Text style={{ color: colors.text }}>
              {i18n.language === "tr"
                ? "Saatlik grafik için bir ay seçin."
                : "Select a month to load the hourly chart."}
            </Text>
          </View>
        ) : dailyLoading ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.chartSection}>
            <LineChart
              data={dailyChartData}
              width={CARD_WIDTH - 24}
              height={320}
              chartConfig={chartConfig}
              bezier={false}
              withInnerLines
              withOuterLines
              withShadow={false}
              fromZero
              verticalLabelRotation={-50}
              xLabelsOffset={-8}
              yLabelsOffset={8}
              style={[styles.chart, styles.dailyChart]}
            />
            {renderLegend(dailyLegendItems)}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("get_report")}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL
            />
          );
        }}
        onPressLeft={() => {
          navigation.setParams({ item: item });
          navigation.goBack();
        }}
      />

      <View style={{ flex: 1, backgroundColor: colors.card }}>
        <View style={styles.topInfoContainer}>
          <Text style={[styles.projectName, { color: colors.text }]}>
            {item?.name || "-"}
          </Text>
        </View>

        <FlatList
          data={chartPages}
          keyExtractor={(listItem) => listItem.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 12}
          snapToAlignment="start"
          contentContainerStyle={styles.listContent}
          renderItem={renderChartCard}
        />
      </View>
    </SafeAreaView>
  );
};

export default PProjectReport;