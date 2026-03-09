import { StyleSheet } from "react-native";

export default StyleSheet.create({
  topInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  projectSubInfo: {
    fontSize: 13,
    opacity: 0.8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
  },
  chart: {
    marginTop: 8,
    borderRadius: 12,
  },
  loaderBox: {
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBox: {
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginHorizontal: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  dailyChart: {
    paddingBottom: 24,
  },
  barChartWrapper: {
    marginTop: 12,
    paddingRight: 12,
  },
  chartSection: {
    marginTop: 12,
  },
});