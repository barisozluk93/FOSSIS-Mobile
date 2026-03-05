import { useState } from 'react';
import PropTypes from 'prop-types';
import { ActionSheetIOS, Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const CustomActions = ({ onSend = () => {}, icon, containerStyle = {}, wrapperStyle = {}, iconTextStyle = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onActionsPress = () => {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setModalVisible(true);
            break;
          case 1:
            navigator.geolocation.getCurrentPosition(
              (position) => {
                onSend({
                  location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              },
              (error) => Alert.alert(error.message),
              {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
              }
            );
            break;
          default:
        }
      }
    );
  };

  const renderIcon = () => {
    if (icon) {
      return icon();
    }
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onActionsPress}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Text>in modal</Text>
      </Modal>
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.propTypes = {
  onSend: PropTypes.func,
  icon: PropTypes.func,
  containerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  iconTextStyle: PropTypes.object,
};

export default CustomActions;
