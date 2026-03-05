import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { paddingHorizontal: 20 },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { flex: 1, paddingRight: 5 },
  right: { flex: 1, paddingLeft: 5 },
  item: {
    marginVertical: 10,
  },
  example: {
    marginVertical: 10,
  },
});
