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

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

const DEFAULT_CENTER = [28.9741, 41.0256];

const ModalProject = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;

  const {
    project = undefined,
    isProccessSuccess,
    roofCancelResetKey,
    navigation,
    onPress,
    onTabChange,
    isMulti = false,
    ...attrs
  } = props;

  const { user } = useSelector((state) => state.user);

  const roofCameraRef = useRef(null);

  const [id, setId] = useState(0);
  const [buildingId, setBuildingId] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [gridSpace, setGridSpace] = useState('');
  const [margin, setMargin] = useState('');
  const [panels, setPanels] = useState([]);
  const [panel, setPanel] = useState('');
  const [panelId, setPanelId] = useState('');

  const [header, setHeader] = useState('');

  const tabs = useMemo(() => {
    const hasProjectId = Number(project?.id) > 0;
    const hasRoofArea = project?.roofArea !== undefined && project?.roofArea !== null;

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

  }, [project?.id, project?.roofArea, t]);

  const [tab, setTab] = useState(tabs[0]);

  useEffect(() => {
    const activeTab = tabs.find((item) => item.id === tab?.id);

    if (!activeTab || activeTab.disabled) {
      setTab(tabs[0]);
    }
  }, [tabs, tab]);

  useEffect(() => {
    if (!roofCancelResetKey) return;
    if (Number(project?.roofArea || 0) > 0) return;

    const mainInfoTab = tabs.find((x) => x.id === "main_info") || tabs[0];
    setTab(mainInfoTab);
  }, [roofCancelResetKey, project?.roofArea, tabs]);

  useEffect(() => {
    if (project && project.id > 0) {
      setHeader(t('edit_project'));
      setId(project.id);
      setBuildingId(project.buildingId || '');
      setLocation(project.location || '');
      setName(project.name || '');
    } else {
      setHeader(t('create_project'));
      setId(project?.id || 0);
      setBuildingId(project?.buildingId || '');
      setLocation(project?.location || '');
      setName(project?.name || '');
    }
  }, [project, t]);

  const onChangeTab = (tabData) => {
    if (tabData?.disabled) return;
    setTab(tabData);

    if (tab.id === 'roof_style') {
      allPanelsRequest().then(result => {
        if (result.isSuccess) {
          let temp = [];
          result.data.forEach(item => {
            temp.push({ key: item.id, name: item.model + ' - ' + item.series });
          })
          setPanels(temp);
        }
        else {
          setPanels([]);
        }
      }).catch(error => {
        setPanels([]);
      })
    }

    if (!(tabData?.id === "roof_style" && project?.roofArea > 0)) {
      onTabChange?.(tabData);
    }
  };

  const submit = () => {

    if (tab.id === 'main_info') {
      const data = {
        id: id,
        isDeleted: false,
        userId: user.id,
        name: name,
        buildingId: Number(buildingId),
        location: location,
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
    }
    else {
      if(tab.id === 'planning') {
        project.panelId = panelId;
        project.gridSpace = gridSpace;
        project.margin = margin;
      }
      
      editRequest(project).then(result => {
        if (result.isSuccess) {
          Toast.show({
            type: 'success',
            text1: t('success'),
            text2: t('success_message'),
          });

          isProccessSuccess?.(result.data.id);
        }
        else {
          Toast.show({
            type: 'error',
            text1: t('error'),
            text2: err?.message || t('pw_didnt_match_message'),
          });
        }
      }).catch((error) => {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: err?.message || t('pw_didnt_match_message'),
        });
      })
    }
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
    } catch (error) {
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
    if (tab.id !== 'roof') return;
    if (!roofPolygonBounds) return;
    if (!roofCameraRef.current) return;

    const timer = setTimeout(() => {
      roofCameraRef.current?.fitBounds(
        roofPolygonBounds[0],
        roofPolygonBounds[1],
        40,
        800
      );
    }, 150);

    return () => clearTimeout(timer);
  }, [roofPolygonBounds, tab.id]);

  const changeRoof = () => {
    onTabChange?.({ id: 'roof_style', title: 'roof_style', disabled: false });
  }

  return (
    <Modal style={styles.bottomModal} {...attrs}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>

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
            style={{ height: heightTabView() - 600 }}
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
              <TabTag
                tabs={tabs}
                tab={tab}
                onChange={onChangeTab}
              />
            </View>

            {tab.id === 'main_info' && (
              <>
                <TextInput
                  style={{
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.primary,
                    marginBottom: 10,
                  }}
                  onChangeText={(text) => setName(text)}
                  autoCorrect={false}
                  placeholder={t('name')}
                  placeholderTextColor={BaseColor.grayColor}
                  value={name}
                />

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
                      placeholderTextColor={BaseColor.grayColor}
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

            {tab.id === 'roof_style' && project.roofArea > 0 && (
              <View style={{ paddingVertical: 12 }}>
                <Text title
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
                      tileUrlTemplates={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']}
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
                {panels && <PickerSelect style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: colors.primary }} label={t('panels')} value={panel} onChange={(v) => { setPanel(v); setPanelId(v.key) }} options={panels} />}

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={[styles.textInputName, { borderWidth: StyleSheet.hairlineWidth, borderColor: colors.primary, marginTop: 10, marginRight: 10 }]}
                    onChangeText={(text) => setGridSpace(text)}
                    autoCorrect={false}
                    placeholder={t('gridspace')}
                    placeholderTextColor={BaseColor.grayColor}
                    value={gridSpace}
                  />
                  <TextInput
                    style={[styles.textInputName, { borderWidth: StyleSheet.hairlineWidth, borderColor: colors.primary, marginTop: 10 }]}
                    onChangeText={(text) => setMargin(text)}
                    autoCorrect={false}
                    placeholder={t('margin')}
                    placeholderTextColor={BaseColor.grayColor}
                    value={margin}
                  />
                </View>
              </>
            )}
          </ScrollView>

          <View
            style={{
              paddingVertical: 15,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: colors.border,
              flexDirection: 'row'
            }}
          >
            {tab?.id === "roof_style" && project?.roofArea &&
              <Button style={{ flex: 1, width: "48.5%", height: 45, marginTop: 15, marginRight: 10, backgroundColor: colors.background }} onPress={changeRoof}>
                <Text style={{ color: colors.text }}>{t('change')}</Text>
              </Button>}

            <Button style={{ flex: 1, width: tab?.id === "roof_style" && project?.roofArea ? "48.5%" : "100%", height: 45, marginTop: 15 }} onPress={submit}>
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
  isProccessSuccess: PropTypes.func,
  navigation: PropTypes.object,
  onPress: PropTypes.func,
  onTabChange: PropTypes.func,
  isMulti: PropTypes.bool,
  roofCancelResetKey: PropTypes.number,
};

export default ModalProject;