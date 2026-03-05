import { View } from 'react-native';
import { Icon, SafeAreaView, Tag, Text } from '@/components';
import { BaseStyle, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import styles from './styles';

export default function EProductPageNotFound({ navigation }) {
  const { colors } = useTheme();

  /**
   *
   * Called when process checkout
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View style={[styles.headerView]}>
        <View
          style={[
            styles.viewCart,
            {
              backgroundColor: parseHexTransparency(colors.primary, 30),
            },
          ]}
        >
          <Icon name={'bullhorn'} style={{ fontSize: 32, color: colors.primary }} />
        </View>
        <Text header bold style={{ marginBottom: 20 }}>
          Opps...
        </Text>

        <Text headline bold style={{ marginBottom: 20 }}>
          Something went wrong
        </Text>
        <Text body1 grayColor style={{ textAlign: 'center' }}>
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus.
        </Text>

        <Tag onPress={goBack} primary style={{ paddingHorizontal: 34, marginTop: 30 }}>
          Go Back
        </Tag>
      </View>
    </SafeAreaView>
  );
}
