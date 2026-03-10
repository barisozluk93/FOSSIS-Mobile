import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import { ModalProject, SafeAreaView } from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import Mapbox from "@rnmapbox/maps";
import styles from "./styles";
import { getBuildingsRequest } from "@/apis/mappi";
import { getByIdRequest } from "@/apis/projectApi";

Mapbox.setAccessToken(
  "pk.eyJ1Ijoia2xjc29mdCIsImEiOiJja2wyMG5vM3AxMGwxMm5sYmJtMDE3d3V5In0.vRjLvCMd7Z4J5KJQuVgfsA"
);

const INITIAL_CENTER = [28.9741, 41.0256];
const INITIAL_ZOOM = 17;
const INITIAL_PITCH = 75;
const INITIAL_BEARING = 130;
const SELECTED_BUILDING_ZOOM = 18;

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

const PProjectCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const mapRef = useRef(null);
  const cameraRef = useRef(null);
  const initialCameraApplied = useRef(false);
  const buildingSelectionSnapshotRef = useRef(null);

  const selectedBuildingCameraRef = useRef({
    centerCoordinate: INITIAL_CENTER,
    zoomLevel: SELECTED_BUILDING_ZOOM,
    pitch: INITIAL_PITCH,
    bearing: INITIAL_BEARING,
  });

  const [showAction, setShowAction] = useState(true);
  const [modalRenderKey, setModalRenderKey] = useState(0);
  const [isSelectingBuilding, setIsSelectingBuilding] = useState(false);
  const [isDrawingRoof, setIsDrawingRoof] = useState(false);

  const [item, setItem] = useState(route?.params?.item || {});
  const [lng, setLng] = useState(INITIAL_CENTER[0]);
  const [lat, setLat] = useState(INITIAL_CENTER[1]);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState(INITIAL_CENTER);

  const [duration] = useState(12000);
  const [buildingsGeoJson, setBuildingsGeoJson] = useState(null);
  const [selectedBuildingFeature, setSelectedBuildingFeature] = useState(null);
  const [roofPoints, setRoofPoints] = useState([]);
  const [roofResult, setRoofResult] = useState({
    wkt: "",
    area: 0,
  });
  const [roofCancelResetKey, setRoofCancelResetKey] = useState(0);

  const openModal = useCallback(() => {
    setShowAction(true);
    setModalRenderKey((prev) => prev + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowAction(false);
  }, []);

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route.params.item);
      openModal();
      getProjectById(route.params.item.id);
    }
  }, [route?.params?.item, openModal]);

  useEffect(() => {
    if (item?.id) {
      openModal();
    }
  }, [item?.id, openModal]);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.item?.id) {
        openModal();
      }
    }, [route?.params?.item?.id, openModal])
  );

  const applyInitialCamera = useCallback(() => {
    if (initialCameraApplied.current || !cameraRef.current) return;

    initialCameraApplied.current = true;

    cameraRef.current.setCamera({
      centerCoordinate: INITIAL_CENTER,
      zoomLevel: INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING,
      animationDuration: duration,
      animationMode: "flyTo",
    });

    setCenter(INITIAL_CENTER);
    setLng(INITIAL_CENTER[0]);
    setLat(INITIAL_CENTER[1]);
    setZoom(INITIAL_ZOOM);
  }, [duration]);

  const flyToInitial = useCallback((animationDuration = 800) => {
    cameraRef.current?.setCamera({
      centerCoordinate: INITIAL_CENTER,
      zoomLevel: INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING,
      animationDuration,
      animationMode: "flyTo",
    });

    setCenter(INITIAL_CENTER);
    setLng(INITIAL_CENTER[0]);
    setLat(INITIAL_CENTER[1]);
    setZoom(INITIAL_ZOOM);
  }, []);

  const extrusionStyle = useMemo(
    () => ({
      fillExtrusionColor: [
        "case",
        ["boolean", ["get", "selected"], false],
        colors.primary,
        colors.primaryLight,
      ],
      fillExtrusionOpacity: 1,
      fillExtrusionHeight: [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["coalesce", ["get", "height"], 0],
      ],
    }),
    [colors.primary, colors.primaryLight]
  );

  const normalizeBuildingsGeoJson = useCallback((geojson) => {
    if (!geojson?.features) return geojson;

    return {
      ...geojson,
      features: geojson.features.map((feature, index) => {
        const rawHeight = feature?.properties?.height;
        const parsedHeight =
          rawHeight !== undefined && rawHeight !== null
            ? parseInt(rawHeight, 10)
            : 0;

        const generatedId = index + 1;

        return {
          ...feature,
          id: generatedId,
          properties: {
            ...feature.properties,
            originalFeatureId: feature.id,
            height: Number.isNaN(parsedHeight) ? 0 : parsedHeight,
            selected: false,
          },
        };
      }),
    };
  }, []);

  const getBuildings = useCallback(async () => {
    try {
      const result = await getBuildingsRequest();
      const geojson = JSON.parse(result);
      const normalized = normalizeBuildingsGeoJson(geojson);
      setBuildingsGeoJson(normalized);
    } catch (err) {
      console.log("getBuildings error:", err);
    }
  }, [normalizeBuildingsGeoJson]);

  const onMapIdle = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      const z = await mapRef.current.getZoom();
      const bounds = await mapRef.current.getVisibleBounds();

      const newLng = (bounds[0][0] + bounds[1][0]) / 2;
      const newLat = (bounds[0][1] + bounds[1][1]) / 2;

      setZoom(Number(z.toFixed(2)));
      setCenter([newLng, newLat]);
      setLng(newLng);
      setLat(newLat);
    } catch (e) {
      console.log("onMapIdle error:", e);
    }
  }, []);

  const setCameraZoom = useCallback(
    (nextZoom) => {
      if (showAction) return;

      const clampedZoom = Math.max(1, Math.min(nextZoom, 22));

      cameraRef.current?.setCamera({
        centerCoordinate: center,
        zoomLevel: clampedZoom,
        animationDuration: 500,
        animationMode: "flyTo",
      });

      setZoom(clampedZoom);
    },
    [center, showAction]
  );

  const getFeatureBounds = useCallback((feature) => {
    if (!feature?.geometry?.coordinates) return null;

    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;

    const walkCoords = (coords) => {
      if (typeof coords[0] === "number" && typeof coords[1] === "number") {
        const [coordLng, coordLat] = coords;
        minLng = Math.min(minLng, coordLng);
        minLat = Math.min(minLat, coordLat);
        maxLng = Math.max(maxLng, coordLng);
        maxLat = Math.max(maxLat, coordLat);
        return;
      }

      coords.forEach(walkCoords);
    };

    walkCoords(feature.geometry.coordinates);

    return [
      [minLng, minLat],
      [maxLng, maxLat],
    ];
  }, []);

  const getFeatureCenterFromBounds = useCallback((bounds) => {
    if (!bounds) return INITIAL_CENTER;

    return [
      (bounds[0][0] + bounds[1][0]) / 2,
      (bounds[0][1] + bounds[1][1]) / 2,
    ];
  }, []);

  const polygonToWkt = useCallback((points) => {
    if (!points || points.length < 3) return "";

    const closedRing = [...points, points[0]];
    const ringText = closedRing.map(([x, y]) => `${x} ${y}`).join(", ");
    return `POLYGON((${ringText}))`;
  }, []);

  const calculatePolygonAreaMeters = useCallback((points) => {
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
  }, []);

  const focusSelectedBuildingTopDown = useCallback(
    (feature, animationDuration = 800) => {
      if (!feature) return;

      const bounds = getFeatureBounds(feature);
      const featureCenter = getFeatureCenterFromBounds(bounds);

      setCenter(featureCenter);
      setLng(featureCenter[0]);
      setLat(featureCenter[1]);

      cameraRef.current?.setCamera({
        centerCoordinate: featureCenter,
        zoomLevel: SELECTED_BUILDING_ZOOM,
        pitch: 0,
        bearing: 0,
        animationDuration,
        animationMode: "flyTo",
      });
    },
    [getFeatureBounds, getFeatureCenterFromBounds]
  );

  const focusSelectedBuildingAngled = useCallback(
    (feature, animationDuration = 800) => {
      if (!feature) return;

      const bounds = getFeatureBounds(feature);
      const featureCenter = getFeatureCenterFromBounds(bounds);

      setCenter(featureCenter);
      setLng(featureCenter[0]);
      setLat(featureCenter[1]);

      cameraRef.current?.setCamera({
        centerCoordinate: featureCenter,
        zoomLevel:
          selectedBuildingCameraRef.current?.zoomLevel ?? SELECTED_BUILDING_ZOOM,
        pitch: selectedBuildingCameraRef.current?.pitch ?? INITIAL_PITCH,
        bearing: selectedBuildingCameraRef.current?.bearing ?? INITIAL_BEARING,
        animationDuration,
        animationMode: "flyTo",
      });
    },
    [getFeatureBounds, getFeatureCenterFromBounds]
  );

  const focusBuildingById = useCallback(
    async (buildingId, options = {}) => {
      if (!buildingId || !buildingsGeoJson?.features?.length) return;

      const feature = buildingsGeoJson.features.find(
        (f) => String(f.id) === String(buildingId)
      );

      if (!feature) return;

      const bounds = getFeatureBounds(feature);
      const featureCenter = getFeatureCenterFromBounds(bounds);
      const nextLocation = `${featureCenter[0].toFixed(6)}, ${featureCenter[1].toFixed(6)}`;

      const previousBuildingId = item?.buildingId;

      setSelectedBuildingFeature(feature);

      selectedBuildingCameraRef.current = {
        centerCoordinate: featureCenter,
        zoomLevel: options.zoomLevel ?? SELECTED_BUILDING_ZOOM,
        pitch: options.pitch ?? INITIAL_PITCH,
        bearing: options.bearing ?? INITIAL_BEARING,
      };

      setItem((prev) => {
        const isBuildingChanged =
          String(previousBuildingId || "") !== String(feature.id || "");

        return {
          ...(prev || {}),
          buildingId: feature.id,
          location: nextLocation,
          roofWkt: isBuildingChanged ? undefined : prev?.roofWkt,
          roofGeom: isBuildingChanged ? undefined : prev?.roofGeom,
          roofArea: isBuildingChanged ? undefined : prev?.roofArea,
        };
      });

      setCenter(featureCenter);
      setLng(featureCenter[0]);
      setLat(featureCenter[1]);

      cameraRef.current?.setCamera({
        centerCoordinate: featureCenter,
        zoomLevel: options.zoomLevel ?? SELECTED_BUILDING_ZOOM,
        pitch: options.pitch ?? INITIAL_PITCH,
        bearing: options.bearing ?? INITIAL_BEARING,
        animationDuration: options.animationDuration ?? 1200,
        animationMode: "flyTo",
      });

      setRoofPoints([]);
      setRoofResult({
        wkt: "",
        area: 0,
      });
      setIsDrawingRoof(false);
      setIsSelectingBuilding(false);

      if (typeof options.showAction === "boolean") {
        if (options.showAction) {
          openModal();
        } else {
          closeModal();
        }
      } else {
        openModal();
      }

      buildingSelectionSnapshotRef.current = null;
    },
    [
      buildingsGeoJson,
      getFeatureBounds,
      getFeatureCenterFromBounds,
      item?.buildingId,
      openModal,
      closeModal,
    ]
  );

  useEffect(() => {
    if (!buildingsGeoJson?.features?.length) return;
    if (!item?.id) return;
    if (!item?.buildingId) return;
    if (selectedBuildingFeature) return;

    focusBuildingById(item.buildingId, {
      zoomLevel: SELECTED_BUILDING_ZOOM,
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING,
      animationDuration: 0,
      showAction: true,
    });
  }, [
    buildingsGeoJson,
    item?.id,
    item?.buildingId,
    selectedBuildingFeature,
    focusBuildingById,
  ]);

  const resetMapToInitialState = useCallback(async () => {
    setSelectedBuildingFeature(null);
    setRoofPoints([]);
    setRoofResult({
      wkt: "",
      area: 0,
    });
    setIsDrawingRoof(false);

    setItem((prev) => ({
      ...(prev || {}),
      buildingId: undefined,
      location: "",
      roofWkt: undefined,
      roofGeom: undefined,
      roofArea: undefined,
    }));

    flyToInitial(800);
  }, [flyToInitial]);

  const selectBuilding = useCallback(
    async (projectFromModal) => {
      buildingSelectionSnapshotRef.current = {
        item: projectFromModal || item || {},
        selectedBuildingFeature,
        selectedBuildingCamera: selectedBuildingCameraRef.current,
      };

      setItem(projectFromModal || item || {});
      setRoofPoints([]);
      setRoofResult({
        wkt: "",
        area: 0,
      });
      setIsDrawingRoof(false);
      closeModal();
      setIsSelectingBuilding(true);

      if (selectedBuildingFeature) {
        focusSelectedBuildingAngled(selectedBuildingFeature, 400);
      }
    },
    [item, selectedBuildingFeature, focusSelectedBuildingAngled, closeModal]
  );

  const cancelBuildingSelection = useCallback(async () => {
    const snapshot = buildingSelectionSnapshotRef.current;

    setRoofPoints([]);
    setRoofResult({
      wkt: "",
      area: 0,
    });
    setIsDrawingRoof(false);
    setIsSelectingBuilding(false);
    openModal();

    if (!snapshot) {
      return;
    }

    setItem(snapshot.item || {});
    selectedBuildingCameraRef.current =
      snapshot.selectedBuildingCamera || {
        centerCoordinate: INITIAL_CENTER,
        zoomLevel: SELECTED_BUILDING_ZOOM,
        pitch: INITIAL_PITCH,
        bearing: INITIAL_BEARING,
      };

    const previousBuildingFeature = snapshot.selectedBuildingFeature;

    if (previousBuildingFeature) {
      setSelectedBuildingFeature(previousBuildingFeature);
      focusSelectedBuildingAngled(previousBuildingFeature, 600);
    } else {
      setSelectedBuildingFeature(null);
      flyToInitial(800);
    }

    buildingSelectionSnapshotRef.current = null;
  }, [focusSelectedBuildingAngled, flyToInitial, openModal]);

  const finishRoofDrawing = useCallback(() => {
    if (roofPoints.length < 3) return;

    const calculatedArea = calculatePolygonAreaMeters(roofPoints);
    const wkt = polygonToWkt(roofPoints);

    const roofGeom = {
      type: "Polygon",
      coordinates: [[...roofPoints, roofPoints[0]]],
    };

    setRoofResult({
      wkt,
      area: calculatedArea,
    });

    setItem((prev) => ({
      ...(prev || {}),
      roofWkt: wkt,
      roofGeom,
      roofArea: calculatedArea,
    }));

    setIsDrawingRoof(false);
    openModal();

    if (selectedBuildingFeature) {
      focusSelectedBuildingAngled(selectedBuildingFeature, 600);
    }
  }, [
    calculatePolygonAreaMeters,
    focusSelectedBuildingAngled,
    polygonToWkt,
    roofPoints,
    selectedBuildingFeature,
    openModal,
  ]);

  const startRoofDrawing = useCallback(() => {
    if (!selectedBuildingFeature) return;

    closeModal();
    setIsSelectingBuilding(false);
    setIsDrawingRoof(true);
    setRoofPoints([]);
    setRoofResult({
      wkt: "",
      area: 0,
    });

    focusSelectedBuildingTopDown(selectedBuildingFeature, 1000);
  }, [focusSelectedBuildingTopDown, selectedBuildingFeature, closeModal]);

  const cancelRoofDrawing = useCallback(() => {
    setIsDrawingRoof(false);
    setRoofPoints([]);

    const hasRoofArea = Number(item?.roofArea || 0) > 0;

    if (!hasRoofArea) {
      setRoofCancelResetKey((prev) => prev + 1);
    }

    openModal();

    if (selectedBuildingFeature) {
      focusSelectedBuildingAngled(selectedBuildingFeature, 600);
    }
  }, [focusSelectedBuildingAngled, item?.roofArea, selectedBuildingFeature, openModal]);

  const handleModalTabChange = useCallback(
    (tabData) => {
      if (!tabData) return;

      if (tabData.id === "roof_style") {
        startRoofDrawing();
        return;
      }

      if (isDrawingRoof) {
        cancelRoofDrawing();
      }
    },
    [cancelRoofDrawing, isDrawingRoof, startRoofDrawing]
  );

  const onPressBuilding = useCallback(
    async (event) => {
      if (!isSelectingBuilding) return;

      const feature = event?.features?.[0];
      if (!feature || feature.id == null) return;

      await focusBuildingById(feature.id, {
        zoomLevel: SELECTED_BUILDING_ZOOM,
        pitch: INITIAL_PITCH,
        bearing: INITIAL_BEARING,
        animationDuration: 1200,
        showAction: true,
      });
    },
    [focusBuildingById, isSelectingBuilding]
  );

  const roofPolygonGeoJson = useMemo(() => {
    if (roofPoints.length < 3) return null;

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [[...roofPoints, roofPoints[0]]],
          },
        },
      ],
    };
  }, [roofPoints]);

  const roofLineGeoJson = useMemo(() => {
    if (roofPoints.length < 2) return null;

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: roofPoints,
          },
        },
      ],
    };
  }, [roofPoints]);

  const visibleBuildingsGeoJson = useMemo(() => {
    if (!buildingsGeoJson?.features) return null;

    const selectedId = selectedBuildingFeature?.id;

    if (isSelectingBuilding) {
      return {
        ...buildingsGeoJson,
        features: buildingsGeoJson.features.map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            selected: String(feature.id) === String(selectedId),
          },
        })),
      };
    }

    if (selectedBuildingFeature) {
      return {
        type: "FeatureCollection",
        features: [
          {
            ...selectedBuildingFeature,
            properties: {
              ...selectedBuildingFeature.properties,
              selected: true,
            },
          },
        ],
      };
    }

    return {
      ...buildingsGeoJson,
      features: buildingsGeoJson.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          selected: false,
        },
      })),
    };
  }, [buildingsGeoJson, selectedBuildingFeature, isSelectingBuilding]);

  const getProjectById = useCallback((id) => {
    getByIdRequest(id)
      .then((result) => {
        if (result.isSuccess) {
          setItem(result.data);
          openModal();
        } else {
          setItem({});
        }
      })
      .catch(() => {
        setItem({});
      });
  }, [openModal]);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          ref={mapRef}
          style={styles.map}
          styleJSON={JSON.stringify(EMPTY_STYLE)}
          onDidFinishLoadingMap={() => {
            applyInitialCamera();
            getBuildings();
          }}
          onMapIdle={onMapIdle}
          onPress={(event) => {
            if (!isDrawingRoof) return;

            const coords = event?.geometry?.coordinates;
            if (!coords) return;

            setRoofPoints((prev) => [...prev, coords]);
          }}
          logoEnabled={false}
          scrollEnabled={!showAction}
          zoomEnabled={!showAction}
          rotateEnabled={!showAction}
          pitchEnabled={!showAction}
          compassEnabled={!showAction}
        >
          <Mapbox.Camera ref={cameraRef} />

          <Mapbox.RasterSource
            id="osmSource"
            tileUrlTemplates={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
            tileSize={256}
            maxZoomLevel={19}
          >
            <Mapbox.RasterLayer id="osmLayer" sourceID="osmSource" />
          </Mapbox.RasterSource>

          {visibleBuildingsGeoJson && (
            <Mapbox.ShapeSource
              id="buildings"
              shape={visibleBuildingsGeoJson}
              onPress={isSelectingBuilding ? onPressBuilding : undefined}
            >
              <Mapbox.FillExtrusionLayer
                id="buildings-layer"
                style={extrusionStyle}
              />
            </Mapbox.ShapeSource>
          )}

          {isDrawingRoof && roofLineGeoJson && (
            <Mapbox.ShapeSource id="roof-line-source" shape={roofLineGeoJson}>
              <Mapbox.LineLayer
                id="roof-line-layer"
                style={{
                  lineColor: BaseColor.blueColor,
                  lineWidth: 5,
                }}
              />
            </Mapbox.ShapeSource>
          )}

          {isDrawingRoof && roofPolygonGeoJson && (
            <Mapbox.ShapeSource
              id="roof-drawing-source"
              shape={roofPolygonGeoJson}
            >
              <Mapbox.FillLayer
                id="roof-drawing-fill"
                style={{
                  fillColor: BaseColor.blueColor,
                  fillOpacity: 1,
                }}
              />
              <Mapbox.LineLayer
                id="roof-drawing-line"
                style={{
                  lineColor: BaseColor.blueColor,
                  lineWidth: 5,
                }}
              />
            </Mapbox.ShapeSource>
          )}
        </Mapbox.MapView>

        {isSelectingBuilding && (
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              backgroundColor: colors.background,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 14,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                flex: 1,
                color: colors.text,
                marginRight: 10,
              }}
            >
              {t("select_location_message")}
            </Text>

            <TouchableOpacity
              onPress={cancelBuildingSelection}
              style={{
                backgroundColor: colors.primaryLight,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: colors.background }}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        )}

        {isDrawingRoof && (
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              backgroundColor: colors.background,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                color: colors.text,
                marginBottom: 10,
              }}
            >
              {t("draw_roof_message")}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={cancelRoofDrawing}
                style={{
                  backgroundColor: colors.primaryLight,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: colors.background }}>{t("cancel")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={finishRoofDrawing}
                disabled={roofPoints.length < 3}
                style={{
                  backgroundColor:
                    roofPoints.length < 3 ? colors.border : colors.primaryDark,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: BaseColor.whiteColor }}>
                  {t("finish_drawing")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showAction && (
          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={[styles.zoomButton, { backgroundColor: colors.background }]}
              onPress={() => setCameraZoom(zoom + 1)}
            >
              <Text style={[styles.zoomText, { color: colors.text }]}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.zoomButton, { backgroundColor: colors.background }]}
              onPress={() => setCameraZoom(zoom - 1)}
            >
              <Text style={[styles.zoomText, { color: colors.text }]}>−</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.infoBar, { backgroundColor: colors.background }]}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {t("zoom")} : {zoom.toFixed(2)}
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {t("longitude")} : {lng.toFixed(6)}
          </Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            {t("latitude")} : {lat.toFixed(6)}
          </Text>
        </View>
      </View>

      {showAction && (
        <ModalProject
          key={`${item?.id ? `edit-${item.id}` : "create-project"}-${modalRenderKey}`}
          project={item}
          navigation={navigation}
          onPress={selectBuilding}
          onTabChange={handleModalTabChange}
          isVisible={true}
          isProccessSuccess={getProjectById}
          roofCancelResetKey={roofCancelResetKey}
        />
      )}
    </SafeAreaView>
  );
};

export default PProjectCreate;