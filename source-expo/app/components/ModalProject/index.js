import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Mapbox from '@rnmapbox/maps';
import { BaseColor, useTheme } from '@/config';
import { Button, PickerSelect, TabTag, TextInput } from '@/components';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';
import Header from '../Header/Header';
import { heightTabView } from '@/utils';
import { useSelector } from 'react-redux';
import { editRequest, saveRequest } from '@/apis/projectApi';
import Toast from 'react-native-toast-message';
import { allPanelsRequest } from '@/apis/materialApi';
import { isNullOrEmpty } from '@/utils/utility';

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

const DEFAULT_CENTER = [28.9741, 41.0256];

const successMainInit = {
  name: true,
  location: true,
};

const successPlanningInit = {
  gridSpace: true,
  margin: true,
  panelId: true,
};

const ModalProject = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;

  const {
    project = {},
    isVisible = false,
    isProccessSuccess,
    roofCancelResetKey,
    navigation,
    onPress,
    onTabChange,
    onClose,
    isMulti = false,
    ...attrs
  } = props;

  const { user } = useSelector((state) => state.user);

  const roofCameraRef = useRef(null);
  const lastLoadKeyRef = useRef('');
  const pendingTabAfterReloadRef = useRef(null);

  const [id, setId] = useState(project?.id || 0);
  const [buildingId, setBuildingId] = useState(project?.buildingId || '');
  const [location, setLocation] = useState(project?.location || '');
  const [name, setName] = useState(project?.name || '');
  const [gridSpace, setGridSpace] = useState(project?.gridSpace ?? 0);
  const [margin, setMargin] = useState(project?.margin ?? 0);
  const [panels, setPanels] = useState([]);
  const [panel, setPanel] = useState(undefined);
  const [panelId, setPanelId] = useState(project?.panelId || undefined);
  const [systemPower, setSystemPower] = useState(project?.systemPower ?? 0);
  const [numberOfSufficientPanel, setNumberOfSufficientPanel] = useState(0);
  const [header, setHeader] = useState(
    Number(project?.id) > 0 ? t('edit_project') : t('create_project')
  );
  const [successMain, setSuccessMain] = useState(successMainInit);
  const [successPlanning, setSuccessPlanning] = useState(successPlanningInit);
  const [tab, setTab] = useState({
    id: 'main_info',
    title: t('main_infos'),
    disabled: false,
  });

  const tabs = useMemo(() => {
    const hasProjectId =
      Number(project?.id) > 0 &&
      !isNullOrEmpty(name) &&
      !isNullOrEmpty(location);

    const hasRoofArea =
      project?.roofArea !== undefined && project?.roofArea !== null;

    return [
      {
        id: 'main_info',
        title: t('main_infos'),
        disabled: false,
      },
      {
        id: 'roof_style',
        title: t('roof_style'),
        disabled: !hasProjectId,
      },
      {
        id: 'planning',
        title: t('planning'),
        disabled: !(hasProjectId && hasRoofArea),
      },
    ];
  }, [project?.id, project?.roofArea, name, location, t]);

  const getReport = () => {
    const nextProject = {
      ...(project || {}),
      panelId,
      gridSpace: Number(gridSpace || 0),
      margin: Number(margin || 0),
      systemPower,
    };

    onClose?.();
    navigation.navigate('PProjectReport', { item: nextProject });
  };

  useEffect(() => {
    const activeTab = tabs.find((item) => item.id === tab?.id);

    if (!activeTab || activeTab.disabled) {
      setTab(tabs[0]);
    }
  }, [tabs, tab]);

  useEffect(() => {
    if (!isVisible) return;

    const loadKey = JSON.stringify({
      id: project?.id || 0,
      buildingId: project?.buildingId || '',
      location: project?.location || '',
      name: project?.name || '',
      panelId: project?.panelId || '',
      gridSpace: project?.gridSpace ?? 0,
      margin: project?.margin ?? 0,
      systemPower: project?.systemPower ?? 0,
      roofArea: project?.roofArea ?? 0,
      roofWkt: project?.roofWkt || '',
    });

    if (lastLoadKeyRef.current === loadKey) return;
    lastLoadKeyRef.current = loadKey;

    setHeader(
      Number(project?.id) > 0 ? t('edit_project') : t('create_project')
    );

    setId(project?.id || 0);
    setBuildingId(project?.buildingId || '');
    setLocation(project?.location || '');
    setName(project?.name || '');
    setPanelId(project?.panelId || undefined);
    setGridSpace(project?.gridSpace ?? 0);
    setMargin(project?.margin ?? 0);
    setSystemPower(project?.systemPower ?? 0);

    setSuccessMain(successMainInit);
    setSuccessPlanning(successPlanningInit);

    if (pendingTabAfterReloadRef.current) {
      const nextTab = tabs.find(
        (x) => x.id === pendingTabAfterReloadRef.current && !x.disabled
      );

      if (nextTab) {
        setTab(nextTab);
      }

      pendingTabAfterReloadRef.current = null;
    }
  }, [
    isVisible,
    project?.id,
    project?.buildingId,
    project?.location,
    project?.name,
    project?.panelId,
    project?.gridSpace,
    project?.margin,
    project?.systemPower,
    project?.roofArea,
    project?.roofWkt,
    tabs,
    t,
  ]);

  useEffect(() => {
    if (!roofCancelResetKey) return;
    if (Number(project?.roofArea || 0) > 0) return;

    const mainInfoTab = tabs.find((x) => x.id === 'main_info') || tabs[0];
    setTab(mainInfoTab);
  }, [roofCancelResetKey, project?.roofArea, tabs]);

  useEffect(() => {
    allPanelsRequest()
      .then((result) => {
        if (result.isSuccess) {
          const temp = result.data.map((item) => ({
            key: item.id,
            name: `${item.model} - ${item.series}`,
            length: item.length,
            width: item.width,
            maximumDCPower: item.maximumDCPower,
          }));

          temp.unshift({
            key: undefined,
            name: t('select'),
          });

          setPanels(temp);

          const selectedPanelId = project?.panelId || panelId;
          const selectedPanel = temp.find(
            (f) => String(f.key) === String(selectedPanelId)
          );

          setPanel(selectedPanel);
        } else {
          setPanels([]);
          setPanel(undefined);
        }
      })
      .catch(() => {
        setPanels([]);
        setPanel(undefined);
      });
  }, [project?.panelId, panelId, t]);

  const onChangeTab = (tabData) => {
    if (tabData?.disabled) return;

    setTab(tabData);

    if (!(tabData?.id === 'roof_style' && Number(project?.roofArea) > 0)) {
      onTabChange?.(tabData);
    }
  };

  const parseRoofGeom = (roofGeomValue) => {
    if (!roofGeomValue) return null;

    if (typeof roofGeomValue === 'string') {
      try {
        return JSON.parse(roofGeomValue);
      } catch {
        return null;
      }
    }

    return roofGeomValue;
  };

  const polygonToPoints = (polygon) => {
    const coords = polygon?.coordinates?.[0];
    if (!Array.isArray(coords) || coords.length < 4) return null;

    const cleaned = [...coords];
    const first = cleaned[0];
    const last = cleaned[cleaned.length - 1];

    if (first && last && first[0] === last[0] && first[1] === last[1]) {
      cleaned.pop();
    }

    if (cleaned.length < 3) return null;

    return cleaned;
  };

  const calculatePolygonAreaMeters = (points) => {
    if (!points || points.length < 3) return 0;

    const coords = [...points, points[0]];
    const lat0 = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    const meterPerDegLat = 111320;
    const meterPerDegLng = 111320 * Math.cos((lat0 * Math.PI) / 180);

    const planar = coords.map(([lngValue, latValue]) => ({
      x: lngValue * meterPerDegLng,
      y: latValue * meterPerDegLat,
    }));

    let area = 0;
    for (let i = 0; i < planar.length - 1; i += 1) {
      area += planar[i].x * planar[i + 1].y - planar[i + 1].x * planar[i].y;
    }

    return Math.abs(area) / 2;
  };

  const getPolygonOrientation = (points) => {
    let sum = 0;
    for (let i = 0; i < points.length; i += 1) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[(i + 1) % points.length];
      sum += (x2 - x1) * (y2 + y1);
    }
    return sum > 0 ? 'clockwise' : 'counterclockwise';
  };

  const lineIntersection = (p1, p2, p3, p4) => {
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const x3 = p3.x;
    const y3 = p3.y;
    const x4 = p4.x;
    const y4 = p4.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(denom) < 1e-9) {
      return { x: p2.x, y: p2.y };
    }

    const px =
      ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
      denom;

    const py =
      ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
      denom;

    return { x: px, y: py };
  };

  const offsetPolygonInMeters = (points, offsetMeters) => {
    if (!points || points.length < 3) return null;

    const lat0 = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    const meterPerDegLat = 111320;
    const meterPerDegLng = 111320 * Math.cos((lat0 * Math.PI) / 180);

    const toMeters = ([lng, lat]) => ({
      x: lng * meterPerDegLng,
      y: lat * meterPerDegLat,
    });

    const toLngLat = ({ x, y }) => [x / meterPerDegLng, y / meterPerDegLat];

    const ring = points.map(toMeters);
    const orientation = getPolygonOrientation(points);
    const sign = orientation === 'clockwise' ? -1 : 1;

    const shiftedLines = [];

    for (let i = 0; i < ring.length; i += 1) {
      const p1 = ring[i];
      const p2 = ring[(i + 1) % ring.length];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy);

      if (len === 0) continue;

      const inwardNormal = {
        x: sign * (-dy / len),
        y: sign * (dx / len),
      };

      shiftedLines.push({
        a: {
          x: p1.x + inwardNormal.x * offsetMeters,
          y: p1.y + inwardNormal.y * offsetMeters,
        },
        b: {
          x: p2.x + inwardNormal.x * offsetMeters,
          y: p2.y + inwardNormal.y * offsetMeters,
        },
      });
    }

    if (shiftedLines.length < 3) return null;

    const result = [];
    for (let i = 0; i < shiftedLines.length; i += 1) {
      const prev =
        shiftedLines[(i - 1 + shiftedLines.length) % shiftedLines.length];
      const curr = shiftedLines[i];
      result.push(lineIntersection(prev.a, prev.b, curr.a, curr.b));
    }

    if (result.length < 3) return null;

    const lngLatResult = result.map(toLngLat);
    const area = calculatePolygonAreaMeters(lngLatResult);

    if (!Number.isFinite(area) || area <= 0) return null;

    return {
      type: 'Polygon',
      coordinates: [[...lngLatResult, lngLatResult[0]]],
    };
  };

  useEffect(() => {
    if (!panel) {
      setNumberOfSufficientPanel(0);
      setSystemPower(0);
      return;
    }

    const roofGeom = parseRoofGeom(project?.roofGeom);
    const roofPoints = polygonToPoints(roofGeom);

    let area = Number(project?.roofArea || 0);

    const marginNumber = Number(margin || 0);
    const gridSpaceNumber = Number(gridSpace || 0);

    if (roofPoints && marginNumber > 0) {
      const offsetGeom = offsetPolygonInMeters(roofPoints, -marginNumber);
      if (offsetGeom?.coordinates?.[0]) {
        const offsetPoints = polygonToPoints(offsetGeom);
        const calculatedArea = calculatePolygonAreaMeters(offsetPoints);
        if (calculatedArea > 0) {
          area = calculatedArea;
        }
      }
    }

    if (!area || area <= 0) {
      setNumberOfSufficientPanel(0);
      setSystemPower(0);
      return;
    }

    const panelLengthM = Number(panel.length || 0) / 100;
    const panelWidthM = Number(panel.width || 0) / 100;
    const panelArea = panelLengthM * panelWidthM;

    if (panelArea <= 0) {
      setNumberOfSufficientPanel(0);
      setSystemPower(0);
      return;
    }

    let count = 0;

    if (gridSpaceNumber > 0) {
      if (panel.length === panel.width) {
        const effectiveArea = Math.pow(
          Math.sqrt(panelArea) + gridSpaceNumber / 100,
          2
        );
        count = Math.floor(area / effectiveArea);
      } else {
        const lengthWithGap = panelLengthM + gridSpaceNumber / 100;
        const widthWithGap = panelWidthM + gridSpaceNumber / 100;
        const effectiveArea = lengthWithGap * widthWithGap;
        count = Math.floor(area / effectiveArea);
      }
    } else {
      count = Math.floor(area / panelArea);
    }

    const power = (count * Number(panel.maximumDCPower || 0)) / 1000;

    setNumberOfSufficientPanel(count);
    setSystemPower(power);
  }, [panel, margin, gridSpace, project?.roofGeom, project?.roofArea]);

  const submit = () => {
    pendingTabAfterReloadRef.current = tab.id;

    if (tab.id === 'main_info') {
      if (isNullOrEmpty(name) || isNullOrEmpty(location)) {
        setSuccessMain({
          ...successMain,
          name: !isNullOrEmpty(name),
          location: !isNullOrEmpty(location),
        });
        return;
      }

      const data = {
        id,
        isDeleted: false,
        userId: user.id,
        name,
        buildingId: Number(buildingId),
        location,
      };

      saveRequest(data)
        .then((result) => {
          if (result.isSuccess) {
            Toast.show({
              type: 'success',
              text1: t('success'),
              text2: t('success_message'),
            });

            isProccessSuccess?.(result.data.id);
          } else {
            Toast.show({
              type: 'error',
              text1: t('error'),
              text2: result?.message || t('pw_didnt_match_message'),
            });
          }
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: t('error'),
            text2: err?.message || t('pw_didnt_match_message'),
          });
        });

      return;
    }

    if (tab.id === 'planning') {
      if (
        isNullOrEmpty(panelId) ||
        isNullOrEmpty(gridSpace) ||
        isNullOrEmpty(margin)
      ) {
        setSuccessPlanning({
          ...successPlanning,
          panelId: !isNullOrEmpty(panelId),
          gridSpace: !isNullOrEmpty(gridSpace),
          margin: !isNullOrEmpty(margin),
        });
        return;
      }
    } else {
      if (isNullOrEmpty(project?.roofArea) || isNullOrEmpty(project?.roofWkt)) {
        return;
      }
    }

    const payload = {
      ...(project || {}),
      panelId,
      gridSpace: Number(gridSpace || 0),
      margin: Number(margin || 0),
      systemPower,
      panel: undefined,
    };

    editRequest(payload)
      .then((result) => {
        if (result.isSuccess) {
          Toast.show({
            type: 'success',
            text1: t('success'),
            text2: t('success_message'),
          });

          isProccessSuccess?.(result.data.id);
        } else {
          Toast.show({
            type: 'error',
            text1: t('error'),
            text2: result?.message || t('pw_didnt_match_message'),
          });
        }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: error?.message || t('pw_didnt_match_message'),
        });
      });
  };

  const parsePolygonWkt = (wktText) => {
    if (!wktText || typeof wktText !== 'string') return null;

    const normalized = wktText.trim();
    const match = normalized.match(/^POLYGON\s*\(\((.+)\)\)$/i);

    if (!match?.[1]) return null;

    try {
      const coordinates = match[1]
        .split(',')
        .map((pair) => pair.trim())
        .map((pair) => {
          const [lng, lat] = pair.split(/\s+/).map(Number);
          return [lng, lat];
        })
        .filter(
          (coord) =>
            Array.isArray(coord) &&
            coord.length === 2 &&
            Number.isFinite(coord[0]) &&
            Number.isFinite(coord[1])
        );

      if (coordinates.length < 4) return null;

      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates],
            },
          },
        ],
      };
    } catch {
      return null;
    }
  };

  const getBoundsFromPolygon = (shape) => {
    const coordinates = shape?.features?.[0]?.geometry?.coordinates?.[0];
    if (!coordinates?.length) return null;

    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;

    coordinates.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
    });

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  };

  const getCenterFromBounds = (bounds) => {
    if (!bounds) return DEFAULT_CENTER;

    return [
      (bounds[0][0] + bounds[1][0]) / 2,
      (bounds[0][1] + bounds[1][1]) / 2,
    ];
  };

  const roofPolygonShape = useMemo(() => {
    return parsePolygonWkt(project?.roofWkt);
  }, [project?.roofWkt]);

  const roofPolygonBounds = useMemo(() => {
    return getBoundsFromPolygon(roofPolygonShape);
  }, [roofPolygonShape]);

  const roofPolygonCenter = useMemo(() => {
    return getCenterFromBounds(roofPolygonBounds);
  }, [roofPolygonBounds]);

  useEffect(() => {
    if (tab.id !== 'roof_style') return;
    if (!roofPolygonBounds) return;
    if (!roofCameraRef.current) return;
    if (!isVisible) return;

    const timer = setTimeout(() => {
      roofCameraRef.current?.fitBounds(
        roofPolygonBounds[0],
        roofPolygonBounds[1],
        40,
        800
      );
    }, 150);

    return () => clearTimeout(timer);
  }, [roofPolygonBounds, tab.id, isVisible]);

  const changeRoof = () => {
    const roofTab = tabs.find((x) => x.id === 'roof_style');
    if (roofTab) {
      setTab(roofTab);
    }

    onTabChange?.({
      id: 'roof_style',
      title: 'roof_style',
      disabled: false,
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.bottomModal}
      hasBackdrop={false}
      avoidKeyboard
      useNativeDriver={false}
      hideModalContentWhileAnimating={false}
      statusBarTranslucent
      {...attrs}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}
        >
          <Header
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
            }}
            title={header}
            renderLeft={() => (
              <Icon
                name="arrow-left"
                size={20}
                color={colors.primary}
                enableRTL
              />
            )}
            onPressLeft={() => navigation.goBack()}
          />

          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{
              height:
                Platform.OS === 'ios'
                  ? heightTabView() - 400
                  : heightTabView() - 600,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.border,
                height: 40,
                marginBottom: 10,
              }}
            >
              <TabTag tabs={tabs} tab={tab} onChange={onChangeTab} />
            </View>

            {tab.id === 'main_info' && (
              <>
                <Text
                  style={{
                    color: colors.text,
                    marginBottom: 6,
                    fontWeight: '600',
                  }}
                >
                  {t('name')}
                </Text>

                <TextInput
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.primary,
                    marginBottom: 10,
                  }}
                  onChangeText={setName}
                  autoCorrect={false}
                  placeholder={t('name')}
                  placeholderTextColor={
                    successMain.name ? BaseColor.grayColor : colors.primary
                  }
                  value={name}
                />

                <Text
                  style={{
                    color: colors.text,
                    marginBottom: 6,
                    fontWeight: '600',
                  }}
                >
                  {t('location')}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.primary,
                    borderRadius: 5,
                    minHeight: 46,
                    marginBottom: 10,
                    backgroundColor: colors.card,
                    overflow: 'hidden',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={{
                        borderWidth: 0,
                        marginBottom: 0,
                        backgroundColor: 'transparent',
                      }}
                      value={location}
                      editable={false}
                      placeholder={t('location')}
                      placeholderTextColor={
                        successMain.location
                          ? BaseColor.grayColor
                          : colors.primary
                      }
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      onPress?.({
                        ...(project || {}),
                        id,
                        name,
                        buildingId,
                        location,
                      });
                    }}
                    style={{
                      width: 46,
                      height: 46,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderLeftWidth: StyleSheet.hairlineWidth,
                      borderLeftColor: colors.primary,
                      backgroundColor: colors.primary,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                  >
                    <Icon name="map-marker-alt" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {tab.id === 'roof_style' && Number(project?.roofArea) > 0 && (
              <View style={{ paddingVertical: 12 }}>
                <Text
                  title
                  style={{
                    color: colors.text,
                    fontWeight: '600',
                    marginBottom: 10,
                  }}
                >
                  {t('roof_area')} : {Number(project?.roofArea || 0).toFixed(2)} m²
                </Text>

                <View
                  style={{
                    height: 260,
                    borderRadius: 12,
                    overflow: 'hidden',
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  }}
                >
                  <Mapbox.MapView
                    style={{ flex: 1 }}
                    styleJSON={JSON.stringify(EMPTY_STYLE)}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    compassEnabled={false}
                    logoEnabled={false}
                  >
                    <Mapbox.Camera
                      ref={roofCameraRef}
                      centerCoordinate={roofPolygonCenter}
                      zoomLevel={18}
                      animationMode="flyTo"
                    />

                    <Mapbox.RasterSource
                      id="roof-osm-source"
                      tileUrlTemplates={[
                        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      ]}
                      tileSize={256}
                      maxZoomLevel={19}
                    >
                      <Mapbox.RasterLayer
                        id="roof-osm-layer"
                        sourceID="roof-osm-source"
                      />
                    </Mapbox.RasterSource>

                    {roofPolygonShape && (
                      <Mapbox.ShapeSource
                        id="roof-roof-shape-source"
                        shape={roofPolygonShape}
                      >
                        <Mapbox.FillLayer
                          id="roof-roof-fill-layer"
                          style={{
                            fillColor: BaseColor.blueColor,
                            fillOpacity: 1,
                          }}
                        />
                        <Mapbox.LineLayer
                          id="roof-roof-line-layer"
                          style={{
                            lineColor: BaseColor.blueColor,
                            lineWidth: 5,
                          }}
                        />
                      </Mapbox.ShapeSource>
                    )}
                  </Mapbox.MapView>
                </View>
              </View>
            )}

            {tab.id === 'planning' && (
              <>
                {panels?.length > 0 && (
                  <PickerSelect
                    style={{
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: colors.primary,
                    }}
                    label={t('panels')}
                    value={panel}
                    onChange={(v) => {
                      setPanel(v);
                      setPanelId(v?.key);
                    }}
                    placeholderTextColor={
                      successPlanning.panelId
                        ? BaseColor.grayColor
                        : colors.primary
                    }
                    options={panels}
                  />
                )}

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text
                      style={{
                        color: colors.text,
                        marginTop: 10,
                        marginBottom: 6,
                        fontWeight: '600',
                      }}
                    >
                      {t('gridspace')}
                    </Text>

                    <TextInput
                      style={[
                        styles.textInputName,
                        {
                          borderWidth: StyleSheet.hairlineWidth,
                          borderColor: colors.primary,
                          marginTop: 0,
                          marginRight: 0,
                        },
                      ]}
                      onChangeText={setGridSpace}
                      autoCorrect={false}
                      placeholder={t('gridspace')}
                      placeholderTextColor={
                        successPlanning.gridSpace
                          ? BaseColor.grayColor
                          : colors.primary
                      }
                      value={String(gridSpace ?? '')}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.text,
                        marginTop: 10,
                        marginBottom: 6,
                        fontWeight: '600',
                      }}
                    >
                      {t('margin')}
                    </Text>

                    <TextInput
                      style={[
                        styles.textInputName,
                        {
                          borderWidth: StyleSheet.hairlineWidth,
                          borderColor: colors.primary,
                          marginTop: 0,
                        },
                      ]}
                      onChangeText={setMargin}
                      autoCorrect={false}
                      placeholder={t('margin')}
                      placeholderTextColor={
                        successPlanning.margin
                          ? BaseColor.grayColor
                          : colors.primary
                      }
                      value={String(margin ?? '')}
                    />
                  </View>
                </View>

                {panelId && !isNullOrEmpty(panelId) && !isNaN(panelId) && (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <Text
                        style={{
                          color: colors.text,
                          marginTop: 10,
                          marginBottom: 6,
                          fontWeight: '600',
                        }}
                      >
                        {t('numberOfSufficientPanel')}
                      </Text>

                      <TextInput
                        style={[
                          styles.textInputName,
                          {
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: colors.primary,
                            marginTop: 0,
                            marginRight: 0,
                          },
                        ]}
                        disabled
                        autoCorrect={false}
                        placeholder={t('numberOfSufficientPanel')}
                        placeholderTextColor={BaseColor.grayColor}
                        value={String(numberOfSufficientPanel ?? '')}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: colors.text,
                          marginTop: 10,
                          marginBottom: 6,
                          fontWeight: '600',
                        }}
                      >
                        {t('systemPower')}
                      </Text>

                      <TextInput
                        style={[
                          styles.textInputName,
                          {
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: colors.primary,
                            marginTop: 0,
                          },
                        ]}
                        disabled
                        autoCorrect={false}
                        placeholder={t('systemPower')}
                        placeholderTextColor={BaseColor.grayColor}
                        value={String(systemPower ?? '')}
                      />
                    </View>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <View
            style={{
              paddingVertical: 15,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: colors.border,
              flexDirection: 'row',
            }}
          >
            {tab?.id === 'roof_style' && project?.roofArea ? (
              <Button
                style={{
                  flex: 1,
                  width: '48.5%',
                  height: 45,
                  marginTop: 15,
                  marginRight: 10,
                  backgroundColor: colors.background,
                }}
                onPress={changeRoof}
              >
                <Text style={{ color: colors.text }}>{t('change')}</Text>
              </Button>
            ) : null}

            {tab?.id === 'planning' && project?.panelId ? (
              <Button
                style={{
                  flex: 1,
                  width: '48.5%',
                  height: 45,
                  marginTop: 15,
                  marginRight: 10,
                  backgroundColor: colors.background,
                }}
                onPress={getReport}
              >
                <Text style={{ color: colors.text }}>{t('get_report')}</Text>
              </Button>
            ) : null}

            <Button
              style={{
                flex: 1,
                width:
                  ((tab?.id === 'roof_style' && project?.roofArea) ||
                    (tab?.id === 'planning' && project?.panelId))
                    ? '48.5%'
                    : '100%',
                height: 45,
                marginTop: 15,
              }}
              onPress={submit}
            >
              {t('save')}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

ModalProject.propTypes = {
  project: PropTypes.object,
  isVisible: PropTypes.bool,
  isProccessSuccess: PropTypes.func,
  navigation: PropTypes.object,
  onPress: PropTypes.func,
  onTabChange: PropTypes.func,
  onClose: PropTypes.func,
  isMulti: PropTypes.bool,
  roofCancelResetKey: PropTypes.number,
};

export default ModalProject;