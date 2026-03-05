import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  specifications: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderColor: BaseColor.dividerColor,
    marginBottom: 20,
  },
});
