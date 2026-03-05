import { useCallback } from 'react';
import { Alert, Linking, TouchableOpacity, View } from 'react-native';
import styles from '@/screens/Components/Common/styles';
import { Text } from '@/components';

const Reference = ({ url = '' }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text footnote bold>
          Reference
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text footnote accentColor>
            {url}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reference;
