import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: "absolute",
    right: 16,
    top: 100,
    gap: 10,
  },
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  infoBar: {
    position: "absolute",
    left: '25%',
    right: 16,
    bottom: 24,
    borderRadius: 10,
    padding: 10,
    width: "50%"
  },
  infoText: {
    fontSize: 14,
  },
});