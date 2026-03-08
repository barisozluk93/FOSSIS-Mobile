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
  },

  optionWrapper: {
    alignItems: 'flex-end',
    paddingLeft: 6,
  },

  optionButton: {
    paddingLeft: 10,
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
    textTransform: 'uppercase',
    opacity: 0.6,
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
    marginTop: 6,
  },

  footerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});