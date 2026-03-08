import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusWrapper: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
  },

  contentRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  leftColumn: {
    flex: 1,
    paddingRight: 10,
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 10,
  },

  field: {
    marginBottom: 10,
  },

  label: {
    fontSize: 11,
    opacity: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },

  value: {
    paddingTop: 2,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },
});