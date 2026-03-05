import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  userContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  userContentMessage: {
    padding: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
  },
  userContentDate: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 4,
  },
  meContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  meContentDate: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  meContentMessage: {
    marginTop: 8,
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
  },
});
